"use client";

import React, { useState } from "react";
import { Card, Button, Accordion, AccordionItem } from "@heroui/react";
import { FaCheckCircle } from "react-icons/fa";


// --- Data Structures ---
const seekerPlans = [
  {
    name: "Free",
    id:"seeker_free",
    price: "$0",
    period: "/forever",
    description: "Perfect for getting started.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
    buttonText: "Current Plan",
    highlight: false,
  },
  {
    name: "Pro",
    id:"seeker_pro",
    price: "$19",
    period: "/month",
    description: "Ideal for active job seekers.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
    buttonText: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Premium",
    id:"seeker_premium",
    price: "$39",
    period: "/month",
    description: "Maximize your hiring potential.",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
    buttonText: "Upgrade to Premium",
    highlight: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id:"recruiter_free",
    price: "$0",
    period: "/forever",
    description: "Great for a company's first year of hiring.",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    id:"recruiter_growth",
    price: "$49",
    period: "/month",
    description: "For growing teams and startups.",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Choose Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    id:"recruiter_enterprise",
    price: "$149",
    period: "/month",
    description: "Advanced tools for high-volume hiring.",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration & custom branding",
      "Priority support",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my plan at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing cycle.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We do not offer partial refunds for unused time. However, if you experience a technical issue, please contact our support team within 7 days for a potential refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal and Stripe for secure transactions.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. Prorated charges or credits will be applied automatically to your next billing cycle.",
  },
];

// --- Reusable Grid Component ---
const PricingGrid = ({ plans }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {plans.map((plan, index) => (
      <Card
        key={index}
        className={`relative p-8 bg-[#121212] rounded-3xl flex flex-col h-full transition-all duration-300 ${
          plan.highlight
            ? "border-2 border-purple-600 shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] transform md:-translate-y-2"
            : "border border-[#222222]"
        }`}
      >
        {plan.highlight && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-sm text-stone-400 mb-6 h-10">{plan.description}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-white">
              {plan.price}
            </span>
            <span className="text-sm text-stone-500 font-medium">
              {plan.period}
            </span>
          </div>
        </div>

        <div className="flex-grow">
          <p className="text-sm font-semibold text-white mb-4">Key Features:</p>
          <ul className="flex flex-col gap-3">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-stone-300"
              >
                <FaCheckCircle className="text-purple-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-[#222222]">
          {/* click to pay button  */}
          <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="plan_id" value={plan.id}/>
            <section>
              <button type="submit" role="link" className={`inline-flex items-center justify-center w-full font-bold h-14 rounded-xl transition-colors duration-300 ${
              plan.highlight
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-[#222222] text-white hover:bg-[#2c2c2e]"
            }`}>{plan.buttonText}
                
              </button>
            </section>
          </form>
         
        </div>
      </Card>
    ))}
  </div>
);

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-stone-400">
            Choose the plan that fits your needs. Whether you're looking for
            your next dream job or searching for top talent, we have you
            covered.
          </p>
        </div>

        {/* Custom Bulletproof Toggle */}
        <div className="w-full flex justify-center">
          <div className="flex items-center bg-[#121212] border border-[#222222] p-1.5 rounded-full">
            <button
              onClick={() => setActiveTab("seekers")}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "seekers"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiters")}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "recruiters"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Content */}
        <div className="w-full">
          {activeTab === "seekers" ? (
            <PricingGrid plans={seekerPlans} />
          ) : (
            <PricingGrid plans={recruiterPlans} />
          )}
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-3xl mt-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-400 text-sm">
              Have a question? We've got answers.
            </p>
          </div>

          <Accordion variant="splitted" className="gap-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>
                }
                className="bg-[#121212] border border-[#222222] rounded-xl shadow-none px-2"
              >
                <p className="text-stone-400 text-sm pb-4 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
