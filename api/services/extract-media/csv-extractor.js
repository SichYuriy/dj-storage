const FileLoader = require('./file-loader');
const csvjson = require("csvjson");

const fileLoader = new FileLoader();

class CsvExtractor {

    parseUrl(url, options) {
        return fileLoader.loadInMemoryString(url)
            .then(content => this.parseString(content, options));
    }

    parseString(csvString, options) {
        let finalOptions = {
            delimiter: (options && options.delimiter) || ';',
            quote: (options && options.quote) || '"'
        };
        return csvjson.toObject(csvString, finalOptions);
    }
}

module.exports = CsvExtractor;