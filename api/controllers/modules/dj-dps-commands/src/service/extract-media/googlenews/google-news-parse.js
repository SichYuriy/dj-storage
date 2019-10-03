/** @type {GoogleNewsExtractor} */
const googleNewsExtractor = GoogleNewsExtractorService;

module.exports = {
    name: "service.google.newss",

    synonims: {
        "service.google.newss": "service.google.newss"
    },

    "internal aliases":{
        "query": "query",
        "q": "query",
        "qInTitle": "qInTitle",
        "sources": "sources",
        "domains": "domains",
        "excludeDomains": "excludeDomains",
        "from": "from",
        "startAt": "from",
        "to": "to",
        "stopAt": "to",
        "language": "language",
        "sortBy": "sortBy",
        "pageSize": "pageSize",
        "max" : "pageSize",
        "page": "page",
        // "apiKey": "apiKey"
    },

    defaultProperty: {
        "service.google.newss": "query"
    },

    execute: function (command, state, config) {
        let options = {
            query: command.settings.query || (state.head.data && state.head.data.query),
            qInTitle: command.settings.qInTitle || (state.head.data && state.head.data.qInTitle),
            sources: command.settings.sources || (state.head.data && state.head.data.sources),
            domains: command.settings.domains || (state.head.data && state.head.data.domains),
            excludeDomains: command.settings.excludeDomains || (state.head.data && state.head.data.excludeDomains),
            from: command.settings.from || (state.head.data && state.head.data.from),
            to: command.settings.to || (state.head.data && state.head.data.to),
            language: command.settings.language || (state.head.data && state.head.data.language),
            sortBy: command.settings.sortBy || (state.head.data && state.head.data.sortBy),
            pageSize: command.settings.pageSize || (state.head.data && state.head.data.pageSize),
            page: command.settings.page || (state.head.data && state.head.data.page),
            // apiKey: command.settings.apiKey || (state.head.data && state.head.data.apiKey),
        };
        return googleNewsExtractor.parseQuery(options)
            .then(result => {
                state.head = {
                    type: 'json',
                    data: result
                };
                return state;
            });
    },

    help: {
        synopsis: "Extracts text from Google News",
        name: {
            "default": "service..google.newss",
            synonims: []
        },
        input: ["Params for select text from Google News"],
        output: "json",
        "default param": "query",
        params: [{
            name: "q ",
            synopsis: "Keywords or phrases to search for in the article title and body",
            type: ["string"],
            synonims: ["query"],
            "default value": "undefined"
        }, {
            name: "qInTitle",
            synopsis: "jquery selector to extract text",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "qInTitle",
            synopsis: "Keywords or phrases to search for in the article title only",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "sources",
            synopsis: "A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "domains",
            synopsis: "A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to.",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "excludeDomains",
            synopsis: "A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to remove from the results.",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "from",
            synopsis: "A date and optional time for the oldest article allowed",
            type: ["string"],
            synonims: ["startAt"],
            "default value": "the oldest according to your plan."
        }, {
            name: "to",
            synopsis: "A date and optional time for the newest article allowed.",
            type: ["string"],
            synonims: ["stopAt"],
            "default value": "the newest according to your plan."
        }, {
            name: "language",
            synopsis: "The 2-letter ISO-639-1 code of the language you want to get headlines for (ex: ar, de, fr)",
            type: ["string"],
            synonims: [],
            "default value": "all languages returned"
        }, {
            name: "sortBy",
            synopsis: "The order to sort the articles in (relevancy, popularity, publishedAt)",
            type: ["string"],
            synonims: [],
            "default value": "publishedAt"
        }, {
            name: "pageSize",
            synopsis: "The number of results to return per page. 100 is the maximum",
            type: ["int"],
            synonims: [],
            "default value": 20
        }, {
            name: "page",
            synopsis: "Use this to page through the results",
            type: ["int"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "page",
            synopsis: "Your API key.",
            type: ["string"],
            synonims: [],
            "default value": "undefined"
        }],
        example: {
            description: "Extracts articles from bbc-news",
            code: "service.google.newss(q: 'trump', qInTitle: 'Trump', sources: 'bbc-news', domains: 'bbc.co.uk', from: '2019-09-20', to: '2019-10-03', language: 'en', sortBy: 'popularity', pageSize: 100, page: 1)"
        }
    }
};