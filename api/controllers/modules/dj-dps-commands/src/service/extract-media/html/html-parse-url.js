/** @type {HtmlExtractor} */
const htmlExtractor = HtmlExtractorService;

module.exports = {
    name: "service.html.parseUrl",

    synonims: {},

    "internal aliases": {
        "url": "url",
        "selector": "selector"
    },

    defaultProperty: {
        "service.html.parseUrl": "url"
    },

    execute: function (command, state, config) {
        let url = command.settings.url || (state.head.data && state.head.data.url);
        let selector = command.settings.selector || (state.head.data && state.head.data.selector);
        return htmlExtractor.getContentByUrl(url, selector)
            .then(text => {
                state.head = {
                    type: 'string',
                    data: text
                };
                return state;
            });
    },

    help: {
        synopsis: "Extracts text from html",
        name: {
            "default": "service.html.parseUrl",
            synonims: []
        },
        input: ["Url and query to select text"],
        output: "string",
        params: [{
            name: "url",
            synopsis: "url to download html",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "selector",
            synopsis: "jquery selector to extract text",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "Extracts text from html pages",
            code: "service.html.parseUrl(url:'https://fakty.com.ua/ua/showbiz/20190919-25-richchya-serialu-druzi-google-zapustyv-pashalky-prysvyacheni-personazham/', selector:'.kv-post-content-text p');"
        }
    }
};