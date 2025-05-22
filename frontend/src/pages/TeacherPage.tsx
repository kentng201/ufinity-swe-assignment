import { PageContent } from "../layouts/PageContent";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { iconWithClassName } from "../utils/icon-with-classname";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Select } from "../components/Select";

export function TeacherPage() {
  const navigate = useNavigate();
  const StyledLeft = useMemo(() => iconWithClassName(ArrowLeft, "w-5 h-5 text-primary"), []);

  const [name, setName] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [contactNumber, setContactNumber] = useState<string | null>(null);

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
      />
      <Select
        className="w-1/2 md:w-1/3"
        label="Subject"
        placeholder="Enter subject taught"
        value={subject ?? ""}
        onSelect={(text) => setSubject(text)}
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
      />
      <Input
        className="w-1/2 md:w-1/3"
        label="Email"
        placeholder="Enter email address"
        type="email"
        value={email ?? ""}
        onChange={(text) => setEmail(text)}
      />
      <Input
        className="w-1/2 md:w-1/3"
        label="Work Contact Number"
        placeholder="Enter work contact number"
        type="tel"
        value={contactNumber ?? ""}
        onChange={(text) => setContactNumber(text)}
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
      <Button className="border-2 bg-primary text-white font-medium">Add Teacher</Button>
    </div>
  </PageContent >
}