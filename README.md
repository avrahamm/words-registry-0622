Registry exercise implemented in jS/ES6 <br/>

The input is taken from './local-db/documents.json' file. 
It fakes DB collection, for simplicity.
'./local-db/api.js' exposes exercise functionality. <br/>

Step 0: <br/>
build project
```
git clone https://github.com/avrahamm/words-registry-0622.git
cd words-registry-0622
npm install
```
Step 1: <br/>
From project root run 
```
node init.js
# console output
{
  I: [ '0', '1', '2', '3', '4' ],
  see: [ '0', '1', '2', '3', '4' ],
  dog: [ '0', '1' ],
  and: [ '0', '1', '3' ],
  tree: [ '0' ],
  love: [ '0', '3' ],
  water: [ '0', '3' ],
  cat: [ '1', '2', '3', '4' ],
  banana: [ '1', '3' ],
  apple: [ '2', '3' ]
}
[
  [ 'I', '0' ],      [ 'see', '0' ],    [ 'dog', '0' ],
  [ 'and', '0' ],    [ 'I', '0' ],      [ 'see', '0' ],
  [ 'tree', '0' ],   [ 'and', '0' ],    [ 'I', '0' ],
  [ 'love', '0' ],   [ 'water', '0' ],  [ 'I', '1' ],
  [ 'see', '1' ],    [ 'dog', '1' ],    [ 'and', '1' ],
  [ 'cat', '1' ],    [ 'banana', '1' ], [ 'banana', '1' ],
  [ 'banana', '1' ], [ 'I', '2' ],      [ 'see', '2' ],
  [ 'cat', '2' ],    [ 'apple', '2' ],  [ 'apple', '2' ],
  [ 'apple', '2' ],  [ 'I', '3' ],      [ 'see', '3' ],
  [ 'cat', '3' ],    [ 'and', '3' ],    [ 'I', '3' ],
  [ 'love', '3' ],   [ 'water', '3' ],  [ 'banana', '3' ],
  [ 'apple', '3' ],  [ 'banana', '3' ], [ 'apple', '3' ],
  [ 'banana', '3' ], [ 'apple', '3' ],  [ 'I', '4' ],
  [ 'see', '4
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
# console output

catDocIds = 1,2,3,4
dogDocIds = 0,1
missingDocIds =
catAndDogDocIds = 1
bananaDocIds = 1,3
appleDocIds = 2,3
bananaAndAppleDocIds = 3
```

There is async main functions uses functions defined <br/>
in './local-db/api.js' by exercise definition. <br/>
There is sequence of commands run api functions.<br/>
First find functions, then add words <br/>
and rebuilds words.json and words-refistry.json,<br/>
and then again runs find functions.<br/>
