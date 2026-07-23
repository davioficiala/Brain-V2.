

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


// =================================================
// PARTE 3
// =================================================


// =================================================
// ATUALIZAR PREÇO NA TELA
// =================================================

function atualizarPreco(){

    if(

        BrainTrader.candles.length===0

    ){

        return;

    }

    const ultimo=

    BrainTrader.candles[0];


    if(precoAtual){

        precoAtual.innerHTML=

        "R$ "+

        Number(

            ultimo.close

        ).toFixed(2);

    }


    if(ativoNome){

        ativoNome.innerHTML=

        BrainTrader.ativo;

    }

}


// =================================================
// ATUALIZAR STATUS DO MERCADO
// =================================================

function atualizarStatusMercado(){

    if(!mercadoStatus){

        return;

    }


    if(

        BrainTrader.online

    ){

        mercadoStatus.innerHTML=

        "🟢 ONLINE";

    }

    else{

        mercadoStatus.innerHTML=

        "🔴 OFFLINE";

    }

}


// =================================================
// ATUALIZAR MENSAGEM DA IA
// =================================================

function atualizarBrain(){

    if(

        !brainMensagem

    ){

        return;

    }


    if(

        BrainTrader.candles.length<2

    ){

        brainMensagem.innerHTML=

        "Aguardando mercado...";

        return;

    }


    const atual=

    Number(

        BrainTrader.candles[0].close

    );


    const anterior=

    Number(

        BrainTrader.candles[1].close

    );


    if(

        atual>anterior

    ){

        brainMensagem.innerHTML=

        "📈 Tendência de Alta";

    }

    else if(

        atual<anterior

    ){

        brainMensagem.innerHTML=

        "📉 Tendência de Baixa";

    }

    else{

        brainMensagem.innerHTML=

        "➡ Mercado Lateral";

    }

}


// =================================================
// LOOP PRINCIPAL
// =================================================

function atualizarSistema(){

    atualizarCandles();

    atualizarPreco();

    atualizarStatusMercado();

    atualizarBrain();

    desenharCandles();

}


// =================================================
// EXECUÇÃO AUTOMÁTICA
// =================================================

setInterval(

    atualizarSistema,

    1000

);

atualizarSistema();


// =================================================
// FIM PARTE 3
// =================================================


// =================================================
// PARTE 4
// =================================================


// =================================================
// CALCULAR RSI
// =================================================

function calcularRSI(

    periodo=14

){

    if(

        BrainTrader.candles.length<=periodo

    ){

        return 50;

    }


    let ganhos=0;

    let perdas=0;


    for(

        let i=1;

        i<=periodo;

        i++

    ){

        const atual=

        Number(

            BrainTrader.candles[i-1].close

        );

        const anterior=

        Number(

            BrainTrader.candles[i].close

        );


        const diferenca=

        atual-

        anterior;


        if(

            diferenca>=0

        ){

            ganhos+=

            diferenca;

        }

        else{

            perdas+=

            Math.abs(

                diferenca

            );

        }

    }


    if(

        perdas===0

    ){

        return 100;

    }


    const rs=

    ganhos/

    perdas;


    return

    100-

    (

        100/

        (

            1+

            rs

        )

    );

}


// =================================================
// ATUALIZAR RSI
// =================================================

function atualizarRSI(){

    const rsi=

    calcularRSI();


    if(

        rsiValor

    ){

        rsiValor.innerHTML=

        rsi.toFixed(2);

    }


    const valor=

    document.getElementById(

        "ind-rsi"

    );

    if(valor){

        valor.innerHTML=

        rsi.toFixed(2);

    }


    const status=

    document.getElementById(

        "rsi-status"

    );

    if(status){

        if(rsi>=70){

            status.innerHTML=

            "Sobrecomprado";

        }

        else if(rsi<=30){

            status.innerHTML=

            "Sobrevendido";

        }

        else{

            status.innerHTML=

            "Neutro";

        }

    }

}


// =================================================
// ATUALIZAR VOLUME
// =================================================

