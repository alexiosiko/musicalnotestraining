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
		console.log(object);
		const customer: Stripe.Customer = await stripe.customers.retrieve(object.customer);
		await stripe.customers.update(object.customer, {
			metadata: {
				...customer.metadata,
				credits: object.lines.data[0].metadata.credits,
			}
		});
		return true;
	} catch (e) {
		console.error("Error setting credits... :(", e);
		return false;
	}
}

export async function addCredits(customer: any, credits: number) {
	try {
        console.log("addCredits()");
        console.log("Credits to add:", credits);
        
        const currentCredits = customer.metadata && customer.metadata.credits ? parseInt(customer.metadata.credits) : 0;
        const newTotalCredits = currentCredits + credits;
        
    	await stripe.customers.update(customer.id, {
            metadata: {
                ...customer.metadata,
                credits: newTotalCredits.toString() // Convert to string to match Stripe's metadata format
            }
        });
        
        console.log("Customer credits updated successfully. New total credits:", newTotalCredits);
        
        return true;
    } catch (error) {
        console.error("Error adding credits to customer:", error);
        return false;
    }
}


export async function getCredits(userId: string): Promise<number> {
	console.log("getCredits");
	try {
		const customers = await stripe.customers.search({
			query: `metadata[\'userId\']:\'${userId}\'`,
		})
		console.log(customers)
		return customers.data[0].metadata.credits;

	} catch (error) {
		console.error('Error fetching customer:', error);
		throw error
	}

}
