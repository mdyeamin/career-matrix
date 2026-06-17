

"use server";

import { serverMutation } from "../core/server";




export const createSubscriptions = async (subsData) => {
  return serverMutation("/api/subscriptions", subsData);
};
