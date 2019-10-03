/** @type {RssFeedExtractor} */
let rssFeedService = RssFeedExtractorService;

module.exports = {
    name: "service.rss.feed.parseString",

    synonims: {},

    "internal aliases": {
        "rssXml": "rss",
    },

    defaultProperty: {
        "service.rss.feed.parseString": "rssXml"
    },

    execute: function (command, state, config) {
        let rssXml = command.settings.rssXml || (state.head.data && state.head.data.rssXml);
        return rssFeedService.parseString(rssXml)
            .then(items => {
                state.head = {
                    type: 'json',
                    data: items
                };
                return state;
            })
    },

    help: {
        synopsis: "Parses rss xml",
        name: {
            "default": "service.rss.feed.parseString",
            synonims: []
        },
        input: ["rss xml string"],
        output: "json",
        "default param": "rssXml",
        params: [{
            name: "rssXml",
            synopsis: "rss xml to parse",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "parse some rss",
            code: "service.rss.feed.parseString(rssXml:'<rss version=\"2.0\"><channel></channel></rss>')"
        }
    }
};