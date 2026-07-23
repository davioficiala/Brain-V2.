
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



// =================================================
// AJUSTAR TAMANHO DO CANVAS
// =================================================

function ajustarCanvas() {

    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

}

window.addEventListener("resize", ajustarCanvas);

ajustarCanvas();


// =================================================
// DESENHAR FUNDO DO GRÁFICO
// =================================================

function desenharFundo() {

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#222";

    for (let y = 0; y < canvas.height; y += 40) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

    }

    for (let x = 0; x < canvas.width; x += 60) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

    }

}


// =================================================
// INICIAR GRÁFICO
// =================================================

desenharFundo();


// =================================================
// INÍCIO - DESENHAR CANDLES REAIS
// =================================================

function desenharCandles() {

    if (!ctx) return;

    if (!window.candlesReais) return;

    desenharFundo();

    const candles = window.candlesReais.slice().reverse();

    const largura = canvas.width;

    const altura = canvas.height;

    const larguraCandle = largura / candles.length;


    const maior = Math.max(...candles.map(c => Number(c.high)));

    const menor = Math.min(...candles.map(c => Number(c.low)));

    const escala = altura / (maior - menor);


    candles.forEach((candle, indice) => {

        const open = Number(candle.open);

        const high = Number(candle.high);

        const low = Number(candle.low);

        const close = Number(candle.close);


        const x = indice * larguraCandle + larguraCandle / 2;


        const yOpen = altura - ((open - menor) * escala);

        const yClose = altura - ((close - menor) * escala);

        const yHigh = altura - ((high - menor) * escala);

        const yLow = altura - ((low - menor) * escala);


        ctx.strokeStyle = "#ffffff";

        ctx.beginPath();

        ctx.moveTo(x, yHigh);

        ctx.lineTo(x, yLow);

        ctx.stroke();


        ctx.fillStyle = close >= open ? "#00ff66" : "#ff3333";


        ctx.fillRect(

            x - 4,

            Math.min(yOpen, yClose),

            8,

            Math.abs(yClose - yOpen) || 1

        );

    });

}

// =================================================
// FIM - DESENHAR CANDLES REAIS
// =================================================
