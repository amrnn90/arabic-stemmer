const p4 = ['وكال', 'وبال', 'فبال'];

// length three prefixes
const p3 = ['وال', 'فال', 'كال', 'بال', 'ولل', 'فلل'];

// length two prefixes
const p2 = ['ال', 'لل', 'لي', 'لت', 'لن', 'لا', 'فل', 'فس', 'في', 'فت', 'فن', 'فا', 'سي', 'ست', 'سن', 'سا', 'ول', 'وس', 'وي', 'وت', 'ون', 'وا',];

// length one prefixes
const p1 = ['ل', 'ب', 'ف', 'س', 'و', 'ي', 'ت', 'ن', 'ا',];

// length three suffixes
const s3 = ['\u062a\u0645\u0644', '\u0647\u0645\u0644',
    '\u062a\u0627\u0646', '\u062a\u064a\u0646',
    '\u0643\u0645\u0644'];

// length two suffixes
const s2 = ['\u0648\u0646', '\u0627\u062a', '\u0627\u0646',
    '\u064a\u0646', '\u062a\u0646', '\u0643\u0645',
    '\u0647\u0646', '\u0646\u0627', '\u064a\u0627',
    '\u0647\u0627', '\u062a\u0645', '\u0643\u0646',
    '\u0646\u064a', '\u0648\u0627', '\u0645\u0627',
    '\u0647\u0645'];

// length one suffixes
const s1 = ['\u0629', '\u0647', '\u064a', '\u0643', '\u062a',
    '\u0627', '\u0646', 'و'];

const pr4 = {
    0: ['\u0645'], 1: ['\u0627'],
    2: ['\u0627', '\u0648', '\u064A'], 3: ['\u0629']
};


const re_short_vowels = /[\u064B-\u0652]/g;
const re_hamza = /[\u0621\u0623\u0624\u0625\u0626]/g;
const re_initial_hamza = /^[\u0622\u0623\u0625]/;

const stop_words = ['\u064a\u0643\u0648\u0646',
    '\u0648\u0644\u064a\u0633',
    '\u0648\u0643\u0627\u0646',
    '\u0643\u0630\u0644\u0643',
    '\u0627\u0644\u062a\u064a',
    '\u0648\u0628\u064a\u0646',
    '\u0639\u0644\u064a\u0647\u0627',
    '\u0645\u0633\u0627\u0621',
    '\u0627\u0644\u0630\u064a',
    '\u0648\u0643\u0627\u0646\u062a',
    '\u0648\u0644\u0643\u0646',
    '\u0648\u0627\u0644\u062a\u064a',
    '\u062a\u0643\u0648\u0646',
    '\u0627\u0644\u064a\u0648\u0645',
    '\u0627\u0644\u0644\u0630\u064a\u0646',
    '\u0639\u0644\u064a\u0647',
    '\u0643\u0627\u0646\u062a',
    '\u0644\u0630\u0644\u0643',
    '\u0623\u0645\u0627\u0645',
    '\u0647\u0646\u0627\u0643',
    '\u0645\u0646\u0647\u0627',
    '\u0645\u0627\u0632\u0627\u0644',
    '\u0644\u0627\u0632\u0627\u0644',
    '\u0644\u0627\u064a\u0632\u0627\u0644',
    '\u0645\u0627\u064a\u0632\u0627\u0644',
    '\u0627\u0635\u0628\u062d',
    '\u0623\u0635\u0628\u062d',
    '\u0623\u0645\u0633\u0649',
    '\u0627\u0645\u0633\u0649',
    '\u0623\u0636\u062d\u0649',
    '\u0627\u0636\u062d\u0649',
    '\u0645\u0627\u0628\u0631\u062d',
    '\u0645\u0627\u0641\u062a\u0626',
    '\u0645\u0627\u0627\u0646\u0641\u0643',
    '\u0644\u0627\u0633\u064a\u0645\u0627',
    '\u0648\u0644\u0627\u064a\u0632\u0627\u0644',
    '\u0627\u0644\u062d\u0627\u0644\u064a',
    '\u0627\u0644\u064a\u0647\u0627',
    '\u0627\u0644\u0630\u064a\u0646',
    '\u0641\u0627\u0646\u0647',
    '\u0648\u0627\u0644\u0630\u064a',
    '\u0648\u0647\u0630\u0627',
    '\u0644\u0647\u0630\u0627',
    '\u0641\u0643\u0627\u0646',
    '\u0633\u062a\u0643\u0648\u0646',
    '\u0627\u0644\u064a\u0647',
    '\u064a\u0645\u0643\u0646',
    '\u0628\u0647\u0630\u0627',
    '\u0627\u0644\u0630\u0649'];


