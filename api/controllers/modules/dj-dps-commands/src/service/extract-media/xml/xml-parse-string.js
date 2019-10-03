/** @type {XmlExtractor} */
let xmlExtractor = XmlExtractorService;

module.exports = {
    name: "service.xml.parseString",

    synonims: {},

    "internal aliases": {
        "xml": "xml",
    },

    defaultProperty: {
        "service.xml.parseString": "xml"
    },

    execute: function (command, state, config) {
        let xml = command.settings.xml || (state.head.data && state.head.data.xml);
        return xmlExtractor.parseString(xml)
            .then(result => {
                state.head = {
                    type: 'json',
                    data: result
                };
                return state;
            })
    },

    help: {
        synopsis: "Parses xml",
        name: {
            "default": "service.xml.parseString",
            synonims: []
        },
        input: ["xml string"],
        output: "json",
        "default param": "xml",
        params: [{
            name: "xml",
            synopsis: "xml to parse",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "parse some xml",
            code: "service.xml.parseString('<root>Hello xml2js!</root>')"
        }
    }
};