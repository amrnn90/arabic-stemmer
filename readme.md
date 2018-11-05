# Arabic Stemmer
A simple stemmer for arabic words. 

The goal of this stemmer is not to produce a linguistically correct root (that is extremely difficult to achieve for the Arabic language), but rather to have a stem that is hopefully shared between various forms of the word.

It does this by producing a list of potential stems as well as a normalized form of the original word (which might be helpful as a boosting signal when executing a search).

## Installation
```shell
npm install arabic-stemmer
```

or include the file from the dist folder

```html
<script src="./dist/index.js"></script>
```

## Usage
```javascript
import Stemmer from 'arabic-stemmer';
const stemmer = new Stemmer();    // only this line when included with script tag

console.log(stemmer.stem('المستشفيات')); 
console.log(stemmer.stem('كالشفاء')); 
/*
output:
{ stem: [ 'شفي', 'سشف' ], normalized: 'مستشف' }
{ stem: [ 'شفي' ], normalized: 'شفا' }
(both share a common stem ('شفي'))
*/

console.log(stemmer.stem('الأولاد')); 
console.log(stemmer.stem('المولودين')); 
/*
output: 
{ stem: [ 'ولد' ], normalized: 'اولاد' }
{ stem: [ 'ولد', 'ملد' ], normalized: 'مولود' }
(both share a common stem 'ولد')
*/
```

### Output
Stemmer.stem(input) returns an object with the following fields:
- *stem*: a list of potential stems.
- *normalized*: the original word but normalized (without affixes or diacritics).

```
```
