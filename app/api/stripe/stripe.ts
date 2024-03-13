import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { addCredits } from '../mongodb/userapi';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
