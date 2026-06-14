import React from "react";
import PostJobForm from "./PostJobForm";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const postJobPage = async() => {
    const company = await getLoggedInRecruiterCompany()
 
    
  return (
    <div>
      <PostJobForm company={company}/>
    </div>
  );
};

export default postJobPage;
