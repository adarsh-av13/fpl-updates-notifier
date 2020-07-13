const notifications = require('./notifications');
const status = require('./status');

if (process.argv[2] == 'notify') {
    notifications.get();
} else if(process.argv[2] == 'status') {
    status.get();
} else {
    console.log('Invalid Command');
}