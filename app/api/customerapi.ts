"use server"

import Stripe from "stripe";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function getCustomerId(userId: string): Promise<string | undefined> {
	console.log("getCustomerId");
	try {
		const customer = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		return customer.data[0].id;
	} catch (error) {
		console.error('Error fetching customer:', error);
		throw error
	}

}

export async function setCredits(object: Stripe.Invoice): Promise<boolean> {
	console.log("setCredits()");
	try {
		const customer: Stripe.Customer = await stripe.customers.retrieve(object.customer);
		const credits = object.lines.data[0].plan?.metadata?.credits;
		if (credits === undefined) 
			return false;
		await stripe.customers.update(object.customer, {
			metadata: {
				...customer.metadata,
				credits: credits,
			}
		});
		return true;
	} catch (e) {
		console.error("Error setting credits... :(", e);
		return false;
	}
}

export async function findCustomerAndAddCredits(userId: string, credits: number): Promise<{ ok: boolean, credits?: number}> {
	try {
		const customers = await stripe.customers.list();
		const customer = customers.data.find((_customer: { metadata: { userId: string }}) => _customer.metadata.userId === userId)
		if (customer)
			return await addCredits(customer, credits);
		else 
			return { ok: false };
	} catch (e) {
		console.error(e);
		return { ok: false };
	}
}

export async function addCredits(customer: Stripe.Customer, credits: number): Promise<{ ok: boolean, credits?: number}> {
	try {
        console.log("addCredits()");
        const currentCredits = customer.metadata && customer.metadata.credits ? parseInt(customer.metadata.credits) : 0;
        const newTotalCredits = currentCredits + credits;
        
    	await stripe.customers.update(customer.id, {
            metadata: {
                ...customer.metadata,
                credits: newTotalCredits.toString() // Convert to string to match Stripe's metadata format
            }
        });
        
        console.log("Customer credits updated successfully. New total credits:", newTotalCredits);
        return { ok: true, credits: newTotalCredits };
    } catch (error) {
        console.error("Error adding credits to customer:", error);
		return { ok: false  };

    }
}


export async function getCredits(userId: string): Promise<number> {
	console.log("getCredits");
	try {
		const customers = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		return parseInt(customers.data[0].metadata.credits);
	} catch (error) {
		console.error('Error fetching customer:', error);
		throw error
	}

}
