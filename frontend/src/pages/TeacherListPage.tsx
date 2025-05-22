import React, { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { PageContent } from "../layouts/PageContent";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { iconWithClassName } from "../utils/icon-with-classname";
import { Plus } from "lucide-react";

import type { GetTeacherData } from "../types/Teacher";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "../components/Table";

function AddTeacherButton() {
  const navigate = useNavigate();
  const StyledPlus = iconWithClassName(Plus, "w-6 h-6 text-white");

  return <Button
    className="bg-primary font-medium text-white"
    onClick={() => navigate("/teachers/new")}
  >
    <div className="flex items-center gap-2">
      <StyledPlus />
      <div>Add Teacher</div>
    </div>
  </Button>;
}

function TeacherTable({
  teachers,
}: {
  teachers: GetTeacherData[];
}) {

  const columns: ColumnDef<GetTeacherData>[] = [
    {
      header: '#',
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'contactNumber',
      header: 'Work Contact',
    },
  ];

  return <Table
    data={teachers}
    columns={columns}
  />;
}


export function TeacherListPage() {
  const [teachers, setTeachers] = useState<GetTeacherData[]>([
    {
      name: 'Alice Tan',
      email: 'alice.tan@example.com',
      contactNumber: '91234567',
      subject: 'English Language',
    },
    {
      name: 'Benjamin Lee',
      email: 'ben.lee@example.com',
      contactNumber: '98765432',
      subject: 'Mathematics',
    },
    {
      name: 'Clara Ng',
      email: 'clara.ng@example.com',
      contactNumber: '92345678',
      subject: 'Science',
    },
    {
      name: 'Daniel Lim',
      email: 'daniel.lim@example.com',
      contactNumber: '93456789',
      subject: 'Art',
    },
    {
      name: 'Elaine Wong',
      email: 'elaine.wong@example.com',
      contactNumber: '94567890',
      subject: 'Music',
    },
    {
      name: 'Farhan Yusof',
      email: 'farhan.yusof@example.com',
      contactNumber: '95678901',
      subject: 'Physical Education',
    },
    {
      name: 'Grace Chan',
      email: 'grace.chan@example.com',
      contactNumber: '96789012',
      subject: 'Mother Tongue Language',
    },
    {
      name: 'Henry Tan',
      email: 'henry.tan@example.com',
      contactNumber: '97890123',
      subject: 'Character and Citizenship Education',
    },
    {
      name: 'Irene Koh',
      email: 'irene.koh@example.com',
      contactNumber: '98901234',
      subject: 'Science',
    },
    {
      name: 'Jason Goh',
      email: 'jason.goh@example.com',
      contactNumber: '99012345',
      subject: 'English Language',
    },
  ]);
  const hasTeacher = useMemo(() => teachers.length > 0, [teachers]);

  return (
    <PageContent>
      <div className="p-8">
        <div className="h-8"></div>
        <div className="flex flex-row justify-between h-10">
          <div className="font-bold text-2xl">Teachers</div>
          {hasTeacher && <AddTeacherButton />}
        </div>
      </div>
      <Card className="mx-8" style={{ height: "calc(100% - 20rem)" }}>
        {
          hasTeacher && <TeacherTable teachers={teachers || []} />
        }
        {
          !hasTeacher && <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="text-black font-bold text-lg">There are no existing teachers yet.</div>
              <AddTeacherButton />
            </div>
          </div>
        }
      </Card>
    </PageContent>
  );
}