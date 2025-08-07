import { Request, Response } from 'express';
import { User } from '../models/User';

export const registerUser = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatorios!' });
    }

    const newUser: User = {
        id: Date.now(),
        name,
        email,
        password, // ⚠️ em produção, nunca salve senhas assim! // In a real application, ensure to hash the password before saving 
    };

    console.log('Usuário registrado:', newUser); // Log the registered user
    return res.status(201).json(newUser);
};