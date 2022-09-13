
const { MongoClient } = require('mongodb');
const { url, dbName, collectionName } = require('./getConnectionString')
const client = new MongoClient(url);

const connect =  async () => {
    console.log(`inside connect module `);
    try {
        console.log(`inside try block `);
        await client.connect();
        console.log(`Client connected successfully`)
    }
    catch (err) {
        console.log(`inside catch block `);
        console.log(`Failed to conect to the database`);
        console.log(err);
        return false;
    }
    return client;
}

const disconnect = async() => {
    console.log(`inside disconnect module `);
    try {
        console.log(`inside try block `);
        await client.stop();
    }
    catch (err) {
        console.log(`inside catch block `);
        console.log(`Failed to disconnect to the database`);
        console.log(err);
        return false;
    }
    return true;
}

const insertData = async (client, newListing) => {
    try {
        console.log(`Inside the creatlisting module`)
        const result = await client.db(dbName).collection(collectionName).insertOne(newListing);
        console.log(`The _id for the newly added list is ${result.insertedId} with shortUrl ${newListing.shortUrl}`);
    }
    catch(err) {
        console.log(`Failed to insert the data into the collection`);
        console.log(err);
    }
}


const getAllData = async (client) => {
    const cursor = await client.db(dbName).collection(collectionName).find();
    if (cursor) {
        console.log(`Found the listing `);
        list = [];
        await cursor.forEach(obj => {
            // console.log(obj.fullUrl);
            var singleObj = {};
            singleObj['fullUrl']   =  obj.fullUrl;
            singleObj['shortUrl']  = obj.shortUrl;
            list.push(singleObj);           
        });
        return list;
    }
    else {
        console.log(`Did not find the result`);
    }
}

const getOneData = async (client, shortUrl) => {
    const result = await client.db(dbName).collection(collectionName).findOne({shortUrl : shortUrl});
    if (result) {
        // console.log(`Found the listing `);
        // list = [];
        // await cursor.forEach(obj => {
        //     // console.log(obj.fullUrl);
        //     var singleObj = {};
        //     singleObj['fullUrl']   =  obj.fullUrl;
        //     singleObj['shortUrl']  = obj.shortUrl;
        //     list.push(singleObj);           
        // });
        // return list;
        console.log(result);
        return result;
    }
    else {
        console.log(`Did not find the result`);
    }
}

module.exports = {
    connect,
    disconnect,
    insertData,
    getAllData,
    getOneData
}

