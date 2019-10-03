const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4713697fa6024dccaee7ed8f03f728f3');

class GoogleNewsExtractor {

    parseQuery(options) {
        return newsapi.v2.everything({
            q: (options && options.query) || 'trump',
            qInTitle: (options && options.qInTitle) || '',
            sources: (options && options.sources) || '',
            domains: (options && options.domains) ||'',
            excludeDomains: (options && options.excludeDomains) || '',
            from: (options && options.from) || '2019-09-03',
            to: (options && options.to) || '2019-10-03',
            language: (options && options.language) || '',
            sortBy: (options && options.sortBy) || 'relevancy',
            pageSize: (options && options.pageSize) || 10,
            page: (options && options.page) || 2,
            // apiKey: (options && options.apiKey) || ''
        });
    }
}

module.exports = GoogleNewsExtractor;