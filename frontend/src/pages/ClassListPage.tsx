import { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { PageContent } from "../layouts/PageContent";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from 'lucide-react';
import { iconWithClassName } from "../utils/icon-with-classname";



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

export function ClassListPage() {
  const [classes, setClasses] = useState<any[]>([
    {
      name: "Math 101",
      students: ["Alice", "Bob", "Charlie"],
    },
    {
      name: "History 201",
      students: ["David", "Eve", "Frank"],
    },
  ]);
  const hasClass = useMemo(() => classes.length > 0, [classes]);

  return (
    <PageContent>
      <div className="p-8">
        <div className="h-8"></div>
        <div className="flex flex-row justify-between h-10">
          <div className="font-bold text-2xl">Classes</div>
          {hasClass && <AddClassButton />}
        </div>
      </div>
      <Card className="mx-8" style={{ height: "calc(100% - 10rem)" }}>
        {
          hasClass && (
            <ul className="list-disc pl-8">
              {classes.map((classItem, index) => (
                <li key={index} className="mb-2">
                  {classItem.name}
                </li>
              ))}
            </ul>
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