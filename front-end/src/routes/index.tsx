import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

const Login = lazy(() => import("@/pages/Login/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Transacoes = lazy(() => import("@/pages/Transacoes/Transacoes"));

export const router = createBrowserRouter([
    {
        element: <AppLayout />,   // Header/Sidebar/Footer aqui
        children: [
            { path: "/", element: <Suspense fallback={<div>Carregando…</div>}><Dashboard /></Suspense> },
            { path: "/transacoes", element: <Suspense fallback={<div>Carregando…</div>}><Transacoes /></Suspense> },
        ],
    },
    { path: "/login", element: <Suspense fallback={<div>…</div>}><Login /></Suspense> },
]);
