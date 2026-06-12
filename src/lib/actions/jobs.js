"use server";

import { serverMutation } from "../core/server";

export const postJobs = async (jobData) => {
  return serverMutation("/api/jobs", jobData);
};
