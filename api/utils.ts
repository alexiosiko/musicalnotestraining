import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function queryStringToJson(queryString: string) {
	// Split the query string into key-value pairs
	const keyValuePairs = queryString.split('&');
  
	// Initialize an empty object to store the result
	const result: any = {};
  
	// Loop through each key-value pair
	keyValuePairs.forEach((keyValue) => {
	  // Split each key-value pair into key and value
	  const [key, value] = keyValue.split('=');
  
	  // Decode URI components and add them to the result object
	  result[key] = decodeURIComponent(value || '');
	});
  
	return result;
  }
