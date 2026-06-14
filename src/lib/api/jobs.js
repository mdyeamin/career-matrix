import { serverFetch } from "../core/server";

const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

// get all jobs
export const getJobs = async () => {
  return serverFetch("/api/jobs");
};
// get job by id
export const getJobById = async (id) => {
  return serverFetch(`/api/jobs/${id}`);
};

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseurl}/api/jobs?companyId=${companyId}&status=${status}`,
  );

  const data = res.json();
  console.log(data);

  return data;
};
