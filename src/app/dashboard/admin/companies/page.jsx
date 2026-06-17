import { getCompanies } from '@/lib/api/companies';
import React from 'react';
import CompanyTable from './CompanyTable';

const AdminCompaniesPage = async() => {
    const companies = await getCompanies()
    return (
        <div>
            <CompanyTable companies={companies}/>
        </div>
    );
};

export default AdminCompaniesPage;