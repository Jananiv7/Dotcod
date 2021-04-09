var cron = require('node-cron');
/*cron.schedule('* * * * * *', () => {
    console.log('Running task every second');
});// to run a task every second

cron.schedule(' * * * * *', () => {
    console.log('Running task every minute');
});//to run a task every minute
*/
cron.schedule('1,2,4,5 * * * * * *', () => {
    console.log('Running every minute 1,2,4 and 5')
});