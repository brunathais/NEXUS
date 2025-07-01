import { verificarEmail, verificarSenhasIguais, verificarTamanhoSenha, camposNaoVazios } from "./validacoes";

export function validarCadastro({ usuario, email, senha, confirmarSenha }) {

    if (!verificarEmail(email)) {
        return "email invalido";
    }

    if (!verificarTamanhoSenha(senha)) {
        return "senha deve ter no min 6 caracteres";
    }

    if (senha !== confirmarSenha) {
        return "senhas diferentes";
    }
    if (!camposNaoVazios([usuario, email, senha, confirmarSenha])) {
        return "preencha tds os campos";
    }

    return null;
}

export function validarLogin({ usuario, senha }) {
    if (!camposNaoVazios([usuario, senha])) {
        return "preencha tds os campos";
    }
    if (!verificarTamanhoSenha(senha)) {
        return "senha muito curta";
    }
    return null;
}
