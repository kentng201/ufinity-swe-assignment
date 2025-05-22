import { useEffect, useMemo } from "react";
import { Card } from "../components/Card";
import { PageContent } from "../layouts/PageContent";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { iconWithClassName } from "../utils/icon-with-classname";
import { Plus } from "lucide-react";

import type { GetTeacherData } from "../types/Teacher";
import type { ColumnDef } from "@tanstack/react-table";
import { Table } from "../components/Table";
import { useGetAllTeachersQuery } from "../store/api/schoolApi";
import { useHeaderState } from "../hooks/useHeaderState";

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
  const { data: teachers, isLoading } = useGetAllTeachersQuery();
  const { setLoading } = useHeaderState();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const hasTeacher = useMemo(() => teachers?.length || 0 > 0, [teachers]);

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