import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/users/register", form);
            console.log("User registered:", response.data);
            alert("Usuario cadastrado com sucesso!");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Erro ao cadastrar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Usuario</h2>
            <input type="text" name="name" placeholder="Nome" value={form.name} onChange={handleChange}/>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="Senha" value={form.password} onChange={handleChange}/>
            <button type="submit">Cadastrar</button>
            </form>
    );
};

export default Register;
