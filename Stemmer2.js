const p4 = ['وكال', 'وبال', 'فبال'];

// length three prefixes
const p3old = ['\u0643\u0627\u0644', '\u0628\u0627\u0644',
    '\u0648\u0644\u0644', '\u0648\u0627\u0644'];
const p3 = ['وال', 'فال', 'كال', 'بال', 'ولل', 'فلل'];

// length two prefixes
const p2old = ['\u0627\u0644', '\u0644\u0644'];
const p2 = ['ال', 'لل', 'لي', 'لت', 'لن', 'لا', 'فل', 'فس', 'في', 'فت', 'فن', 'فا', 'سي', 'ست', 'سن', 'سا', 'ول', 'وس', 'وي', 'وت', 'ون', 'وا',];

// length one prefixes
const p1old = ['\u0644', '\u0628', '\u0641', '\u0633', '\u0648',
    '\u064a', '\u062a', '\u0646', '\u0627', 'ت'];
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
    '\u0627', '\u0646'];

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

const pat7 = [
    /\u0627\u0633\u062a(.)(.)\u0627(.)/, // استفعال
];

// Groups of length six patterns and length three roots
const pat6 = [
    /\u0627\u0633\u062a(.)(.)(.)/,      // استفعل
    /\u0645\u0633\u062a(.)(.)(.)/,      // مستفعل
    /\u0645(.)\u0627(.)(.)\u0629/,      // مفاعلة
    /\u0627(.)\u062a(.)\u0627(.)/,      // افتعال
    /\u0627(.)\u0639\u0648(.)(.)/,      // افعوعل
    /\u062a(.)\u0627(.)\u064a(.)/,      // تفاعيل
    /\u0645(.)\u0627(.)\u064a(.)/,      // مفاعيل
    /\u0627(.)(.)(\u064a)\u0627\u0621/, // افعياء
    /(.)(.)(.)\u064a\u0627\u0621/,      // فعلياء
    /(.)\u0648\u0627(.)\u064a(.)/,      // فواعيل
    /\u0645\u062a(.)\u0627(.)(.)/,      // متفاعل
];

// Groups of length six patterns and length four roots
const pat64 = [
    /\u0627(.)(.)(.)\u0627(.)/,         // افعلال
    /\u0645\u062a(.)(.)(.)(.)/,         // متفعلل
    /(.)(.)(.)(.)\u0627\u0621/,         // فعللاء
];

// Groups of length five patterns and length three roots
const pat5 = [
    /\u0627(.)\u062a(.)(.)/,            // افتعل
    /\u0627(.)\u0627(.)(.)/,            // افاعل
    /\u0645(.)(.)\u0648(.)/,            // مفعول
    /\u0645(.)(.)\u0627(.)/,            // مفعال
    /\u0645(.)(.)\u064a(.)/,            // مفعيل
    /\u0645(.)(.)(.)\u0629/,            // مفعلة
    /\u062a(.)(.)(.)\u0629/,            // تفعلة
    /\u0627(.)(.)(.)\u0629/,            // أفعلة
    /\u0645(.)\u062a(.)(.)/,            // مفتعل
    /\u064a(.)\u062a(.)(.)/,            // يفتعل
    /\u062a(.)\u062a(.)(.)/,            // تفتعل
    /\u0645(.)\u0627(.)(.)/,            // مفاعل
    /\u062a(.)\u0627(.)(.)/,            // تفاعل
    /(.)(.)\u0648(.)\u0629/,            // فعولة
    /(.)(.)\u0627(.)\u0629/,            // فعالة
    /\u0627\u0646(.)(.)(.)/,            // انفعل
    /\u0645\u0646(.)(.)(.)/,            // منفعل
    /\u0627(.)(.)\u0627(.)/,            // افعال
    /(.)(.)(.)\u0627\u0646/,            // فعلان
    /\u062a(.)(.)\u064a(.)/,            // تفعيل
    /(.)\u0627(.)\u0648(.)/,            // فاعول
    /(.)\u0648\u0627(.)(.)/,            // فواعل
    /(.)(.)\u0627\u0626(.)/,            // فعائل
    /(.)\u0627(.)(.)\u0629/,            // فاعلة
    /(.)(.)\u0627(.)\u064a/,            // فعالي
    /(.)(.)(.)\u0627\u0621/,            // فعلاء

    /\u062a\u0645(.)(.)(.)/,            // تمفعل
];

