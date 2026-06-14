import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const applyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  return <div className="mt-20">apply page</div>;
};

export default applyPage;
