const cheerio = require('cheerio');
const AdmZip = require("adm-zip");
const FileLoader = require('./file-loader');

const fileLoader = new FileLoader();

class DocxExtractor {
    getContentByUrl(url) {
        return fileLoader.loadInMemoryBuffer(url)
            .then(contentBuffer => {
                const zip = new AdmZip(contentBuffer);
                const xml = zip.readAsText("word/document.xml");
                let $ = cheerio.load(xml, {
                    normalizeWhitespace: true,
                    xmlMode: true
                });
                let out = [];
                $('w\\:t').each((i, el) => {
                    out.push($(el).text())
                });
                return out.join(' ');
            });
    }
}

module.exports = DocxExtractor;