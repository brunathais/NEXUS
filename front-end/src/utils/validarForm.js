import { validarEmail, validarSenha, camposNaoVazios } from "./validacoes.js";

export function validarCadastro({ usuario, email, senha, confirmarSenha }) {
    if (!camposNaoVazios([usuario, email, senha, confirmarSenha])) {
        return "Preencha todos os campos!";
    }
    if (!validarEmail(email)) {
        return "Digite um email válido!";
    }
    if (!validarSenha(senha)) {
        return "Senha deve ter ao menos 6 caracteres!";
    }
    if (senha !== confirmarSenha) {
        return "As senhas não conferem!";
    }
    return null;
}

export function validarLogin({ usuario, senha }) {
    if (!camposNaoVazios([usuario, senha])) {
        return "Preencha todos os campos!";
    }
    if (!validarEmail(usuario)) {
        return "Digite um usuario válido!";
    }
    if (!validarSenha(senha)) {
        return "Senha deve ter ao menos 6 caracteres!";
    }
    return null;
}
