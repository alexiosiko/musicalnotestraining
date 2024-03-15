// "use server"

// import { ObjectId, WithId } from "mongodb";
// import usersDbPromise from "./mongodb";

// export type User = {
// 	userId: string,
// 	credits: number,
// 	customerId: string | undefined,
// }


// export async function getUser(userId: string): Promise<User | null> {
// 	const db = await usersDbPromise;
// 	const user = db.findOne({
// 		userId: userId
// 	})
// 	return user as unknown as User | null;
// }

// export async function verifyUser(userId: string) {
// 	console.log("verifyUser()");
// 	const db = await usersDbPromise;
// 	const result = await db.updateOne(
// 	  { userId: userId },
// 	  { $setOnInsert: { userId: userId, credits: 25, customerId: "" } },
// 	  { upsert: true }
// 	);
// }

// export async function addCredits(userOrCustId: string, credits: number, isCustomerId: boolean = false): Promise<boolean> {
// 	console.log(`updateCredits() userOrCustId: ${userOrCustId}`);
// 	const db = await usersDbPromise;
// 	try {
// 		if (isCustomerId) {
// 			await db.updateOne({ customerId: userOrCustId }, { $inc: { credits: credits } });
// 			return true;
// 		} else {
// 			await db.updateOne({ userId: userOrCustId }, { $inc: { credits: credits  } });
// 			return true;
// 		}
// 	} catch (e) {
// 		console.error(e);
// 		return false;
// 	}
// }

// export async function getCredits(userId: string): Promise<number> {
// 	console.log("getCredits()");
// 	const db = await usersDbPromise;
// 	const user = await db.findOne({ userId: userId });

// 	if (!user) {
// 		return 0;
// 	}

// 	return user.credits;
// }

// export async function getCustomerId(userId: string): Promise<string | null> {
// 	console.log("getCustomerId()");
// 	try {
// 		const db = await usersDbPromise;
// 		const user = await db.findOne({ userId: userId });
// 		if (user) {
// 			return user.customerId;
// 		}
// 		else 
// 			return "";

// 	} catch (e) {
// 		console.error(e);
// 		return null;
// 	}
// }

// export async function setCustomerId(userId: string, customerId: string): Promise<boolean> {
// 	console.log("setCustomerId()");
// 	try {
// 		const db = await usersDbPromise;
// 		const result = await db.updateOne({ userId: userId }, { $setOnInsert: { customerId: customerId } });
// 		if (result.modifiedCount === 1) {
// 			return true; // Return true if the document was successfully updated
// 		} else {
// 			return false; // Return false if the document was not updated
// 		}
// 	} catch (e) {
// 		console.error(e);
// 		return false; // Return false if an error occurred
// 	}
// }