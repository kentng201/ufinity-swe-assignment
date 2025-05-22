import { PageContent } from "../layouts/PageContent";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useMemo } from "react";
import { iconWithClassName } from "../utils/icon-with-classname";
import { ArrowLeft } from "lucide-react";

export function ClassPage() {
  const StyledLeft = useMemo(() => iconWithClassName(ArrowLeft, "w-5 h-5 text-primary"), []);

  return <PageContent>
    <div className="p-8">
      <div className="h-8"></div>
      <div className="flex flex-row justify-between h-10">
        <div className="font-bold text-2xl">Add Class</div>
      </div>
    </div>
    <Card className="mx-8">

    </Card>
    <div className="flex flex-row justify-end gap-4 p-8">
      <Button className="border-2 border-primary text-primary bg-white">
        <div className="flex items-center gap-2">
          <StyledLeft />
          <div>Back</div>
        </div>
      </Button>
      <Button className="border-2 bg-primary text-white">Add Class</Button>
    </div>
  </PageContent >
}