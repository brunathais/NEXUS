import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setErr(null);
        try {
            const { data } = await api.post(ENDPOINTS.auth.login, form);
            localStorage.setItem("token", data?.token);
            navigate("/");
        } catch (error: any) {
            setErr(error?.response?.data?.message || "Falha no login");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-gray-50">
            <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
                <h1 className="text-xl font-semibold mb-4">Entrar</h1>
                <label className="block mb-2">
                    <span className="text-sm">Email</span>
                    <input
                        type="email"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-sm">Senha</span>
                    <input
                        type="password"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </label>
                {err && <p className="text-sm text-red-600 mb-3">{err}</p>}
                <button
                    disabled={loading}
                    className="w-full rounded-lg px-3 py-2 border bg-gray-900 text-white disabled:opacity-60"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
