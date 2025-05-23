import { PageContent } from "../layouts/PageContent";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { iconWithClassName } from "../utils/icon-with-classname";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useCreateClassMutation, useGetAllTeachersQuery } from "../store/api/schoolApi";
import { useHeaderState } from "../hooks/useHeaderState";

export function ClassPage() {
  const navigate = useNavigate();

  const StyledLeft = useMemo(() => iconWithClassName(ArrowLeft, "w-5 h-5 text-primary"), []);

  const { data: teachers, isLoading } = useGetAllTeachersQuery();
  const [createClass] = useCreateClassMutation();
  const { setLoading } = useHeaderState();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // forms
  const [level, setLevel] = useState<string>();
  const [name, setName] = useState<string | null>(null);
  const [teacherEmail, setTeacherEmail] = useState<string | null>(null);

  const onAddNewTeacher = useCallback(() => {
    navigate("/teachers/add?from=class");
  }, [navigate]);

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const validate = useCallback(() => {
    const errors: Record<string, string> = {};
    if (!level) {
      errors.level = "Class level is required";
    }
    if (!name) {
      errors.name = "Class name is required";
    }
    if (!teacherEmail) {
      errors.teacherEmail = "Form teacher is required";
    }
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  }, [level, name, teacherEmail]);

  const onSubmit = useCallback(() => {
    if (validate()) {
      setLoading(true);
      createClass({
        level: level! as 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6',
        name: name!,
        teacherEmail: teacherEmail!,
      }).unwrap().then(() => {
        setLoading(false);
        navigate("/classes");
      }
      ).catch((error) => {
        setLoading(false);
        console.error("Failed to create class: ", error);
        if (error.status === 400 && error.data?.error === "Validation failed") {
          const validationErrors = error.data.details.reduce((acc: Record<string, string>, issue: { field: string; message: string }) => {
            acc[issue.field] = issue.message;
            return acc;
          }, {});
          setErrorMessage(validationErrors);
        } else {
          alert('Unknown error occurred. Please try again later.');
        }
      });
    }
  }, [validate, level, name, teacherEmail, createClass, setLoading]);

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
        value={level}
        options={[
          { value: "Primary 1", label: "Primary 1" },
          { value: "Primary 2", label: "Primary 2" },
          { value: "Primary 3", label: "Primary 3" },
          { value: "Primary 4", label: "Primary 4" },
          { value: "Primary 5", label: "Primary 5" },
          { value: "Primary 6", label: "Primary 6" },
        ]}
        onSelect={(value) => setLevel(value!)}
        errorMessage={errorMessage.level}
      />
      <Input
        className="w-1/2 md:w-1/3"
        label="Class Name"
        placeholder="Enter class name"
        type="text"
        value={name ?? ""}
        onChange={(text) => setName(text)}
        errorMessage={errorMessage.name}
      />
      <Select
        className="w-1/2 md:w-1/3"
        label="Form Teacher"
        placeholder="Assign a form teacher"
        options={(teachers || []).map((teacher) => ({
          value: teacher.email,
          label: teacher.name,
        }))}
        value={teacherEmail}
        onSelect={(value) => setTeacherEmail(value!)}
        emptyDisplay={
          <div className="text-gray-500 text-sm">
            <div>No existing teachers.</div>
            <div className="cursor-pointer underline" onClick={onAddNewTeacher}>Add a teacher</div>
          </div>
        }
        errorMessage={errorMessage.teacherEmail}
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
        onClick={onSubmit}
      >Add Class</Button>
    </div>
  </PageContent >
}