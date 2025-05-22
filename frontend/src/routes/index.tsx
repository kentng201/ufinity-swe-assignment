import { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Container, Header } from "../layouts/Container";
import { IndexPage } from "../pages/IndexPage";
import { PageContent } from "../layouts/PageContent";
import { ClassListPage } from "../pages/ClassListPage";
import { ClassPage } from "../pages/ClassPage";
import { TeacherListPage } from "../pages/TeacherListPage";
import { TeacherPage } from "../pages/TeacherPage";

function SuspenseLoader({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
}

function ErrorPage() {
  return <SuspenseLoader>
    <div className="h-dvh w-dvw bg-white flex flex-col">
      <Header />
      <PageContent className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-primary">Sorry!</h1>
        <p className="mt-4 text-lg text-gray-700">The page you are looking for was not found.</p>
      </PageContent>
    </div>
  </SuspenseLoader>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SuspenseLoader>
          <IndexPage />
        </SuspenseLoader>,
      },
      {
        path: "/classes",
        element: <SuspenseLoader>
          <ClassListPage />
        </SuspenseLoader>,
      },
      {
        path: "/classes/:classId",
        element: <SuspenseLoader>
          <ClassPage />
        </SuspenseLoader>,
      },
      {
        path: "/teachers",
        element: <SuspenseLoader>
          <TeacherListPage />
        </SuspenseLoader>,
      },
      {
        path: "/teachers/:teacherId",
        element: <SuspenseLoader>
          <TeacherPage />
        </SuspenseLoader>,
      }
    ],
  },
]);

export default router;
