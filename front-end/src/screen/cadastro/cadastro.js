/*
// reutilizando funções
// esta fazendo reload na tela e não direcionando

import { getValue, exibirMensagem, validarEmail, carregarLocalStorage, salvarLocalStorage } from './utils.js';

document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = getValue("usuario");
    const email = getValue("email");
    const senha = getValue("senha");
    const confirmarSenha = getValue("confirmar-senha");

    if (!usuario || !email || !senha || !confirmarSenha) {
        return exibirMensagem("Preencha todos os campos!", "erro");
    }
    if (!validarEmail(email)) {
        return exibirMensagem("Digite um email válido!", "erro");
    }
    if (senha.length < 8) {
        return exibirMensagem("Senha deve ter pelo menos 8 caracteres!", "erro");
    }
    if (senha !== confirmarSenha) {
        return exibirMensagem("As senhas não conferem!", "erro");
    }

    const usuarios = carregarLocalStorage("usuarios");

    if (usuarios.some(u => u.usuario === usuario || u.email === email)) {
        return exibirMensagem("Já existe um usuário com esse nome ou email.", "erro");
    }

    usuarios.push({ usuario, email, senha });
    salvarLocalStorage("usuarios", usuarios);

    exibirMensagem("Cadastro realizado com sucesso! Redirecionando...", "sucesso");

    setTimeout(() => {
        window.location.href = "../login/login.html";
    }, 2000);
});

    */
   
//funcional com localStorage
document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    function getById(id) {
        return document.getElementById(id).value.trim();
    }

    const usuario = getById("usuario");
    const email = getById("email");
    const senha = getById("senha");
    const confirmarSenha = getById("confirmar-senha");

    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; 

    if (!usuario || !email || !senha || !confirmarSenha) {
        exibirMensagem("Preencha todos os campos!", "erro");
        return;
    }
    if (!validarEmail(email)) {
        exibirMensagem("Digite um email válido!", "erro");
        return;
    }
    if (senha.length < 8) {
        exibirMensagem("Senha deve ter pelo menos 8 caracteres!", "erro");
        return;
    }
    if (senha !== confirmarSenha) {
        exibirMensagem("As senhas não conferem!", "erro");
        return;
    }

    // LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar duplicidade por usuario ou email
    const jaExiste = usuarios.some(u => u.usuario === usuario || u.email === email); //some?
    if (jaExiste) {
        exibirMensagem("Já existe um usuário com esse nome ou email.", "erro");
        return;
    }


    // Adiciona novo usuário
    usuarios.push({ usuario, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirMensagem("Cadastro realizado com sucesso! Redirecionando...", "sucesso");

    setTimeout(() => {
        window.location.href = "../login/login.html";
    }, 2000);
});

function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.className = "mensagem " + tipo;
    mensagemDiv.innerText = texto;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

