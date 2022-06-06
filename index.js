const {
    addWord,
    findWord,
    findWords,
} = require('./local-db/api');

async function main() {
    try {
        const catDocIds = await findWord('cat');
        const dogDocIds = await findWord('dog');
        const missingDocIds = await findWord('missing');
        const catAndDogDocIds = await findWords(['cat', 'dog']);

        console.log(`catDocIds = ${catDocIds}`);
        console.log(`dogDocIds = ${dogDocIds}`);
        console.log(`missingDocIds = ${missingDocIds}`);
        console.log(`catAndDogDocIds = ${catAndDogDocIds}`);

        // Adding words to existing documents.
        await addWord('banana', '1');
        await addWord('banana', '3');
        await addWord('apple', '2');
        await addWord('apple', '3');

        const bananaDocIds = await findWord('banana');
        const appleDocIds = await findWord('apple');
        const bananaAndAppleDocIds = await findWords(['banana', 'apple']);

        console.log(`bananaDocIds = ${bananaDocIds}`);
        console.log(`appleDocIds = ${appleDocIds}`);
        console.log(`bananaAndAppleDocIds = ${bananaAndAppleDocIds}`);
    }
    catch (err) {
        console.error(err);
    }
}

main().then();
