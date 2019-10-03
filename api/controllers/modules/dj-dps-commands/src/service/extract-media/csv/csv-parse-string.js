/** @type {CsvExtractor} */
let csvExtractor = CsvExtractorService;

module.exports = {
    name: "service.csv.parseString",

    synonims: {},

    "internal aliases": {
        "csvString": "csvString",
        "delimiter": "delimiter",
        "quote": "quote"
    },

    defaultProperty: {
        "service.csv.parseString": "csvString"
    },

    execute: function (command, state, config) {
        let csvString = command.settings.csvString || (state.head.data && state.head.data.csvString);
        let options = {
            delimiter: command.settings.delimiter || (state.head.data && state.head.data.delimiter),
            quote: command.settings.quote || (state.head.data && state.head.data.quote)
        };
        let result = csvExtractor.parseString(csvString, options);
        state.head = {
            type: 'json',
            data: result
        };
        return Promise.resolve(state);
    },

    help: {
        synopsis: "parses csv",
        name: {
            "default": "service.csv.parseString",
            synonims: []
        },
        input: ["csv string to parse"],
        output: "json",
        "default param": "csvString",
        params: [{
            name: "csvString",
            synopsis: "csv to parse",
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
            description: "parse some csv",
            //TODO: add example
            code: "service.xml.parseUrl('https://www.w3schools.com/xml/note.xml')"
        }
    }
};