function atualizarVolume(){

    if(

        BrainTrader.candles.length===0

    ){

        return;

    }


    const volume=

    Number(

        BrainTrader.candles[0].volume||0

    );


    if(

        volumeValor

    ){

        volumeValor.innerHTML=

        volume.toLocaleString(

            "pt-BR"

        );

    }


    const card=

    document.getElementById(

        "ind-volume"

    );

    if(card){

        card.innerHTML=

        volume.toLocaleString(

            "pt-BR"

        );

    }

}


// =================================================
// ATUALIZAR TODOS INDICADORES
// =================================================

function atualizarIndicadores(){

    atualizarRSI();

    atualizarVolume();

}


// =================================================
// LIGAR INDICADORES AO SISTEMA
// =================================================

const atualizarSistemaOriginal=

atualizarSistema;


atualizarSistema=function(){

    atualizarSistemaOriginal();

    atualizarIndicadores();

};


// =================================================
// FIM PARTE 4
// =================================================

// =================================================
// PARTE 5
// =================================================


// =================================================
// CALCULAR MÉDIA MÓVEL
// =================================================

function calcularMediaMovel(periodo){

    if(

        BrainTrader.candles.length<periodo

    ){

        return [];

    }

    const medias=[];

    for(

        let i=0;

        i<=BrainTrader.candles.length-periodo;

        i++

    ){

        let soma=0;

        for(

            let j=0;

            j<periodo;

            j++

        ){

            soma+=Number(

                BrainTrader.candles[i+j].close

            );

        }

        medias.push(

            soma/periodo

        );

    }

    return medias;

}


// =================================================
// DESENHAR MÉDIA MÓVEL
// =================================================

function desenharMediaMovel(

    periodo,

    cor

){

    const media=

    calcularMediaMovel(

        periodo

    );

    if(

        media.length===0

    ){

        return;

    }

    const escala=

    calcularEscala();

    const largura=

    canvas.width/

    BrainTrader.candles.length;

    ctx.beginPath();

    ctx.strokeStyle=cor;

    ctx.lineWidth=2;

    media.reverse().forEach(

        (

            valor,

            indice

        )=>{

            const x=

            indice*

            largura+

            largura/2;

            const y=

            precoParaY(

                valor,

                escala

            );

            if(indice===0){

                ctx.moveTo(

                    x,

                    y

                );

            }else{

                ctx.lineTo(

                    x,

                    y

                );

            }

        }

    );

    ctx.stroke();

}


// =================================================
// CALCULAR MACD
// =================================================

function calcularMACD(){

    if(

        BrainTrader.candles.length<26

    ){

        return 0;

    }

    const ma12=

    calcularMediaMovel(

        12

    )[0];

    const ma26=

    calcularMediaMovel(

        26

    )[0];

    return(

        ma12-

        ma26

    );

}


// =================================================
// ATUALIZAR MACD
// =================================================

function atualizarMACD(){

    const macd=

    calcularMACD();

    if(

        macdValor

    ){

        macdValor.innerHTML=

        macd.toFixed(

            4

        );

    }

}


// =================================================
// DESENHAR INDICADORES
// =================================================

function desenharIndicadores(){

    desenharMediaMovel(

        9,

        "#FFD700"

    );

    desenharMediaMovel(

        21,

        "#00BFFF"

    );

    atualizarMACD();

}


// =================================================
// LIGAR INDICADORES AO GRÁFICO
// =================================================

const desenharCandlesOriginal=

desenharCandles;

desenharCandles=function(){

    desenharCandlesOriginal();

    desenharIndicadores();

};


// =================================================
// FIM PARTE 5
// =================================================



// =================================================
// PARTE 6
// =================================================


// =================================================
// CALCULAR BANDAS DE BOLLINGER
// =================================================

