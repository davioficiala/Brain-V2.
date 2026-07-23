

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
    
// =================================================
// PARTE 2
// =================================================


// =================================================
// RECEBER DADOS DA API
// =================================================

function atualizarCandles(){

    if(!window.candlesReais){

        return;

    }

    BrainTrader.candles =

    window.candlesReais;

    BrainTrader.online = true;

}


// =================================================
// CALCULAR MAIOR E MENOR PREÇO
// =================================================

function calcularEscala(){

    if(

        BrainTrader.candles.length===0

    ){

        return null;

    }


    const maior = Math.max(

        ...BrainTrader.candles.map(

            candle => Number(

                candle.high

            )

        )

    );


    const menor = Math.min(

        ...BrainTrader.candles.map(

            candle => Number(

                candle.low

            )

        )

    );


    return{

        maior,

        menor

    };

}


// =================================================
// CONVERTER PREÇO EM PIXEL
// =================================================

function precoParaY(

    preco,

    escala

){

    return

    canvas.height-

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
// DESENHAR CANDLES
// =================================================

function desenharCandles(){

    if(

        BrainTrader.candles.length===0

    ){

        return;

    }


    desenharFundo();

    desenharGrade();


    const escala=

    calcularEscala();


    const candles=

    [...BrainTrader.candles]

    .reverse();


    const largura=

    canvas.width/

    candles.length;


    candles.forEach(

        (

            candle,

            indice

        )=>{

            const open=

            Number(candle.open);

            const high=

            Number(candle.high);

            const low=

            Number(candle.low);

            const close=

            Number(candle.close);


            const x=

            indice*

            largura+

            largura/2;


            const yOpen=

            precoParaY(

                open,

                escala

            );

            const yClose=

            precoParaY(

                close,

                escala

            );

            const yHigh=

            precoParaY(

                high,

                escala

            );

            const yLow=

            precoParaY(

                low,

                escala

            );


            ctx.strokeStyle="#ffffff";

            ctx.beginPath();

            ctx.moveTo(

                x,

                yHigh

            );

            ctx.lineTo(

                x,

                yLow

            );

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
// FIM PARTE 2
// =================================================




