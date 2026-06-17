import { serverFetch } from "../core/server";

// get plan by id
export const getPlanById = async (id) => {
  return serverFetch(`/api/plans?plan_id=${id}`);
};