
// =================================================
// BRAIN WALKER IA
// SCRIPT PRINCIPAL
// =================================================


console.log("script.js carregado");


// =================================================
// PEGAR CANVAS DO GRÁFICO
// =================================================

const canvas = document.getElementById("graficoPrincipal");

const ctx = canvas ? canvas.getContext("2d") : null;


if(ctx){

    console.log("Canvas gráfico conectado");

}
