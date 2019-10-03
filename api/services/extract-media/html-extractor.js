const cheerio = require('cheerio');
const axios = require('axios');

class HtmlExtractor {
    getContentFromHtml(htmlText, selector) {
        let dom = cheerio.load(htmlText);
        return dom(selector).text();
    }

    getContentByUrl(url, selector) {
        return axios.get(url)
            .then(response => {
                return this.getContentFromHtml(response.data, selector);
            })
    }
}

module.exports = HtmlExtractor;