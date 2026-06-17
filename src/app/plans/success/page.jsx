import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscriptions } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  // Next.js 15 এ searchParams একটি Promise, তাই await করা হয়েছে
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, metadata, customer_details } = session;
  // যদি কোনো কারণে ইমেইল না থাকে, তার জন্য একটি সেফটি ফলব্যাক
  const customerEmail = customer_details?.email || "your registered email";

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email:customerEmail,
      planId: metadata.planId,
    };
    const res = await createSubscriptions(subsInfo)
    console.log(res);
    
    return (
      <div className="min-h-[85vh] mt-20 flex items-center justify-center px-4 bg-[#0a0a0a]">
        <div className="max-w-md w-full text-center bg-[#121212] border border-[#222222] p-8 sm:p-10 rounded-[28px] shadow-2xl flex flex-col items-center gap-6">
          {/* Success Animated Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Payment Successful!
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              We appreciate your business. A confirmation email with your
              receipt has been sent to <br />
              <span className="text-white font-medium">{customerEmail}</span>.
            </p>
          </div>

          {/* Support Information Box */}
          <div className="w-full p-4 rounded-xl bg-[#1a1a1a] border border-[#2c2c2e] text-sm text-stone-400">
            Have any questions? <br />
            Email us at{" "}
            <a
              href="mailto:support@yourdomain.com"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              support@yourdomain.com
            </a>
          </div>

          {/* Action Button */}
          <Link
            href="/dashboard" // এখানে আপনার অ্যাপের ড্যাশবোর্ড বা হোম পেজের লিংক দিন
            className="w-full inline-flex items-center justify-center h-12 px-6 mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-900/20"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }
}
