import { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Container, Header } from "../layouts/Container";
import { IndexPage } from "../pages/IndexPage";

function SuspenseLoader({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    errorElement: <SuspenseLoader>
      <div className="h-dvh w-dvw bg-white flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center w-screen h-full bg-gray-100">
          <h1 className="text-4xl font-bold text-primary">Sorry!</h1>
          <p className="mt-4 text-lg text-gray-700">The page you are looking for are not found.</p>
        </div>
      </div>
    </SuspenseLoader>,
    children: [
      {
        path: "/",
        element: <SuspenseLoader>
          <IndexPage />
        </SuspenseLoader>,
      }
    ],
  },
]);

export default router;
