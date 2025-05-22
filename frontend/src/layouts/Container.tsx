import logo from "../assets/menu-logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useHeaderState } from "../hooks/useHeaderState";
import { cn } from "../utils/tailwind-merge";

export function HeaderOption({
  title,
  onClick,
  active,
}: {
  title: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return <div
    className={cn(
      "cursor-pointer px-6 h-full font-bold text-primary flex items-center text-center text-lg",
      "border-b-4",
      active && "border-primary",
      !active && "border-transparent",
    )}
    onClick={onClick}
  >
    {title}
  </div>;
}

export function Header() {
  const navigate = useNavigate();
  const { active, setActive } = useHeaderState();

  return <div className="h-24 shadow-sm w-full bg-white flex flex-row items-center px-4 gap-2">
    <img src={logo} alt="Logo" className="h-10" />
    <div className="w-18" />
    <HeaderOption
      onClick={() => {
        setActive("classes");
        navigate("/classes");
      }}
      title="Classes"
      active={active === "classes"}
    />
    <HeaderOption
      onClick={() => {
        setActive("teachers");
        navigate("/teachers");
      }}
      title="Teachers"
      active={active === "teachers"}
    />
  </div>;
}

export function Container() {
  const {
    loading,
    setLoading,
    active,
    setActive,
  } = useHeaderState();

  return <div className="h-dvh w-dvw bg-white flex flex-col">
    {
      loading && <Loader />
    }
    <Header />
    <Outlet />
  </div>;
}