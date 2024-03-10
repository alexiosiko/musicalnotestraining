import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI

const options = {}

if (!URI)
	throw new Error(" Please add your MONGODB UI to .env.local");

let client = new MongoClient(URI, options);
let dbPromise = client.connect().then(client =>
	client.db("MusicalNotesTraining")
);
let usersDbPromise = dbPromise.then(res => res.collection('users'))

export default usersDbPromise;