const patterns = {
    8: [],
    7: [
        /\u0627\u0633\u062a(.)(.)\u0627(.)/, // استفعال
    ],
    6: [
        /\u0627\u0633\u062a(.)(.)(.)/,      // استفعل
        /\u0645\u0633\u062a(.)(.)(.)/,      // مستفعل
        /\u0645(.)\u0627(.)(.)\u0647/,      // مفاعلة
        /\u0627(.)\u062a(.)\u0627(.)/,      // افتعال
        /\u0627(.)\u0639\u0648(.)(.)/,      // افعوعل
        /\u062a(.)\u0627(.)\u064a(.)/,      // تفاعيل
        /\u0645(.)\u0627(.)\u064a(.)/,      // مفاعيل
        /\u0627(.)(.)(\u064a)\u0627\u0627/, // افعياء
        /(.)(.)(.)\u064a\u0627\u0627/,      // فعلياء
        /(.)\u0648\u0627(.)\u064a(.)/,      // فواعيل
        /\u0645\u062a(.)\u0627(.)(.)/,      // متفاعل

        /* 64 */
        /\u0627(.)(.)(.)\u0627(.)/,         // افعلال
        /\u0645\u062a(.)(.)(.)(.)/,         // متفعلل
        /(.)(.)(.)(.)\u0627\u0627/,         // فعللاء
    ],
    5: [
        /\u0627(.)\u062a(.)(.)/,            // افتعل
        /\u0627(.)\u0627(.)(.)/,            // افاعل
        /\u0645(.)(.)\u0648(.)/,            // مفعول
        /\u0645(.)(.)\u0627(.)/,            // مفعال
        /\u0645(.)(.)\u064a(.)/,            // مفعيل
        /\u0645(.)(.)(.)\u0647/,            // مفعلة
        /\u062a(.)(.)(.)\u0647/,            // تفعلة
        /\u0627(.)(.)(.)\u0647/,            // أفعلة
        /\u0645(.)\u062a(.)(.)/,            // مفتعل
        /\u064a(.)\u062a(.)(.)/,            // يفتعل
        /\u062a(.)\u062a(.)(.)/,            // تفتعل
        /\u0645(.)\u0627(.)(.)/,            // مفاعل
        /\u062a(.)\u0627(.)(.)/,            // تفاعل
        /(.)(.)\u0648(.)\u0647/,            // فعولة
        /(.)(.)\u0627(.)\u0647/,            // فعالة
        /\u0627\u0646(.)(.)(.)/,            // انفعل
        /\u0645\u0646(.)(.)(.)/,            // منفعل
        /\u0627(.)(.)\u0627(.)/,            // افعال
        /(.)(.)(.)\u0627\u0646/,            // فعلان
        /\u062a(.)(.)\u064a(.)/,            // تفعيل
        /(.)\u0627(.)\u0648(.)/,            // فاعول
        /(.)\u0648\u0627(.)(.)/,            // فواعل
        /(.)(.)\u0627\u0626(.)/,            // فعائل
        /(.)\u0627(.)(.)\u0647/,            // فاعلة
        /(.)(.)\u0627(.)\u064a/,            // فعالي
        /(.)(.)(.)\u0627\u0627/,            // فعلاء
    
        /\u062a\u0645(.)(.)(.)/,            // تمفعل

        /* 54 */
        /\u0645(.)(.)(.)(.)/,               // مفعلل
        /\u062a(.)(.)(.)(.)/,               // تفعلل
        /\u0627(.)(.)(.)(.)/,               // افعلل
        /(.)(.)(.)(.)\u0647/,               // فعللة
        /(.)(.)\u0627(.)(.)/,               // فعالل
        /(.)(.)(.)\u0648(.)/,               // فعلول
    ],
    4: [
        /\u0645(.)(.)(.)/,                  // مفعل
        /(.)\u0627(.)(.)/,                  // فاعل
        /(.)(.)\u0648(.)/,                  // فعول
        /(.)(.)\u064a(.)/,                  // فعيل
        /(.)(.)\u0627(.)/,                  // فعال
        /(.)(.)(.)\u0647/,                  // فعلة
    
        /\u0627(.)(.)(.)/,                  // افعل
        /\u062a(.)(.)(.)/,                  // تفعل
        /(.)\u0648(.)(.)/,                  // فوعل
        /(.)\u064a(.)(.)/,                  // فيعل
        /(.)(.)(.)\u0646/,                  // فعلن
    ],
    3: [
        /(.)(.)(.)/
    ]
};

