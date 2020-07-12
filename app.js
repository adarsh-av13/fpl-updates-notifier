const config = require('./config');
const express = require('express');
const notifier = require('node-notifier');
const path = require('path');
const twit = require('twit');

const app = express();
const twitter = twit(config);

const official_fpl = 761568335138058240n;
const params = { follow: official_fpl.toString(), language: 'en' };

const stream = twitter.stream('statuses/filter', params);

stream.on('connect', (request) => {
    console.log("Connecting....");
});

stream.on('connected', (response) => {
    console.log("Connected");
});

stream.on('error', (error) => {
    console.log(error);
});

stream.on('tweet', (tweet) => {
    console.log(tweet.text);
    let isFromRightUser = tweet.user.id == official_fpl;
    let isRelevantTweet = isFromRightUser && (tweet.text.search("BONUS POINTS") != -1 || tweet.text.search("Goal - ") != -1);
    if (isRelevantTweet) {
        notifier.notify({
            title: 'FPL Update',
            message: tweet.text,
            icon: path.join(__dirname, 'notification_icon.png'),
            sound: true,
        });
    }
});

app.listen(3000);