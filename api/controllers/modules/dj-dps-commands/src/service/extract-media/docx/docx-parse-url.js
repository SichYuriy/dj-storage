/** @type {DocxExtractor} */
const docxExtractor = DocxExtractorService;

module.exports = {
    name: "service.docx.parseUrl",

    synonims: {},

    "internal aliases": {
        "url": "url"
    },

    defaultProperty: {
        "service.docx.parseUrl": "url"
    },

    execute: function (command, state, config) {
        let url = command.settings.url || (state.head.data && state.head.data.url);
        return docxExtractor.getContentByUrl(url)
            .then(text => {
                state.head = {
                    type: 'string',
                    data: text
                };
                return state;
            });
    },

    help: {
        synopsis: "Extracts text from docx document",
        name: {
            "default": "service.docx.parseUrl",
            synonims: []
        },
        input: ["Url to download docx file"],
        output: "string",
        params: [{
            name: "url",
            synopsis: "url to download docx file",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "Extracts text from docx document",
            code: "service.docx.parseUrl(url:'https://calibre-ebook.com/downloads/demos/demo.docx')"
        }
    }
};