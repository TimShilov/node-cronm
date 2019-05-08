const os = require('os');
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

            if(os.platform() === 'linux') {
                // executed on Linux => getting current cron jobs
                exec('crontab -l', (error, stdout, stderr) => {
                    if(stderr || error) {
						if(!stdout.includes('no crontab for')) {
							reject(stderr || error);
							return;
						}
                    }
                    let currentCronJobs = stdout && !stdout.includes('no crontab for') ? stdout.split('\n') : [];

                    // removing all previously created jobs
                    currentCronJobs = currentCronJobs.filter(item => item && !item.includes(this.CRON_TAG));

                    // adding tag and appending new cron jobs to already existant ones
                    currentCronJobs.push(...newJobs.map(job => `${job} #${this.CRON_TAG}`));

                    // * Cron requires last line to be empty or it will return error. TODO: test that
                    currentCronJobs.push('');

                    const command = `echo '${currentCronJobs.join('\n').replace(/'/g, '"')}' | crontab -`;

                    exec(command, (execError, execStdout, execStderr) => {
                        if(execStderr || execError) {
                            reject(execStderr || execError);
                            return;
                        }
                        resolve('Cron jobs updated!');
                    });
                });
            } else {
                // executed not on Linux
                resolve('Sorry Windows user. No Cron jobs for you!');
            }
        })
            .then((response) => {
                console.log(`[CRON] ${response}`);
            })
            .catch((err) => {
                console.error('[CRON] Error:', err);
            });
    }
}

module.exports = CRON;
