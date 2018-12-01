const getos = require('getos');
const { exec } = require('child_process');

class CRON {
    constructor(tag = 'CRON_MANAGER') {
        this.CRON_TAG = tag;
    }

    update(newJobs) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Cron update rejected by timeout'));
            }, 5000);
            getos((e, os) => {
                if(e) {
                    return reject(e);
                }
                if(os.os === 'linux') {
                    // executed on Linux => getting current cron jobs
                    exec('crontab -l', (error, stdout, stderr) => {
                        if(stderr || error) {
                            return reject(stderr || error);
                        }
                        let currentCronJobs = stdout && !stdout.startsWith('no crontab for') ? stdout.split('\n') : [];

                        // removing all previously created jobs
                        currentCronJobs = currentCronJobs.filter(item => item && !item.includes(this.CRON_TAG));

                        // adding tag and appending new cron jobs to already existant ones
                        currentCronJobs.push(...newJobs.map(job => `${job} #${this.CRON_TAG}`));

                        // * Cron requires last line to be empty or it will return error. TODO: test that
                        currentCronJobs.push('');

                        exec(`echo "${currentCronJobs.join('\n')}" | crontab -`, (error, stdout, stderr) => {
                            if(stderr || error) {
                                return reject(stderr || error);
                            }
                            return resolve('Cron jobs updated!');
                        });
                    });
                } else {
                    // executed not on Linux
                    resolve('Sorry Windows user. No Cron jobs for you!');
                }
            });
        }).then(response => console.log(`[CRON] ${response}`))
            .catch((err) => {
                console.error('[CRON] Error:', err);
            });
    }
}

module.exports = CRON;
