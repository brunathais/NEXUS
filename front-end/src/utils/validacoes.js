export function obterValorCampo(id) {
    return document.getElementById(id).value.trim(); //o trim() tira espaços em branco do inicio e fim
} 

export function verificarEmail(email){
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email); //ver como funciona
}

export function verificarSenhasIguais(senha, confirmarSenha){
if (senha !== confirmarSenha) {
    alert("As senhas são diferentes!");
    return; //ver o que esta acontecendo
}
}

export function verificarTamanhoSenha(senha){
return senha.lenght >= 6;
}

export function camposNaoVazios(campos){
 return campos.every(campo => campo && campo.trim() !== "");
} //ver como melhorar