const { MongoClient } = require('mongodb');

async function main() {
    // const uri = "mongodb+srv://indirectonly08:Anand123@cluster0.f7gtfiv.mongodb.net/?retryWrites=true&w=majority";
    const uri = "mongodb://localhost:27017/MyDb";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        //await listDatabases(client);
        await fineOneListingByName(client, "Anand");
   }
    catch(e) {
        console.log(e);
    }
    finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases : ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}

async function creatListing(client, newListing) {
    const result = await client.db("urlShortener").collection("testing").insertOne(newListing);
    console.log(`The _id for the newly added list is ${result.insertedId}`);
}

async function fineOneListingByName(client, newListing) {
    const result = await client.db("urlShortener").collection("testing").findOne({name : newListing});
    if (result) {
        console.log(`Found the listing ${result.name}`);
    }
    else {
        console.log(`Did not find the result`);
    }
}

main().catch(console.error);
