import { useEffect } from "react";
import { PageContent } from "../layouts/PageContent";
import { useNavigate } from "react-router-dom";
import { useHeaderState } from "../hooks/useHeaderState";

export function IndexPage() {
  const navigate = useNavigate();
  const { setActive } = useHeaderState();
  useEffect(() => {
    setActive("classes");
    navigate("/classes");
  }, []);

  return (
    <PageContent>
      <></>
    </PageContent>
  );
}