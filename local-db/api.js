const fs = require('fs-extra');

exports.addWord = async function addWord(word, documentId) {
    const documents = await fs.readJson('./local-db/documents.json');
    const words = await fs.readJson('./local-db/words.json');
    const wordsRegistry = await fs.readJson('./local-db/words-registry.json');
    if ( documents[documentId] === undefined ) {
        return false;
    }

    documents[documentId] += ' ' + word;
    words.push([word, documentId]);
    updateWordRegistry(wordsRegistry, word, documentId);

    await fs.writeJson('./local-db/documents.json', documents);
    await fs.writeJson('./local-db/words.json', words);
    await fs.writeJson('./local-db/words-registry.json', wordsRegistry);
}

/**
 * O(1)
 * @param word
 * @return documentIds array contain the word
 */
exports.findWord = async function findWord(word) {
    const wordsRegistry = await fs.readJson('./local-db/words-registry.json');
    if (wordsRegistry[word] === undefined) {
        return [];
    }
    return wordsRegistry[word];
}

/**
 * Finds intersection document ids include all words.
 * @param words
 * @return documentIds array all contain the words
 */
exports.findWords = async function findWords(words) {
    const wordsRegistry = await fs.readJson('./local-db/words-registry.json');
    if ( words.find(word => wordsRegistry[word] === undefined )) {
        return [];
    }

    const sorted = words.sort( (a,b) => wordsRegistry[a].length - wordsRegistry[b].length );
    const shortest = sorted[0];
    let commonDocIds = [];
    wordsRegistry[shortest].forEach( shortestDocId => {
        const isCommon =  words.every( (word) => wordsRegistry[word].includes(shortestDocId) );
        if (isCommon) {
            commonDocIds.push(shortestDocId);
        }
    } );
    return commonDocIds;
}

/**
 * Builds words and wordsRegistry
 * from './local-db/documents.json' input file.
 * @return {Promise<void>}
 */
exports.buildWordsRegistry = async function buildWordsRegistry() {
    try {
        const words = [];
        const wordsRegistry = {};
        const documents = await fs.readJson('./local-db/documents.json');
        const documentKeys = Object.keys(documents);
        documentKeys.forEach(documentKey => {
            const document = documents[documentKey];
            const documentWords = document.split(" ").filter(word => word !== "");
            documentWords.forEach(curDocumentWord => {
                updateWordRegistry(wordsRegistry, curDocumentWord, documentKey);
                words.push([curDocumentWord, documentKey]);
            })
        })
        console.log(wordsRegistry);
        console.log(words);

        await fs.writeJson('./local-db/words.json', words);
        await fs.writeJson('./local-db/words-registry.json', wordsRegistry);

    } catch (err) {
        console.error(err)
    }
}

function updateWordRegistry(wordsRegistry, curDocumentWord, documentKey) {
    if (wordsRegistry[curDocumentWord] === undefined) {
        wordsRegistry[curDocumentWord] = [];
        wordsRegistry[curDocumentWord].push(documentKey);
    } else {
        if (!(wordsRegistry[curDocumentWord].find(item => item === documentKey))) {
            wordsRegistry[curDocumentWord].push(documentKey);
        }
    }
}