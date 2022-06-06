Registry exercise implemented in jS/ES6 <br/>

The input is taken from './local-db/documents.json' file. 
It fakes DB collection, for simplicity.
'./local-db/api.js' exposes exercise functionality. <br/>

Step 1: <br/>
From project root run 
```
node init.js
```
will run buildWordsRegistry function builds 
words.json array contains all words [word, documentId] format.
and wordsRegistry map object with word key and array value 
includes all document ids a word included in. <br/>
Both are written to local-db/words.json <br/> 
and local-db/words-registry.json respectively. <br/>


Step 2: <br/>
From project root run
```
node index.js
```

There is async main functions uses functions defined <br/>
in './local-db/api.js' by exercise definition. <br/>
There is sequence of commands run api functions.<br/>
First find functions, then add words <br/>
and rebuilds words.json and words-refistry.json,<br/>
and then again runs find functions.<br/>
