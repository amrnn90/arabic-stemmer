// length three prefixes
const p3 = ['\u0643\u0627\u0644', '\u0628\u0627\u0644',
    '\u0648\u0644\u0644', '\u0648\u0627\u0644'];

// length two prefixes
const p2 = ['\u0627\u0644', '\u0644\u0644'];

// length one prefixes
const p1 = ['\u0644', '\u0628', '\u0641', '\u0633', '\u0648',
    '\u064a', '\u062a', '\u0646', '\u0627'];

// length three suffixes
const s3 = ['\u062a\u0645\u0644', '\u0647\u0645\u0644',
    '\u062a\u0627\u0646', '\u062a\u064a\u0646',
    '\u0643\u0645\u0644',

    '\u0648\u0646\u0627', ];

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

// groups of length four patterns
const pr4 = {
    0: ['\u0645'], 1: ['\u0627'],
    2: ['\u0627', '\u0648', '\u064A'], 3: ['\u0629']
};

// Groups of length five patterns and length three roots
const pr53 = {
    0: ['\u0627', '\u062a'],
    1: ['\u0627', '\u064a', '\u0648'],
    2: ['\u0627', '\u062a', '\u0645'],
    3: ['\u0645', '\u064a', '\u062a'],
    4: ['\u0645', '\u062a'],
    5: ['\u0627', '\u0648'],
    6: ['\u0627', '\u0645']
};

const re_short_vowels = /[\u064B-\u0652]/;
const re_hamza = /[\u0621\u0624\u0626]/;
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

export default class ArabicStemmer {
    constructor() { }

    stem(token) {
        /*"""
        Stemming a word token using the ISRI stemmer.
        """*/
        token = this.norm(token, 1);   // remove diacritics which representing Arabic short vowels
        if (stop_words.includes(token)) {
            return token;              // exclude stop words from being processed
        }
        token = this.pre32(token);     // remove length three and length two prefixes in this order
        token = this.suf32(token);     // remove length three and length two suffixes in this order
        token = this.waw(token);       // remove connective ‘و’ if it precedes a word beginning with ‘و’
        token = this.norm(token, 2);   // normalize initial hamza to bare alif
        // if 4 <= word length <= 7, then stem; otherwise, no stemming
        if (token.length == 4)         // length 4 word
            token = this.pro_w4(token);

        else if (token.length == 5) {  // length 5 word
            token = this.pro_w53(token);
            token = this.end_w5(token);
        }
        else if (token.length == 6) {  // length 6 word
            token = this.pro_w6(token);
            token = this.end_w6(token);
        }
        else if (token.length == 7) {  // length 7 word
            token = this.suf1(token);
            if (token.length == 7)
                token = this.pre1(token);
            if (token.length == 6) {
                token = this.pro_w6(token)
                token = this.end_w6(token)
            }
        }
        return token
    }

    norm(word, num = 3) {
        /*"""
        normalization:
        num=1  normalize diacritics
        num=2  normalize initial hamza
        num=3  both 1&2
        """*/
        if (num == 1)
            word = word.replace(re_short_vowels, '');
        else if (num == 2)
            word = word.replace(re_initial_hamza, '\u0627');
        else if (num == 3) {
            word = word.replace(re_short_vowels, '');
            word = word.replace(re_initial_hamza, '\u0627');
        }
        return word;
    }

