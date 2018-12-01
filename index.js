const CRON = require('./lib/cron');

// Public API
module.exports = {
    init: tag => new CRON(tag),
};
