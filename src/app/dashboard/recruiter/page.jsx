"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { CircleCheck, FileText, Person, Thunderbolt } from "@gravity-ui/icons";

const Recruiter = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const stats = [
    { title: "Total Job Posts", count: 48, icon: FileText },
    { title: "Total Applicants", count: "1,284", icon: Person },
    { title: "Active Jobs", count: 18, icon: Thunderbolt },
    { title: "Jobs Closed", count: 32, icon: CircleCheck },
  ];

  return (
    // প্যারেন্ট ডিভে max-w-7xl এবং mx-auto যোগ করা হয়েছে
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Welcome back, <span className="font-bold">{user?.name}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Recruiter;