    pre32(word) {
        /*"""remove length three and length two prefixes in this order"""*/
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
        /*"""remove length three and length two suffixes in this order"""*/
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

    waw(word) {
        /*"""remove connective ‘و’ if it precedes a word beginning with ‘و’ """*/
        if (word.length >= 4 && word.substr(0, 2) == '\u0648\u0648')
            word = word.substr(1);
        return word
    }

    pro_w4(word) {
        /* """process length four patterns and extract length three roots""" */
        if (pr4[0].includes(word[0])) {          // مفعل
            word = word.substr(1);
        }
        else if (pr4[1].includes(word[1])) {     // فاعل
            word = word.substr(0, 1) + word.substr(2);
        }
        else if (pr4[2].includes(word[2])) {     // فعال - فعول - فعيل 
            word = word.substr(0, 2) + word[3];
        }
        else if (pr4[3].includes(word[3])) {     // فعلة
            word = word.substr(0, word.length - 1);
        }
        else {
            word = this.suf1(word);      // do - normalize short sufix
            if (word.length == 4)
                word = this.pre1(word);  // do - normalize short prefix
        }
        return word;
    }

    pro_w53(word) {
        /* """process length five patterns and extract length three roots""" */
        if (pr53[0].includes(word[2]) && word[0] == '\u0627')       // افتعل - افاعل
            word = word[1] + word.substr(3);

        else if (pr53[1].includes(word[3]) && word[0] == '\u0645')  // مفعول - مفعال - مفعيل
            word = word.substr(1, 2) + word[4];

        else if (pr53[2].includes(word[0]) && word[4] == '\u0629')  // مفعلة - تفعلة - افعلة
            word = word.substr(1, 3);

        else if (pr53[3].includes(word[0]) && word[2] == '\u062a')  // مفتعل - يفتعل - تفتعل
            word = word[1] + word.substr(3);

        else if (pr53[4].includes(word[0]) && word[2] == '\u0627')  // مفاعل - تفاعل
            word = word[1] + word.substr(3);

        else if (pr53[5].includes(word[2]) && word[4] == '\u0629')  // فعولة - فعالة
            word = word.substr(0, 2) + word[3];

        else if (pr53[6].includes(word[0]) && word[1] == '\u0646')  // انفعل - منفعل
            word = word.substr(2);

        else if (word[3] == '\u0627' && word[0] == '\u0627')      // افعال
            word = word.substr(1, 2) + word[4];

        else if (word[4] == '\u0646' && word[3] == '\u0627')      // فعلان
            word = word.substr(0, 3);

        else if (word[3] == '\u064a' && word[0] == '\u062a')      // تفعيل
            word = word.substr(1, 2) + word[4];

        else if (word[3] == '\u0648' && word[1] == '\u0627')      // فاعول
            word = word[0] + word[2] + word[4]

        else if (word[2] == '\u0627' && word[1] == '\u0648')      // فواعل
            word = word[0] + word.substr(3);

        else if (word[3] == '\u0626' && word[2] == '\u0627')      // فعائل
            word = word.substr(0, 2) + word[4];

        else if (word[4] == '\u0629' && word[1] == '\u0627')      // فاعلة
            word = word[0] + word.substr(2, 2);

        else if (word[4] == '\u064a' && word[2] == '\u0627')     // فعالي
            word = word.substr(0, 2) + word[3];

        else {
            word = this.suf1(word)      // do - normalize short sufix
            if (word.length == 5)
                word = this.pre1(word);  // do - normalize short prefix
        }

        return word;
    }

    pro_w54(word) {
        /* """process length five patterns and extract length four roots""" */
        if (pr53[2].includes(word[0]))  // تفعلل - افعلل - مفعلل
            word = word.substr(1);

        else if (word[4] == '\u0629')        // فعللة
            word = word.substr(0, 4);

        else if (word[2] == '\u0627')        // فعالل
            word = word.substr(0, 2) + word.substr(3);

        return word;
    }

    end_w5(word) {
        /* """ending step (word of length five)""" */
        if (word.length == 4)
            word = this.pro_w4(word);

        else if (word.length == 5)
            word = this.pro_w54(word);

        return word;
    }

    pro_w6(word) {
        /* """process length six patterns and extract length three roots""" */
        if (word.startsWith('\u0627\u0633\u062a') || word.startsWith('\u0645\u0633\u062a'))  // مستفعل - استفعل
            word = word.substr(3);

        else if (word[0] == '\u0645' && word[3] == '\u0627' && word[5] == '\u0629')           // مفعالة
            word = word.substr(1, 2) + word[4];

        else if (word[0] == '\u0627' && word[2] == '\u062a' && word[4] == '\u0627')           // افتعال
            word = word[1] + word[3] + word[5];

        else if (word[0] == '\u0627' && word[3] == '\u0648' && word[2] == word[4])            // افعوعل
            word = word[1] + word.substr(4);

        else if (word[0] == '\u062a' && word[2] == '\u0627' && word[4] == '\u064a')           // تفاعيل   new pattern
            word = word[1] + word[3] + word[5];

        else {
            word = this.suf1(word);      // do - normalize short sufix
            if (word.length == 6)
                word = this.pre1(word);  // do - normalize short prefix
        }

        return word
    }

    pro_w64(word) {
        /* """process length six patterns and extract length four roots""" */
        if (word[0] == '\u0627' && word[4] == '\u0627') {   // افعلال
            word = word.substr(1, 3) + word[5];
        }

        else if (word.startsWith('\u0645\u062a'))            // متفعلل
            word = word.substr(2);

        return word;
    }

    end_w6(word) {
        /* """ending step (word of length six)""" */
        if (word.length == 5) {
            word = this.pro_w53(word);
            word = this.end_w5(word);
        }

        else if (word.length == 6)
            word = this.pro_w64(word);

        return word;
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
};

export {default as Stemmer2} from './Stemmer2';