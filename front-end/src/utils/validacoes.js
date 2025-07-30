export function obterValorCampo(id){
    return document.getElementById(id).value.trim();
}

export function camposNaoVazios(campos) {
    return campos.every(campo => campo && campo.trim() !== "");
}

export function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validarSenha(senha) {
    return senha.length >= 6;
}
