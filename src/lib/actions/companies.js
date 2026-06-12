"use server";

import { serverMutation } from "../core/server";


export const createCompany = async (newCompanyData) => {
  return await serverMutation("/api/companies", newCompanyData);
};
