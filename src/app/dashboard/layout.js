import DashboardSideBar from "@/components/dashboard/DashboardSideBar";
import React from "react";

const dashboardLayout = ({ children }) => {
  return (
    <div className="mt-24 flex min-h-screen">
      <DashboardSideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default dashboardLayout;
