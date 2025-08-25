import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppLayout() {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div className="grid grid-cols-[16rem_1fr]">
                <Sidebar>
                    <nav className="p-2 space-y-1">
                        <NavLink to="/" className="block rounded px-3 py-2 hover:bg-gray-100">Dashboard</NavLink>
                        <NavLink to="/transacoes" className="block rounded px-3 py-2 hover:bg-gray-100">Transações</NavLink>
                    </nav>
                </Sidebar>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}
