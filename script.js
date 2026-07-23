
// =================================================
// BRAIN WALKER IA V2
// SCRIPT PRINCIPAL
// PARTE 1
// =================================================


// =================================================
// INÍCIO - CONFIGURAÇÕES GERAIS
// =================================================

"use strict";

const BrainTrader = {};

BrainTrader.nome = "Brain Walker IA";

BrainTrader.versao = "2.0";

BrainTrader.ativo = "PETR4";

BrainTrader.timeframe = "1min";

BrainTrader.candles = [];

BrainTrader.indicadores = {};

BrainTrader.estrategia = {};

BrainTrader.online = false;

// =================================================
// FIM - CONFIGURAÇÕES GERAIS
// =================================================



// =================================================
// INÍCIO - PEGAR ELEMENTOS HTML
// =================================================

const canvas = document.getElementById("graficoPrincipal");

const ctx = canvas.getContext("2d");

const precoAtual = document.getElementById("precoAtual");

const ativoNome = document.getElementById("ativoNome");

const mercadoStatus = document.getElementById("mercadoStatus");

const brainMensagem = document.getElementById("brainMensagem");

const rsiValor = document.getElementById("rsiValor");

const macdValor = document.getElementById("macdValor");

const volumeValor = document.getElementById("volumeValor");

const atrValor = document.getElementById("atrValor");

const adxValor = document.getElementById("adxValor");

const vwapValor = document.getElementById("vwapValor");

// =================================================
// FIM - PEGAR ELEMENTOS HTML
// =================================================



// =================================================
// INÍCIO - TAMANHO DO CANVAS
// =================================================

function ajustarCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

}

window.addEventListener("resize", ajustarCanvas);

ajustarCanvas();

// =================================================
// FIM - TAMANHO DO CANVAS
// =================================================



// =================================================
// INÍCIO - LIMPAR CANVAS
// =================================================

function limparGrafico(){

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

// =================================================
// FIM - LIMPAR CANVAS
// =================================================



// =================================================
// INÍCIO - DESENHAR FUNDO
// =================================================

function desenharFundo(){

    limparGrafico();

    ctx.fillStyle="#0d1117";

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

// =================================================
// FIM - DESENHAR FUNDO
// =================================================



// =================================================
// INÍCIO - DESENHAR GRADE
// =================================================

function desenharGrade(){

    ctx.strokeStyle="#20242d";

    ctx.lineWidth=1;


    for(let y=0;y<canvas.height;y+=40){

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(canvas.width,y);

        ctx.stroke();

    }


    for(let x=0;x<canvas.width;x+=60){

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(x,canvas.height);

        ctx.stroke();

    }

}

// =================================================
// FIM - DESENHAR GRADE
// =================================================



// =================================================
// INÍCIO - INICIALIZAR
// =================================================

desenharFundo();

desenharGrade();

console.log("Brain Walker IA iniciado");

// =================================================
// FIM - INICIALIZAR
// =================================================