export default class Stemmer {
    stem(token) {
        token = token.trim();
        token = token.replace(re_short_vowels, '');

        if (stop_words.includes(token)) {
            return token;
        }

        token = this.preNormalize(token);

        token = this.pre432(token);     
        token = this.suf32(token);     

        let matches = this.getMatches(token, 'suffix');
        matches = matches.concat(this.getMatches(token, 'prefix'));
        matches = matches.map(m => this.postNormalize(m));
        matches = matches.reduce((res, current) => {
            !res.includes(current) && res.push(current);
            return res;
        }, []);
        return matches;
    }

    pre432(word) {
        if (word.length >= 7) {
            for (let pre4 of p4) {
                if (word.startsWith(pre4))
                    return word.substr(4);
            }
        }
        if (word.length >= 6) {
            for (let pre3 of p3) {
                if (word.startsWith(pre3))
                    return word.substr(3);
            }
        }
        if (word.length >= 5) {
            for (let pre2 of p2) {
                if (word.startsWith(pre2))
                    return word.substr(2);
            }
        }
        return word;
    }

    suf32(word) {
        if (word.length >= 6) {
            for (let suf3 of s3) {
                if (word.endsWith(suf3))
                    return word.substr(0, word.length - 3);
            }
        }
        if (word.length >= 5) {
            for (let suf2 of s2) {
                if (word.endsWith(suf2))
                    return word.substr(0, word.length - 2);
            }
        }

        return word;
    }

    getMatches(token, removeFirst="suffix") {
        let originalToken = token;
        let len = token.length;
        const matches = [];
        while (len >= 3) {
            for (let pat of patterns[len]) {
                let match;
                if (match = pat.exec(token)) {
                    matches.push(match.slice(1).join(''));
                }
            }
            token = this.removeOne(token, removeFirst);

            if (token.length == len) {
                break;
            }
            len -= 1;
        }
        if (matches.length == 0) {
            matches.push(originalToken);
        }
        let finalMatches = [];
        matches.forEach((match) => {
            if (match.length > 3 & match !== originalToken) {
                finalMatches = finalMatches.concat(this.getMatches(match, removeFirst));
            } else {
                finalMatches.push(match);
            }
        });
        return finalMatches;
    }

    removeOne(token, removeFirst="suffix") {
        const len = token.length;
        if (removeFirst == 'suffix') {
            token = this.suf1(token);
            if (token.length == len) {
                token = this.pre1(token);
            }
        } else {
            token = this.pre1(token);
            if (token.length == len) {
                token = this.suf1(token);
            }
        }
        return token;
    }

    suf1(word) {
        /* """normalize short sufix""" */
        for (let sf1 of s1) {
            if (word.endsWith(sf1))
                return word.substr(0, word.length - 1);
        }

        return word;
    }

    pre1(word) {
        /* """normalize short prefix""" */
        for (let sp1 of p1) {
            if (word.startsWith(sp1))
                return word.substr(1);
        }

        return word;
    }

    preNormalize(token) {
        token = token.replace(re_hamza, 'ا');
        token = token.replace(/ى/, 'ي');
        token = token.replace(/ة$/, 'ه');
        return token;
    }

    postNormalize(token) {
        if (token.length == 3) {
            const c1 = token[0].replace(/[وي]/, 'ا');
            const c2 = token[1].replace(/[او]/, 'ي');
            const c3 = token[2].replace(/[اوه]/, 'ي');
            token = c1 + c2 + c3;
        }
        if (token.length == 2) {
            token = token + 'ي';
        }
        return token;
    }
}