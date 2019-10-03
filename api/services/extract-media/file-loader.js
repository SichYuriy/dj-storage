const axios = require('axios');
const streamBuffers = require('stream-buffers');

class FileLoader {
    loadInMemoryBuffer(url) {
        return this.loadFile(url)
            .then(writer => writer.getContents());
    }

    loadInMemoryString(url) {
        return this.loadFile(url)
            .then(writer => writer.getContentsAsString());
    }

    /** @private */
    loadFile(url) {
        return axios({
            url: url,
            method: 'get',
            responseType: 'stream'
        }).then(response => {
            let writer = new streamBuffers.WritableStreamBuffer();
            response.data.pipe(writer);
            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(writer));
                writer.on('error', error => reject(error));
            })
        })
    }
}

module.exports = FileLoader;