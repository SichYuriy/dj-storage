/** @type {HtmlExtractor} */
const htmlExtractor = HtmlExtractorService;

module.exports = {
    name: "service.html.parseString",

    synonims: {},

    "internal aliases": {
        "url": "url",
        "selector": "selector"
    },

    defaultProperty: {
        "service.html.parseString": "url"
    },

    execute: function (command, state, config) {
        let htmlStr = command.settings.html || (state.head.data && state.head.data.html);
        let selector = command.settings.selector || (state.head.data && state.head.data.selector);
        return new Promise(resolve => {
            let text = htmlExtractor.getContentFromHtml(htmlStr, selector);
            state.head = {
                type: 'string',
                data: text
            };
            resolve(state);
        });
    },

    help: {
        synopsis: "Extracts text from html",
        name: {
            "default": "service.html.parseString",
            synonims: []
        },
        input: ["html string and query to select text"],
        output: "string",
        params: [{
            name: "html",
            synopsis: "html to parse",
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
            description: "Extracts text from html page",
            code: "service.html.parseString(html: '<body><h2>Hello world</h2><p>description</p></body>', selector: 'h2')"
        }
    }
};