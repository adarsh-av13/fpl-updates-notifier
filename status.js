
const color = require('colors');
const puppeteer = require('puppeteer');

const get = async () => {
    console.log('Fetching details......'.italic+'\n\n');
    const url = 'https://www.livefpl.net/rank';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.type('#s1', '3460070');
    await page.click('.btn.btn-success');

    await page.waitForNavigation();
    await page.waitForSelector('.list-statictics-counter');

    const details = await page.evaluate(() => {
        const data = document.querySelectorAll('.list-statictics-counter');
        const realData = Array.from(data).map((data) => { return data.textContent });
        const details = {
            'Name': realData[0].trim(),
            'Live Points': realData[1].trim(),
            'Total Points': realData[2].trim(),
            'Previous Ranking': realData[4].trim(),
            'Live Ranking Pre-Autosubs': realData[5].trim(),
            'Live Ranking Post-Autosubs': realData[6].trim(),
        }
        return details;
    });
    Object.keys(details).forEach((prop) => {
        console.log(`${prop.padEnd(50)}: `.white, `${details[prop].padStart(25)}`.green);
    });

    await browser.close();
}

module.exports = {
    get
}
