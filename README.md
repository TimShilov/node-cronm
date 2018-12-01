# node-cronm
Cronm is a simple cron manager for Node.js apps.


### Installation

node-cronm requires [Node.js](https://nodejs.org/) v8+ to run.

Install dependency.

```sh
$ npm install cronm
```

Usage example

```javascript
const CRON = require('cronm').init('MyApp');

CRON.update([
    '0 0 1 1 * cowsay "Happy New Year! \\(^_^)/"',
    '1 * * * * cowsay "Excelsior!"',
]);
```

### Development

Want to contribute? Great!
Feel free to submit issues or pull requests.

License
----

MIT

**Free Software, Hell Yeah!**