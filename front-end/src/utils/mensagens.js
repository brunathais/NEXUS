export function mostrarErro(msg){
alert(`❌ Erro: ${msg}`); //o que significa $
}

export function mostrarSucesso(msg){
    alert(`✅ Sucesso: ${msg}`)
}

export function mostrarMensagem(tipo, texto, tempo = 4000) {
  const div = document.getElementById("mensagem");
  div.className = `mensagem ${tipo}`; //oq faz o $
  div.textContent = texto;
  div.style.display = "block";

  setTimeout(() => limparMensagem(), tempo);
}

export function limparMensagem(){
    const div = document.getElementById("mensagem");
    div.style.display = "none";
    div.textContent = "";
    div.className = "mensagem";
}