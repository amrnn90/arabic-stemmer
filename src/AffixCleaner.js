const prefixes = {
    4: ['وكال', 'وبال', 'فبال'],
    3: ['وال', 'فال', 'كال', 'بال', 'ولل', 'فلل'],
    2: ['ال', 'لل', 'لي', 'لت', 'لن', 'لا', 'فل', 'فس', 'في', 'فت', 'فن', 'فا', 'سي', 'ست', 'سن', 'سا', 'ول', 'وس', 'وي', 'وت', 'ون', 'وا',],
    1: ['ل', 'ب', 'ف', 'س', 'و', 'ي', 'ت', 'ن', 'ا',]
};

const suffixes = {
    4: [],
    3: ['\u062a\u0645\u0644', '\u0647\u0645\u0644',
    '\u062a\u0627\u0646', '\u062a\u064a\u0646',
    '\u0643\u0645\u0644'],
    2: ['\u0648\u0646', '\u0627\u062a', '\u0627\u0646',
    '\u064a\u0646', '\u062a\u0646', '\u0643\u0645',
    '\u0647\u0646', '\u0646\u0627', '\u064a\u0627',
    '\u0647\u0627', '\u062a\u0645', '\u0643\u0646',
    '\u0646\u064a', '\u0648\u0627', '\u0645\u0627',
    '\u0647\u0645'],
    1: ['\u0629', '\u0647', '\u064a', '\u0643', '\u062a',
    '\u0627', '\u0646', 'و']
};

export default class AffixCleaner {
    constructor(token) {
        this.token = token;
        this.currentToken = token;
        this.prefix = '';
        this.suffix = '';
    }

    remove(count, priority="suffix", bothSides=false) {
        if (!this.canRemoveAffix(count)) {
            return this.currentToken;
        }

        let order = priority == 'suffix' ? ['Suffix', 'Prefix'] : ['Prefix', 'Suffix'];
        let affix = null;
        order.forEach((affixType) => {
            if (!affix || bothSides) {
                affix = this['get'+affixType](count);
                this['remove'+affixType](affix);
            }
        });

        return this.currentToken;
    }

    removeAll() {
        let token = this.currentToken;
        while(true) {
            const len = token.length;
            token = this.remove(1, 'suffix', true);
            
            if (len == token.length)
                break;
        }
        return token;
    }

    getPrefix(count) {
        const token = this.currentToken;
        let affixList = prefixes[count] || [];

        for (let prefix of affixList) {
            if (token.startsWith(prefix) && this.isValidPrefix(prefix)) {
                return prefix;
            }
        }
        return '';
    }

    isValidPrefix(prefix) {
        const wholePrefix = this.prefix + prefix;
        const pList = prefixes[wholePrefix.length];
        if (pList && pList.includes(wholePrefix)) {
            return true;
        }
        return false;
    }

    removePrefix(prefix) {
        if (this.currentToken.startsWith(prefix)) {
            this.currentToken = this.currentToken.substr(prefix.length);
            this.prefix = this.prefix + prefix;
        }
    }

    getSuffix(count) {
        const token = this.currentToken;
        let affixList = suffixes[count] || [];

        for (let suffix of affixList) {
            if (token.endsWith(suffix) && this.isValidSuffix(suffix)) {
                return suffix;
            }
        }
        return '';
    }

    isValidSuffix(suffix) {
        return true;
        const wholeSuffix = suffix + this.suffix;
        const sList = suffixes[wholeSuffix.length];

        if (sList && sList.includes(wholeSuffix)) {
            return true;
        }
        return false;
    }

    removeSuffix(suffix) {
        if (this.currentToken.endsWith(suffix)) {
            this.currentToken = this.currentToken.substr(0, this.currentToken.length - suffix.length);
            this.suffix = suffix + this.suffix;
        }

    }

    canRemoveAffix(count) {
        return this.currentToken.length - count >= 3;
    }
}