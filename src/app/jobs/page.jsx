import FilterJobs from "@/components/jobs/FilterJobs";
import { getJobs } from "@/lib/api/jobs";
import { Suspense } from "react";

const Page = async () => {
  // ডাটাবেজ বা এপিআই থেকে একবারে সব ডাটা ফেচ করা হচ্ছে
  const allJobsData = await getJobs();

  return (
    <div className="max-w-7xl mx-auto mt-20 p-6 flex flex-col gap-6">
      {/* পুরো ডাটা অ্যারেটি ফিল্টার কম্পোনেন্টে প্রপস হিসেবে পাঠিয়ে দেওয়া হলো */}
      <Suspense fallback={"Loading..."}>
        <FilterJobs allJobs={allJobsData} />
      </Suspense>
    </div>
  );
};

export default Page;
