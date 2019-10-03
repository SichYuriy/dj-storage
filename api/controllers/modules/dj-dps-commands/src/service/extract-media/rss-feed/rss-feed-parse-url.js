/** @type {RssFeedExtractor} */
let rssFeedService = RssFeedExtractorService;

module.exports = {
    name: "service.rss.feed.parseUrl",

    synonims: {},

    "internal aliases": {
        "url": "url",
    },

    defaultProperty: {
        "service.rss.feed.parseUrl": "url"
    },

    execute: function (command, state, config) {
        let url = command.settings.url || (state.head.data && state.head.data.url);
        return rssFeedService.parseUrl(url)
            .then(items => {
                state.head = {
                    type: 'json',
                    data: items
                };
                return state;
            })
    },

    help: {
        synopsis: "Reads rss feed from the url",
        name: {
            "default": "service.rss.feed.parseUrl",
            synonims: []
        },
        input: ["rss feed url"],
        output: "json",
        "default param": "url",
        params: [{
            name: "url",
            synopsis: "url to reed rss feed from",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "Reed rss feed from Fakty portal",
            code: "service.rss.feed.parseUrl(url:'https://fakty.ua/rss_feed/ukraina')"
        }
    }
};