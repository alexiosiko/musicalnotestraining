"use server"

import { ObjectId } from "mongodb";
import usersDbPromise from "./mongodb";

export type User = {
	id: string,
	credits: number,
}

export async function getUser(objectId: ObjectId): Promise<User> {
	const db = await usersDbPromise;
	const user = db.findOne({
		objectId: objectId
	})
	return user as unknown as User;
}

export async function setUser(id: string) {
	console.log("putUser()");
	const db = await usersDbPromise;
	const result = await db.updateOne(
	  { id: id },
	  { $setOnInsert: { id: id, credits: 2500 } },
	  { upsert: true }
	);
  }

export async function updateCredits(id: string, credits: number): Promise<boolean> {
	console.log("updateCredits()");
	const db = await usersDbPromise;
	const user = await db.findOne({ id: id });
	if (!user) {
		return false;
	}

	let result = user.credits;
	result += credits;

	await db.updateOne({ id: id }, { $inc: { credits: credits } });

	return true;
}

export async function getCredits(id: string): Promise<number> {
	console.log("getCredits()");
	const db = await usersDbPromise;
	const user = await db.findOne({ id: id });

	if (!user) {
		return 0;
	}

	return user.credits;
}