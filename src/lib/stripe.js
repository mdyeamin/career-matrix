import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID= {
    'seeker_pro':"price_1TiZieCb4qFyQqClauDugjvF",
    'seeker_premium':"price_1TiqS5Cb4qFyQqClB3a8be50",
    'recruiter_growth':"price_1TiqT0Cb4qFyQqClThPSRATq",
    'recruiter_enterprise':"price_1TiqTZCb4qFyQqClJhO94AAx",
}