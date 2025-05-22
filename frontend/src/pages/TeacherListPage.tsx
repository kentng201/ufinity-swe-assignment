import { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { PageContent } from "../layouts/PageContent";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { iconWithClassName } from "../utils/icon-with-classname";
import { Plus } from "lucide-react";

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

export function TeacherListPage() {
  const [teachers, setTeachers] = useState<any[]>([
    // {
    //   name: "John Doe",
    // },
    // {
    //   name: "Jane Smith",
    // },
  ]);
  const hasTeacher = useMemo(() => teachers.length > 0, [teachers]);
  console.log('hasTeacher: ', hasTeacher);

  return (
    <PageContent>
      <div className="p-8">
        <div className="h-8"></div>
        <div className="flex flex-row justify-between h-10">
          <div className="font-bold text-2xl">Teachers</div>
          {hasTeacher && <AddTeacherButton />}
        </div>
      </div>
      <Card className="mx-8" style={{ height: "calc(100% - 10rem)" }}>
        {
          hasTeacher && <ul className="list-disc pl-8">
            {teachers.map((teacher, index) => (
              <li key={index} className="mb-2">
                {teacher.name}
              </li>
            ))}
          </ul>

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