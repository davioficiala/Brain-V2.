

// =================================================
// PARTE 1
// =================================================

"use strict";

const BrainTrader = {

    nome: "Brain Walker IA",

    versao: "2.0",

    ativo: "PETR4",

    timeframe: "1min",

    online: false,

    candles: [],

    indicadores: {},

    estrategia: {},

    replay: [],

    historico: []

};


// =================================================
// PEGAR ELEMENTOS HTML
// =================================================

const canvas = document.getElementById("graficoPrincipal");

const ctx = canvas.getContext("2d");

const precoAtual = document.getElementById("precoAtual");

const ativoNome = document.getElementById("ativoNome");

const variacao = document.getElementById("variacao");

const mercadoStatus = document.getElementById("mercadoStatus");

const brainMensagem = document.getElementById("brainMensagem");

const rsiValor = document.getElementById("rsiValor");

const macdValor = document.getElementById("macdValor");

const volumeValor = document.getElementById("volumeValor");

const atrValor = document.getElementById("atrValor");

const adxValor = document.getElementById("adxValor");

const vwapValor = document.getElementById("vwapValor");


// =================================================
// AJUSTAR TAMANHO DO CANVAS
// =================================================

function ajustarCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

}

window.addEventListener(

    "resize",

    ajustarCanvas

);

ajustarCanvas();


// =================================================
// LIMPAR CANVAS
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
// DESENHAR FUNDO
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
// DESENHAR GRADE
// =================================================

function desenharGrade(){

    ctx.strokeStyle="#20242d";

    ctx.lineWidth=1;


    for(

        let y=0;

        y<canvas.height;

        y+=40

    ){

        ctx.beginPath();

        ctx.moveTo(

            0,

            y

        );

        ctx.lineTo(

            canvas.width,

            y

        );

        ctx.stroke();

    }


    for(

        let x=0;

        x<canvas.width;

        x+=60

    ){

        ctx.beginPath();

        ctx.moveTo(

            x,

            0

        );

        ctx.lineTo(

            x,

            canvas.height

        );

        ctx.stroke();

    }

}


// =================================================
// INICIAR CANVAS
// =================================================

desenharFundo();

desenharGrade();

console.log(

    "Brain Walker IA iniciado."

);

// =================================================
// FIM PARTE 1
// =================================================
    
