import kuromoji from "kuromoji";

class Analyzer {
    constructor({ dicPath } = {}) {
        this._analyzer = null;

        if (!dicPath) {
            this._dicPath = require.resolve('kuromoji').replace(/src(?!.*src).*/, 'dict/');
        } else {
            this._dicPath = dicPath;
        }
    }

    init() {
        return new Promise((resolve, reject) => {
            let self = this;
            if (this._analyzer == null) {
                kuromoji.builder({ dicPath: this._dicPath }).build(function (err, newAnalyzer) {
                    if (err)
                        return reject(err);

                    self._analyzer = newAnalyzer;
                    resolve();
                });
            } else {
                reject(new Error("This analyzer has already been initialized."));
            }
        });
    }

    parse(str = "", callback = () => { }) {
        if (str.trim() == "") return callback(null, str);
        callback(null, this._analyzer.tokenize(str));
    }
}

export default Analyzer;