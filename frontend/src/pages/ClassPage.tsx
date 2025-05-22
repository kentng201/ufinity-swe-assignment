import { PageContent } from "../layouts/PageContent";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useCallback, useMemo, useState } from "react";
import { iconWithClassName } from "../utils/icon-with-classname";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import type { GetTeacherData } from "../types/Teacher";

export function ClassPage() {
  const navigate = useNavigate();
  const StyledLeft = useMemo(() => iconWithClassName(ArrowLeft, "w-5 h-5 text-primary"), []);
  const [teachers, setTeachers] = useState<GetTeacherData[]>([]);

  // forms
  const [classLevel, setClassLevel] = useState<string>();
  const [className, setClassName] = useState<string | null>(null);
  const [formTeacher, setFormTeacher] = useState<string | null>(null);

  const onAddNewTeacher = useCallback(() => {
    navigate("/teachers/add");
  }, [navigate]);

  return <PageContent>
    <div className="p-8">
      <div className="h-8"></div>
      <div className="flex flex-row justify-between h-10">
        <div className="font-bold text-2xl">Add Class</div>
      </div>
    </div>
    <Card className="mx-8 flex flex-col gap-6">
      <Select
        className="w-1/2 md:w-1/3"
        label="Class Level"
        placeholder="Select a level"
        value={classLevel}
        options={[
          { value: "Primary 1", label: "Primary 1" },
          { value: "Primary 2", label: "Primary 2" },
          { value: "Primary 3", label: "Primary 3" },
          { value: "Primary 4", label: "Primary 4" },
          { value: "Primary 5", label: "Primary 5" },
          { value: "Primary 6", label: "Primary 6" },
        ]}
        onSelect={(value) => setClassLevel(value!)}
      />
      <Input
        className="w-1/2 md:w-1/3"
        label="Class Name"
        placeholder="Enter class name"
        type="text"
        value={className ?? ""}
        onChange={(text) => setClassName(text)}
      />
      <Select
        className="w-1/2 md:w-1/3"
        label="Form Teacher"
        placeholder="Assign a form teacher"
        options={teachers.map((teacher) => ({
          value: teacher.email,
          label: teacher.name,
        }))}
        value={formTeacher}
        onSelect={(value) => setFormTeacher(value!)}
        emptyDisplay={
          <div className="text-gray-500 text-sm">
            <div>No existing teachers.</div>
            <div className="cursor-pointer underline" onClick={onAddNewTeacher}>Add a teacher</div>
          </div>
        }
      />
    </Card>
    <div className="flex flex-row justify-end gap-4 p-8">
      <Button
        className="border-2 border-primary text-primary font-medium bg-white"
        onClick={() => navigate(-1)}
      >
        <div className="flex items-center gap-2">
          <StyledLeft />
          <div>Back</div>
        </div>
      </Button>
      <Button
        className="border-2 bg-primary text-white font-medium"
      >Add Class</Button>
    </div>
  </PageContent >
}