function calcularBollinger(periodo = 20){

    if(BrainTrader.candles.length < periodo){

        return null;

    }

    const precos = [];

    for(let i=0;i<periodo;i++){

        precos.push(

            Number(

                BrainTrader.candles[i].close

            )

        );

    }

    const media =

    precos.reduce(

        (a,b)=>a+b,

        0

    ) / periodo;


    let soma = 0;

    precos.forEach(

        valor=>{

            soma += Math.pow(

                valor-media,

                2

            );

        }

    );

    const desvio =

    Math.sqrt(

        soma / periodo

    );


    return{

        superior:

        media+(desvio*2),

        media,

        inferior:

        media-(desvio*2)

    };

}


// =================================================
// ATUALIZAR BOLLINGER
// =================================================

function atualizarBollinger(){

    const bb =

    calcularBollinger();

    if(!bb){

        return;

    }

    const valor =

    document.getElementById(

        "ind-bb"

    );

    if(valor){

        valor.innerHTML =

        bb.media.toFixed(2);

    }

    const status =

    document.getElementById(

        "bb-status"

    );

    if(status){

        status.innerHTML =

        "Bandas Ativas";

    }

}


// =================================================
// ATR (PROVISÓRIO)
// =================================================

function atualizarATR(){

    if(!atrValor){

        return;

    }

    atrValor.innerHTML =

    "--";

}


// =================================================
// ADX (PROVISÓRIO)
// =================================================

function atualizarADX(){

    if(!adxValor){

        return;

    }

    adxValor.innerHTML =

    "--";

}


// =================================================
// VWAP (PROVISÓRIO)
// =================================================

function atualizarVWAP(){

    if(!vwapValor){

        return;

    }

    vwapValor.innerHTML =

    "--";

}


// =================================================
// ATUALIZAR TODOS
// =================================================

const atualizarIndicadoresOriginal =

atualizarIndicadores;

atualizarIndicadores = function(){

    atualizarIndicadoresOriginal();

    atualizarMACD();

    atualizarBollinger();

    atualizarATR();

    atualizarADX();

    atualizarVWAP();

};


// =================================================
// FIM PARTE 6
// =================================================

// =================================================
// PARTE 7
// =================================================


// =================================================
// CALCULAR SINAL DA IA
// =================================================

function analisarBrainIA(){

    if(

        BrainTrader.candles.length < 30

    ){

        return;

    }


    const ultimo =

    Number(

        BrainTrader.candles[0].close

    );


    const ma9 =

    calcularMediaMovel(9)[0];


    const ma21 =

    calcularMediaMovel(21)[0];


    const rsi =

    calcularRSI();


    let score = 0;


    if(

        ultimo > ma9

    ){

        score += 20;

    }

    else{

        score -= 20;

    }


    if(

        ma9 > ma21

    ){

        score += 20;

    }

    else{

        score -= 20;

    }


    if(

        rsi > 55 &&

        rsi < 70

    ){

        score += 20;

    }


    if(

        rsi < 45 &&

        rsi > 30

    ){

        score -= 20;

    }


    let sinal =

    "AGUARDAR";


    if(

        score >= 40

    ){

        sinal =

        "COMPRA";

    }


    if(

        score <= -40

    ){

        sinal =

        "VENDA";

    }


    BrainTrader.estrategia = {

        score,

        sinal,

        preco: ultimo,

        horario: new Date()

    };

}


// =================================================
// ATUALIZAR PAINEL IA
// =================================================

function atualizarPainelIA(){

    if(

        !BrainTrader.estrategia.sinal

    ){

        return;

    }


    const painel =

    document.getElementById(

        "sinalIA"

    );


    if(

        painel

    ){

        painel.innerHTML =

        BrainTrader.estrategia.sinal;

    }


    const forca =

    document.getElementById(

        "forcaIA"

    );


    if(

        forca

    ){

        forca.innerHTML =

        BrainTrader.estrategia.score;

    }

}


// =================================================
// EXECUTAR IA
// =================================================

const atualizarSistemaIA =

atualizarSistema;


atualizarSistema = function(){

    atualizarSistemaIA();

    analisarBrainIA();

    atualizarPainelIA();

};


// =================================================
// FIM PARTE 7
// =================================================



