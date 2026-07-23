
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



// =================================================
// BRAIN WALKER IA V2
// SCRIPT PRINCIPAL
// PARTE 2
// =================================================


// =================================================
// INÍCIO - ATUALIZAR DADOS DA API
// =================================================

function atualizarDadosMercado(){

    if(!window.candlesReais){

        return;

    }

    BrainTrader.candles = window.candlesReais;

    BrainTrader.online = true;

}

// =================================================
// FIM - ATUALIZAR DADOS DA API
// =================================================



// =================================================
// INÍCIO - CALCULAR MAIOR E MENOR PREÇO
// =================================================

function calcularEscala(){

    if(BrainTrader.candles.length===0){

        return null;

    }

    const maior=Math.max(

        ...BrainTrader.candles.map(

            candle=>Number(candle.high)

        )

    );



    const menor=Math.min(

        ...BrainTrader.candles.map(

            candle=>Number(candle.low)

        )

    );



    return{

        maior,

        menor

    };

}

// =================================================
// FIM - CALCULAR MAIOR E MENOR PREÇO
// =================================================



// =================================================
// INÍCIO - CONVERTER PREÇO PARA PIXEL
// =================================================

function precoParaY(preco,escala){

    return canvas.height-

    (

        (

            preco-

            escala.menor

        )

        /

        (

            escala.maior-

            escala.menor

        )

    )

    *

    canvas.height;

}

// =================================================
// FIM - CONVERTER PREÇO PARA PIXEL
// =================================================



// =================================================
// INÍCIO - DESENHAR CANDLES
// =================================================

function desenharCandles(){

    if(BrainTrader.candles.length===0){

        return;

    }

    desenharFundo();

    desenharGrade();


    const escala=calcularEscala();

    const candles=[...BrainTrader.candles].reverse();

    const largura=

    canvas.width/

    candles.length;


    candles.forEach(

        (candle,index)=>{

            const x=

            index*

            largura+

            largura/2;


            const open=

            Number(candle.open);

            const close=

            Number(candle.close);

            const high=

            Number(candle.high);

            const low=

            Number(candle.low);


            const yOpen=

            precoParaY(open,escala);

            const yClose=

            precoParaY(close,escala);

            const yHigh=

            precoParaY(high,escala);

            const yLow=

            precoParaY(low,escala);


            ctx.strokeStyle="#ffffff";

            ctx.beginPath();

            ctx.moveTo(x,yHigh);

            ctx.lineTo(x,yLow);

            ctx.stroke();


            ctx.fillStyle=

            close>=open

            ?

            "#00ff66"

            :

            "#ff3333";


            ctx.fillRect(

                x-4,

                Math.min(

                    yOpen,

                    yClose

                ),

                8,

                Math.abs(

                    yClose-

                    yOpen

                )||1

            );

        }

    );

}

// =================================================
// FIM - DESENHAR CANDLES
// =================================================






