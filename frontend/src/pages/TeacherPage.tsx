import { PageContent } from "../layouts/PageContent";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { iconWithClassName } from "../utils/icon-with-classname";
import { ArrowLeft } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useCreateTeacherMutation } from "../store/api/schoolApi";

export function TeacherPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');

  const StyledLeft = useMemo(() => iconWithClassName(ArrowLeft, "w-5 h-5 text-primary"), []);

  const [createTeacher] = useCreateTeacherMutation();

  // forms
  const [name, setName] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [contactNumber, setContactNumber] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const validate = useCallback(() => {
    const errors: Record<string, string> = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!subject) {
      errors.subject = "Subject is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!contactNumber) {
      errors.contactNumber = "Contact number is required";
    }
    if (contactNumber && !/^\d{8}$/.test(contactNumber)) {
      errors.contactNumber = "Contact number is invalid";
    }
    if (contactNumber && contactNumber.length !== 8) {
      errors.contactNumber = "Contact number must be 8 digits";
    }
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  }, [name, subject, email, contactNumber]);

  const onSubmit = useCallback(() => {
    if (validate()) {
      createTeacher({
        name: name!,
        subject: subject! as 'English Language' | 'Mother Tongue Language' | 'Mathematics' | 'Science' | 'Art' | 'Music' | 'Physical Education' | 'Character and Citizenship Education',
        email: email!,
        contactNumber: contactNumber!,
      }).unwrap().then(() => {
        if (from === "class") {
          navigate("/classes/new");
        } else {
          navigate("/teachers");
        }
      }).catch((error) => {
        console.error("Failed to create teacher: ", error);
      });
    }
  }, [validate, from, navigate]);

  return <PageContent>
    <div className="p-8">
      <div className="h-8"></div>
      <div className="flex flex-row justify-between h-10">
        <div className="font-bold text-2xl">Add Teacher</div>
      </div>
    </div>
    <Card className="mx-8 flex flex-col gap-6">
      <Input
        className="w-1/2 md:w-1/3"
        label="Name"
        placeholder="Enter teacher's name"
        type="text"
        value={name ?? ""}
        onChange={(text) => setName(text)}
        errorMessage={errorMessage.name}
      />
      <Select
        className="w-1/2 md:w-1/3"
        label="Subject"
        placeholder="Enter subject taught"
        value={subject ?? ""}
        onSelect={(text) => setSubject(text!)}
        options={[
          { value: 'English Language', label: 'English Language' },
          { value: 'Mother Tongue Language', label: 'Mother Tongue Language' },
          { value: 'Mathematics', label: 'Mathematics' },
          { value: 'Science', label: 'Science' },
          { value: 'Art', label: 'Art' },
          { value: 'Music', label: 'Music' },
          { value: 'Physical Education', label: 'Physical Education' },
          { value: 'Character and Citizenship Education', label: 'Character and Citizenship Education' },
        ]}
        errorMessage={errorMessage.subject}
      />
      <Input
        className="w-1/2 md:w-1/3"
        label="Email"
        placeholder="Enter email address"
        type="email"
        value={email ?? ""}
        onChange={(text) => setEmail(text)}
        errorMessage={errorMessage.email}
      />
      <Input
        className="w-1/2 md:w-1/3"
        label="Work Contact Number"
        placeholder="Enter work contact number"
        type="tel"
        value={contactNumber ?? ""}
        onChange={(text) => setContactNumber(text)}
        errorMessage={errorMessage.contactNumber}
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
      >Add Teacher</Button>
    </div>
  </PageContent >
}