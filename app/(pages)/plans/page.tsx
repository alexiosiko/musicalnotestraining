"use client"

import React, { useEffect, useRef, useState } from 'react';
import { plans } from "@/components/plans/data";
import Plan from '@/components/plans/plan';
import { useUser } from '@clerk/nextjs';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { ThreeDots } from 'react-loader-spinner';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { getSessionId } from '../../api/customerapi';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function Plans() {
    const clerkUser = useUser();
    const [customerId, setCustomerId] = useState<string | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const alertDialogTriggerRef = useRef<HTMLButtonElement>(null);
	async function getCustomerAndSessionId() {
		if (clerkUser && clerkUser.user) {
			const res = await fetch("/api/customer", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: clerkUser.user.id,
				})
			})
			const json = await res.json();
			let _customerId;
			if (res.status != 200) {
				alert("Error connecting to Stripe Database... " +  json.message);
				return;
			} else {
				_customerId = json.customerId;
				setCustomerId(_customerId)
			}
			setSessionId(await getSessionId(_customerId));
		}
	}
    useEffect(() => {
        async function fetchData() {
            try {
                if (clerkUser.user == undefined || clerkUser.user.id == undefined) {
                    alertDialogTriggerRef.current?.click();
                    return;
                }
				await getCustomerAndSessionId();
				
            } catch (e) {
                alert(e);
            }
        }
        fetchData();
    }, [clerkUser.user?.id]);

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="hidden" ref={alertDialogTriggerRef} >Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>You must sign in first</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please create an account, or sign in.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Understood</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className='m-auto mt-12 gap-12 flex flex-col'>
                <CardTitle >Become a Subscriber!</CardTitle>
                <div>
                    {/* {customerId === undefined && (
                        <motion.div className='flex gap-2'>
                            <CardDescription>Fetching data </CardDescription>
                            <ThreeDots height={20} width={40} />
                        </motion.div>
                    )} */}

					<div className='md:flex justify-between'>
						{plans.map((plan, index: number) => (
							<motion.div key={index} className='mb-4'>
								<Plan alertDialogTriggerRef={alertDialogTriggerRef} customerId={customerId} user={clerkUser.user} data={plan} />
							</motion.div>
						))}
					</div>
                </div>

                {sessionId !== undefined &&
                    <form action="/api/create-portal-session" method="POST" className='m-auto'>
                        <input
                            type="hidden"
                            id="session-id"
                            name="session_id"
                            value={sessionId}
                        />
                        <Button id="checkout-and-portal-button" type="submit" className=''>
                            Manage your Subscriptions
                        </Button>
                    </form>
                }
            </div>
        </>
    );
}

