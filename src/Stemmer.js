import AffixCleaner from './AffixCleaner';

const re_short_vowels = /[\u064B-\u0652]/g;
const re_hamza = /[\u0621\u0623\u0624\u0625\u0626]/g;

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
        /\u0627\u0646(.)(.)\u0627(.)/,      // انفعال
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
    constructor() {
        this.affixCleaner = null;
    }

    stem(token) {

        token = token.trim();
        token = token.replace(re_short_vowels, '');

        if (stop_words.includes(token) || token.length < 3) {
            return token;
        }

        token = this.preNormalize(token);

        this.affixCleaner = new AffixCleaner(token);
        token = this.affixCleaner.remove(4, 'prefix', true);
        token = this.affixCleaner.remove(3, 'prefix', true);
        token = this.affixCleaner.remove(2, 'prefix', true);

        let matches = this.getMatches(token, 'suffix');
        matches = matches.concat(this.getMatches(token, 'prefix'));
        matches = matches.map(m => this.postNormalize(m));

        matches = matches.reduce((res, current) => {
            !res.includes(current) && res.push(current);
            return res;
        }, []);

        return {
            stem: matches,
            normalized: this.affixCleaner.removeAll()
        };
    }

    getMatches(token, removeFirst = "suffix", inRecursion=false) {
        let originalToken = token;
        let len = token.length;
        let matches = [];
        while (len > 3) {
            matches = matches.concat(this.getMatchesForPatterns(token, patterns[len]));
            // token = this.removeOne(token, removeFirst);
            token = this.affixCleaner.remove(1, 'suffix', false);

            if (token.length == len) {
                break;
            }
            len -= 1;
        }

        if (matches.length == 0 && !inRecursion) {
            matches = matches.concat(this.getMatchesForPatterns(token, patterns[3]));
        }

        let finalMatches = [];
        matches.forEach((match) => {
            if (match.length > 3 && match !== originalToken) {
                finalMatches = finalMatches.concat(this.getMatches(match, removeFirst, true));
            } else {
                finalMatches.push(match);
            }
        });


        return finalMatches;
    }

    getMatchesForPatterns(token, patterns) {
        const matches = [];
        for (let pat of patterns) {
            let match;
            if (match = pat.exec(token)) {
                matches.push(match.slice(1).join(''));
            }
        }
        return matches;
    }

    preNormalize(token) {
        token = token.replace(re_hamza, 'ا');
        token = token.replace(/ى/, 'ي');
        token = token.replace(/ة$/, 'ه');
        return token;
    }

    postNormalize(token) {
        if (token.length == 3) {
            // const c1 = token[0].replace(/[وي]/, 'ا');
            const c1 = token[0].replace(/[ي]/, 'ا');
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