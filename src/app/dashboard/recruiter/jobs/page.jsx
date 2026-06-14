import { getCompanyJobs } from '@/lib/api/jobs';
import { Button, Table } from '@heroui/react';
import { Pencil, TrashBin, Briefcase, MapPin } from '@gravity-ui/icons';
import React from 'react';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const Jobs = async () => {
  const company = await getLoggedInRecruiterCompany()
  const companyId = company._id; // todo
  const data = await getCompanyJobs(companyId);

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase size={24} className="text-stone-400" />
          Company Jobs
        </h2>
      </div>

      <div className="w-full bg-[#121214] border border-stone-800 rounded-2xl p-2 shadow-xl">
        <Table aria-label="Job postings table">
          <Table.ScrollContainer>
            <Table.Content className="min-w-[800px]">
              <Table.Header>
                <Table.Column isRowHeader className="text-stone-500 uppercase text-xs tracking-wider">Job Title</Table.Column>
                <Table.Column className="text-stone-500 uppercase text-xs tracking-wider">Salary Range</Table.Column>
                <Table.Column className="text-stone-500 uppercase text-xs tracking-wider">Location</Table.Column>
                <Table.Column className="text-stone-500 uppercase text-xs tracking-wider">Status</Table.Column>
                <Table.Column className="text-stone-500 uppercase text-xs tracking-wider text-right">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {data.map((job) => (
                  <Table.Row key={job._id} className="hover:bg-stone-900/30 transition-colors">
                    {/* Job Title */}
                    <Table.Cell className="font-semibold text-white">
                      {job.jobTitle}
                    </Table.Cell>

                    {/* Salary Range */}
                    <Table.Cell className="text-stone-300 font-mono">
                      {job.minSalary} - {job.maxSalary} <span className="text-stone-600">{job.currency?.toUpperCase()}</span>
                    </Table.Cell>

                    {/* Location */}
                    <Table.Cell>
                      <div className="flex items-center gap-1.5 text-stone-300">
                        {job.isRemote ? (
                          <span className="text-xs bg-stone-800 px-2 py-1 rounded">Remote</span>
                        ) : (
                          <>
                            <MapPin size={14} className="text-stone-500" />
                            {job.location}
                          </>
                        )}
                      </div>
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                        job.status === 'active' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                          : 'bg-stone-500/10 border-stone-500/20 text-stone-400'
                      }`}>
                        {job.status.toUpperCase()}
                      </span>
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell>
                      <div className="flex justify-end gap-2">
                        <Button isIconOnly size="sm" variant="flat" className="bg-stone-800 text-stone-300 hover:bg-stone-700">
                          <Pencil size={16} />
                        </Button>
                        <Button isIconOnly size="sm" variant="flat" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                          <TrashBin size={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default Jobs;