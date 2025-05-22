import { useEffect, useMemo, useState } from "react";
import { Card } from "../components/Card";
import { PageContent } from "../layouts/PageContent";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from 'lucide-react';
import { iconWithClassName } from "../utils/icon-with-classname";
import type { GetClassData } from "../types/Class";
import { Table } from "../components/Table";
import { useHeaderState } from "../hooks/useHeaderState";
import { useGetAllClassesQuery } from "../store/api/schoolApi";


function AddClassButton() {
  const navigate = useNavigate();
  const StyledPlus = useMemo(() => iconWithClassName(Plus, "w-6 h-6 text-white"), []);

  return <Button
    className="bg-primary font-medium text-white"
    onClick={() => navigate("/classes/new")}
  >
    <div className="flex items-center gap-2">
      <StyledPlus />
      <div>Add Class</div>
    </div>
  </Button>;
}

function ClassTable({
  classes,
}: {
  classes: GetClassData[];
}) {
  const columns = [
    {
      header: '#',
      cell: (info: any) => info.row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'level',
      header: 'Level',
    },
    {
      accessorKey: 'formTeacher.name',
      header: 'Form Teacher',
    },
  ];

  return <Table
    data={classes}
    columns={columns}
  />;
}

export function ClassListPage() {
  const { data: classes, isLoading } = useGetAllClassesQuery();
  const { setLoading } = useHeaderState();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const hasClass = useMemo(() => classes?.length || 0 > 0, [classes]);

  return (
    <PageContent>
      <div className="p-8">
        <div className="h-8"></div>
        <div className="flex flex-row justify-between h-10">
          <div className="font-bold text-2xl">Classes</div>
          {hasClass && <AddClassButton />}
        </div>
      </div>
      <Card className="mx-8" style={{ height: "calc(100% - 20rem)" }}>
        {
          hasClass && (
            <ClassTable classes={classes} />
          )
        }
        {
          !hasClass && <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="text-black font-bold text-lg">There are no existing classes yet.</div>
              <AddClassButton />
            </div>
          </div>
        }
      </Card>
    </PageContent>
  );
}