// Groups of length five patterns and length four roots
const pat54 = [
    /\u0645(.)(.)(.)(.)/,               // مفعلل
    /\u062a(.)(.)(.)(.)/,               // تفعلل
    /\u0627(.)(.)(.)(.)/,               // افعلل
    /(.)(.)(.)(.)\u0629/,               // فعللة
    /(.)(.)\u0627(.)(.)/,               // فعالل
    /(.)(.)(.)\u0648(.)/,               // فعلول
];

// groups of length four patterns
const pat4 = [
    /\u0645(.)(.)(.)/,                  // مفعل
    /(.)\u0627(.)(.)/,                  // فاعل
    /(.)(.)\u0648(.)/,                  // فعول
    /(.)(.)\u064a(.)/,                  // فعيل
    /(.)(.)\u0627(.)/,                  // فعال
    /(.)(.)(.)\u0629/,                  // فعلة

    /\u0627(.)(.)(.)/,                  // افعل
    /\u062a(.)(.)(.)/,                  // تفعل
    /(.)\u0648(.)(.)/,                  // فوعل
    /(.)\u064a(.)(.)/,                  // فيعل
    /(.)(.)(.)\u0646/,                  // فعلن

];

const pat3 = [
    /(.)(.)(.)/                         // فعل
];

export default class Stemmer2 {
    stem(token) {
        token = this.preNormalize(token);
        let candidates = this.getCandidates([pat7, pat6, pat64, pat5, pat54, pat4, pat3], token);

        // if (candidates.length == 0) {
        //     candidates = this.getCandidates([pat3], token);
        // }

        candidates = candidates.filter(({ root, prefix, suffix }) => {
            return this.isPotentialPrefix(prefix) && this.isPotentialSuffix(suffix);
        });

        candidates = candidates.map(c => {
            c.root = this.postNormalize(c.root);
            return c;
        });

        candidates.sort((a, b) => {
            const lenDiff = a.root.length - b.root.length;
            if (lenDiff)
                return lenDiff;

            const aFreq = candidates.reduce((freq, { root }) => (root == a.root ? freq + 1 : freq), 0);
            const bFreq = candidates.reduce((freq, { root }) => (root == b.root ? freq + 1 : freq), 0);
            return bFreq - aFreq;
        });

        return candidates;
    }

    getMatchingPatterns(token) {
        return [pat7, pat6, pat64, pat5, pat54, pat4, pat3].reduce((res, patList) => {
            let currentRes = [];
            patList.forEach(pat => {
                let match;
                if (match = pat.exec(token)) {
                    currentRes = currentRes.concat(pat.source);
                }
            });
            return res.concat(currentRes);
        }, []);
    }

    getCandidates(patternGroups, token) {
        return patternGroups.reduce((res, patList) => {
            let currentRes = [];
            patList.forEach(pat => {
                currentRes = currentRes.concat(this.extract(pat, token));
            });
            return res.concat(currentRes);
        }, []);
    }

    extract(pattern, token) {
        const results = [];
        let _token = token;
        while (_token.length >= 3) {
            let match;
            if (match = pattern.exec(_token)) {
                const [prefix, suffix] = token.split(match[0]);
                const root = match.slice(1).join('');
                results.push({ root, prefix, suffix, patLen: match[0].length });
                _token = token.substr(prefix.length + 1);
            } else {
                break;
            }
        }

        return results;
    }

    isPotentialPrefix(prefix) {
        switch (prefix.length) {
            case 4: return p4.includes(prefix);
            case 3: return p3.includes(prefix);
            case 2: return p2.includes(prefix);
            case 1: return p1.includes(prefix);
            case 0: return true;
        }
        return false;
    }

    isPotentialSuffix(suffix) {
        s3.forEach(s => {
            suffix = suffix.replace(s, '');
        });
        s2.forEach(s => {
            suffix = suffix.replace(s, '');
        });
        s1.forEach(s => {
            suffix = suffix.replace(s, '');
        });

        if (suffix.length == 0)
            return true;
        return false;
    }

    preNormalize(token) {
        token = token.replace(re_short_vowels, '');
        token = token.replace(re_hamza, 'ا');
        token = token.replace(/ى/, 'ي');
        return token;
    }

    postNormalize(token) {
        console.log(token.split(''))
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