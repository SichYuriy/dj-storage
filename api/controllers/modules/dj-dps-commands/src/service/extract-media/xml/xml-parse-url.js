/** @type {XmlExtractor} */
let xmlExtractor = XmlExtractorService;

module.exports = {
    name: "service.xml.parseUrl",

    synonims: {},

    "internal aliases": {
        "url": "url",
    },

    defaultProperty: {
        "service.xml.parseUrl": "url"
    },

    execute: function (command, state, config) {
        let url = command.settings.url || (state.head.data && state.head.data.url);
        return xmlExtractor.parseUrl(url)
            .then(result => {
                state.head = {
                    type: 'json',
                    data: result
                };
                return state;
            })
    },

    help: {
        synopsis: "downloads xml file and parses it",
        name: {
            "default": "service.xml.parseUrl",
            synonims: []
        },
        input: ["url to download xml file"],
        output: "json",
        "default param": "url",
        params: [{
            name: "url",
            synopsis: "url to download xml file",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "parse some xml",
            code: "service.xml.parseUrl('https://www.w3schools.com/xml/note.xml')"
        }
    }
};