/** @type {CsvExtractor} */
let csvExtractor = CsvExtractorService;

module.exports = {
    name: "service.csv.parseUrl",

    synonims: {},

    "internal aliases": {
        "url": "url",
        "delimiter": "delimiter",
        "quote": "quote"
    },

    defaultProperty: {
        "service.csv.parseUrl": "url"
    },

    execute: function (command, state, config) {
        let url = command.settings.url || (state.head.data && state.head.data.url);
        let options = {
            delimiter: command.settings.delimiter || (state.head.data && state.head.data.delimiter),
            quote: command.settings.quote || (state.head.data && state.head.data.quote)
        };
        return csvExtractor.parseUrl(url, options)
            .then(result => {
                state.head = {
                    type: 'json',
                    data: result
                };
                return state;
            });
    },

    help: {
        synopsis: "downloads and parses csv",
        name: {
            "default": "service.csv.parseUrl",
            synonims: []
        },
        input: ["csv string to parse"],
        output: "json",
        "default param": "url",
        params: [{
            name: "url",
            synopsis: "url to download csv",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "delimiter",
            synopsis: "delimiter in csv",
            type: ["string"],
            synonims: [],
            "default value": ";"
        }, {
            name: "quote",
            synopsis: "quote in csv",
            type: ["string"],
            synonims: [],
            "default value": '"'
        }],
        example: {
            description: "download and parse some csv",
            code: "service.xml.parseUrl('https://www.w3schools.com/xml/note.xml')"
        }
    }
};