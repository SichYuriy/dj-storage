const FileLoader = require('./file-loader');
const xml2jsParser = require('xml2js');

const fileLoader = new FileLoader();

class XmlExtractor {

    parseUrl(url) {
        return fileLoader.loadInMemoryString(url)
            .then(content => this.parseString(content));
    }

    parseString(xmlString) {
        return new Promise((resolve, reject) => {
            xml2jsParser.parseString(xmlString, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = XmlExtractor;