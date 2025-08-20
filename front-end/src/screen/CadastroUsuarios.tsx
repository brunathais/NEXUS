import React, { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";

/**
 * Cadastro de Usuários (React + Vite + TypeScript) — Nexus Finance
 *
 * Recursos:
 * - Campos: usuário, e-mail, senha, confirmar senha
 * - Contadores de caracteres (usuário 50, e-mail 100, senha 20)
 * - Mostrar/ocultar senha com ícone
 * - Validações (campos obrigatórios, e-mail válido, senha mínima de 8, confirmação)
 * - Persistência simples em localStorage (usuarios[]) com verificação de duplicidade
 * - Mensagens de erro/sucesso
 * - Callback opcional onSuccess para navegar/fechar modal após cadastro
 *
 * Como usar:
 * <CadastroUsuarios onSuccess={() => navigate('/login')} />
 */

// Tipagem para formulário
interface FormData {
    usuario: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

interface StatusMessage {
    type: "" | "erro" | "sucesso";
    message: string;
}

interface Props {
    onSuccess?: () => void;
}

export default function CadastroUsuarios({ onSuccess }: Props) {
    // constraints
    const LIMITS = useMemo(
        () => ({ usuario: 50, email: 100, senha: 20, confirmarSenha: 20 }),
        []
    );

    // state
    const [form, setForm] = useState<FormData>({
        usuario: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });
    const [show, setShow] = useState<{ senha: boolean; confirmarSenha: boolean }>({ senha: false, confirmarSenha: false });
    const [status, setStatus] = useState<StatusMessage>({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // helpers
    const validarEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const updateField = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const max = LIMITS[field];
        setForm((f) => ({ ...f, [field]: value.slice(0, max) }));
        if (status.type) setStatus({ type: "", message: "" });
    };

    const toggle = (field: keyof typeof show) => () =>
        setShow((s) => ({ ...s, [field]: !s[field] }));

    const remaining = (field: keyof FormData) => `${form[field].length}/${LIMITS[field]}`;

    const exibirMensagem = (message: string, type: "erro" | "sucesso") => setStatus({ type, message });

    const reset = () => {
        setForm({ usuario: "", email: "", senha: "", confirmarSenha: "" });
        setShow({ senha: false, confirmarSenha: false });
    };

    // validações
    const validate = (): string | null => {
        if (!form.usuario || !form.email || !form.senha || !form.confirmarSenha)
            return "Preencha todos os campos!";
        if (!validarEmail(form.email)) return "Digite um e-mail válido!";
        if (form.senha.length < 8)
            return "Senha deve ter pelo menos 8 caracteres!";
        if (form.senha !== form.confirmarSenha) return "As senhas não conferem!";
        return null;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const erro = validate();
        if (erro) {
            exibirMensagem(erro, "erro");
            return;
        }

        setIsSubmitting(true);
        try {
            const usuarios: FormData[] = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const jaExiste = usuarios.some(
                (u) => u.usuario === form.usuario || u.email === form.email
            );
            if (jaExiste) {
                exibirMensagem("Já existe um usuário com esse nome ou e-mail.", "erro");
                setIsSubmitting(false);
                return;
            }

            usuarios.push({ usuario: form.usuario, email: form.email, senha: form.senha, confirmarSenha: "" });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            exibirMensagem("Cadastro realizado com sucesso!", "sucesso");
            reset();

            // Permite que a aplicação pai navegue, feche modal etc.
            setTimeout(() => {
                if (typeof onSuccess === "function") onSuccess();
            }, 800);
        } catch (err) {
            console.error(err);
            exibirMensagem("Erro ao salvar os dados.", "erro");
        } finally {
            setIsSubmitting(false);
        }
    };

    // A11y: desloca foco para a mensagem quando houver erro/sucesso
    const statusRef = React.useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (status.type && statusRef.current) statusRef.current.focus();
    }, [status]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 text-slate-900">
                <h1 className="text-2xl font-bold text-violet-700 mb-1">
                    Crie sua conta no Nexus 🪙
                </h1>
                <p className="mb-4 text-slate-600">Gerencie suas finanças com facilidade.</p>

                {status.message ? (
                    <div
                        ref={statusRef}
                        tabIndex={-1}
                        className={
                            "mb-4 rounded-md px-4 py-3 text-sm font-medium " +
                            (status.type === "erro"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800")
                        }
                        role="alert"
                        aria-live="assertive"
                    >
                        {status.message}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} noValidate>
                    {/* Usuário */}
                    <label htmlFor="usuario" className="block text-sm font-semibold text-indigo-600">
                        Usuário
                    </label>
                    <input
                        id="usuario"
                        type="text"
                        value={form.usuario}
                        onChange={updateField("usuario")}
                        placeholder="Digite seu nome de usuário"
                        required
                        maxLength={LIMITS.usuario}
                        className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 outline-none focus:ring-4 focus:ring-indigo-300"
                    />
                    <small className="block text-right text-xs text-slate-500 mb-3">
                        {remaining("usuario")}
                    </small>

                    {/* Email */}
                    <label htmlFor="email" className="block text-sm font-semibold text-indigo-600">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={updateField("email")}
                        placeholder="Digite seu e-mail"
                        required
                        maxLength={LIMITS.email}
                        className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 outline-none focus:ring-4 focus:ring-indigo-300"
                    />
                    <small className="block text-right text-xs text-slate-500 mb-3">
                        {remaining("email")}
                    </small>

                    {/* Senha */}
                    <label htmlFor="senha" className="block text-sm font-semibold text-indigo-600">
                        Senha
                    </label>
                    <div className="relative">
                        <input
                            id="senha"
                            type={show.senha ? "text" : "password"}
                            value={form.senha}
                            onChange={updateField("senha")}
                            placeholder="Crie uma senha"
                            required
                            maxLength={LIMITS.senha}
                            className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 pr-10 outline-none focus:ring-4 focus:ring-indigo-300"
                        />
                        <button
                            type="button"
                            onClick={toggle("senha")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 select-none text-xl"
                            aria-label={show.senha ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {show.senha ? "👁️" : "🙈"}
                        </button>
                    </div>
                    <small className="block text-right text-xs text-slate-500 mb-3">
                        {remaining("senha")}
                    </small>

                    {/* Confirmar Senha */}
                    <label htmlFor="confirmar-senha" className="block text-sm font-semibold text-indigo-600">
                        Confirmar Senha
                    </label>
                    <div className="relative">
                        <input
                            id="confirmar-senha"
                            type={show.confirmarSenha ? "text" : "password"}
                            value={form.confirmarSenha}
                            onChange={updateField("confirmarSenha")}
                            placeholder="Confirme sua senha"
                            required
                            maxLength={LIMITS.confirmarSenha}
                            className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 pr-10 outline-none focus:ring-4 focus:ring-indigo-300"
                        />
                        <button
                            type="button"
                            onClick={toggle("confirmarSenha")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 select-none text-xl"
                            aria-label={show.confirmarSenha ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {show.confirmarSenha ? "👁️" : "🙈"}
                        </button>
                    </div>
                    <small className="block text-right text-xs text-slate-500 mb-5">
                        {remaining("confirmarSenha")}
                    </small>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white text-base font-bold hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60"
                    >
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </button>

                    <p className="mt-4 text-center text-sm text-slate-600">
                        Já tem uma conta? <a href="/login" className="font-semibold text-indigo-600">Faça login</a>
                    </p>
                </form>

                {/* Dica de integração com API */}
                <details className="mt-6 text-sm text-slate-600">
                    <summary className="cursor-pointer font-semibold">Como integrar com API (Java/Spring, Node, etc.)</summary>
                    <div className="mt-2 space-y-2">
                        <p>
                            Substitua o bloco de <code>localStorage</code> por um <code>fetch</code> para sua API.
                        </p>
                        <pre className="whitespace-pre-wrap rounded-lg bg-slate-100 p-3 text-xs">
                            {`const dto = { usuario: form.usuario, email: form.email, senha: form.senha };
const resp = await fetch('http://localhost:8080/usuarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dto)
});
if (!resp.ok) throw new Error(await resp.text() || 'Erro ao cadastrar');`}
                        </pre>
                    </div>
                </details>
            </div>
        </div>
    );
}
