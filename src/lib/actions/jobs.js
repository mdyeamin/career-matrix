"use server";
const baseurl = process.env.NEXT_PUBLIC_SERVER_URL
export const postJobs = async (jobData) => {
  const res = await fetch(`${baseurl}/api/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  console.log("After post from frontend", res);

  return res.json();
};
