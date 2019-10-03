let Parser = require('rss-parser');

class RssFeedExtractor {
    constructor() {
        /** @private */
        this.parser = new Parser();
    }

    parseUrl(url) {
        return this.parser.parseURL(url);
    }

    parseString(rssString) {
        return this.parser.parseString(rssString);
    }
}

module.exports = RssFeedExtractor;