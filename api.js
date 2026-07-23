

// =================================================
// BRAIN WALKER IA
// API MERCADO REAL - PETR4
// =================================================

const API_KEY = "f2c71f3ac827461787c0cf240d6b9314";

const ATIVO = "PETR4";
const INTERVALO = "1min";

const API_URL = "https://api.twelvedata.com/time_series";


async function buscarCandles(){

    try {

        const url = `${API_URL}?symbol=${ATIVO}&interval=${INTERVALO}&apikey=${API_KEY}`;

        const resposta = await fetch(url);

    const dados = await resposta.json();

alert(JSON.stringify(dados, null, 2));


        console.log("Candles recebidos:", dados);


        if(dados.values){

            const ultimo = dados.values[0];


            // Atualiza preço no HTML
            const preco = document.getElementById("precoAtual");

            if(preco){

                preco.innerHTML = "R$ " + ultimo.close;

            }


            const nome = document.getElementById("ativoNome");

            if(nome){

                nome.innerHTML = "Petrobras (PETR4)";

            }


        }


    } catch(erro){

        console.log("Erro API:", erro);

    }

}


// chama a API
buscarCandles();


// atualiza a cada 1 minuto
setInterval(buscarCandles,60000);

// =================================================
// VARIÁVEIS DE DADOS
// =================================================

let dadosCandles = [];

let precoMercado = 0;


// =================================================
// BUSCAR DADOS DO MERCADO
// =================================================

async function buscarMercadoReal(){

    try {

        const resposta = await fetch(
            `${API_URL}?symbol=${ativoAtual}&interval=${intervalo}&apikey=${API_KEY}`
        );


        const dados = await resposta.json();


        console.log("Dados recebidos:", dados);


        return dados;


    } catch(error){

        console.log(
            "Erro ao buscar mercado:",
            error
        );

    }

}


// =================================================
// FIM DA PARTE 1
// =================================================

// =================================================
// BRAIN WALKER IA
// TRATAMENTO DOS DADOS RECEBIDOS
// PARTE 2
// =================================================


// =================================================
// PROCESSAR RESPOSTA DA API
// =================================================

function processarDadosMercado(dados){


    if(!dados){

        console.log(
            "Nenhum dado recebido"
        );

        return;

    }



    // =============================================
    // PEGAR PREÇO ATUAL
    // =============================================

    if(dados.price){

        precoMercado = Number(
            dados.price
        );

    }



    // =============================================
    // PEGAR CANDLES
    // =============================================

    if(dados.values){


        dadosCandles = dados.values;


    }



    console.log(
        "Preço atual:",
        precoMercado
    );


    console.log(
        "Candles:",
        dadosCandles
    );


    return {

        preco: precoMercado,

        candles: dadosCandles

    };


}




// =================================================
// ATUALIZAR PREÇO NO HTML
// =================================================

function atualizarPrecoTela(){


    const elementoPreco =
    document.getElementById(
        "precoAtual"
    );


    if(elementoPreco){


        elementoPreco.innerHTML =
        precoMercado.toFixed(2);


    }


}



// =================================================
// ATUALIZAR ATIVO NA TELA
// =================================================

function atualizarNomeAtivo(){


    const elementoAtivo =
    document.getElementById(
        "ativoNome"
    );


    if(elementoAtivo){


        elementoAtivo.innerHTML =
        ativoAtual;


    }


}



// =================================================
// FIM DA PARTE 2
// =================================================

// =================================================
// BRAIN WALKER IA
// ATUALIZAÇÃO AUTOMÁTICA DO MERCADO
// PARTE 3
// =================================================


// =================================================
// INICIAR BUSCA DE DADOS
// =================================================

async function iniciarMercado(){


    const dados =
    await buscarMercadoReal();


    const mercado =
    processarDadosMercado(
        dados
    );


    if(mercado){


        atualizarPrecoTela();


        atualizarNomeAtivo();


        // Envia candles para o gráfico
        if(
            typeof atualizarGrafico === "function"
        ){

            atualizarGrafico(
                mercado.candles
            );

        }


        // Envia dados para Brain IA
        if(
            typeof analisarMercado === "function"
        ){

            analisarMercado(
                mercado
            );

        }


    }


}



// =================================================
// ATUALIZAÇÃO EM TEMPO REAL
// =================================================

// Atualiza a cada 5 segundos

setInterval(

    iniciarMercado,

    5000

);




// =================================================
// TROCAR ATIVO
// =================================================

function trocarAtivo(novoAtivo){


    ativoAtual =
    novoAtivo;


    atualizarNomeAtivo();


    iniciarMercado();


}



// =================================================
// BOTÃO PESQUISAR ATIVO
// =================================================

const botaoBuscar =
document.getElementById(
    "btnBuscar"
);



if(botaoBuscar){


    botaoBuscar.onclick = function(){


        const campo =
        document.getElementById(
            "buscarAtivo"
        );


        if(campo.value){


            trocarAtivo(
                campo.value.toUpperCase()
            );


        }


    };


}



// =================================================
// FIM DA PARTE 3
// =================================================

// =================================================
// BRAIN WALKER IA
// PREPARAÇÃO PARA WEBSOCKET / TEMPO REAL
// PARTE 4
// =================================================


// =================================================
// CONEXÃO EM TEMPO REAL
// =================================================

// Quando a corretora/provedor liberar WebSocket,
// esta função receberá os preços instantâneos.


let conexaoTempoReal = null;



function conectarTempoReal(){


    /*
    
    COLOQUE AQUI O LINK WEBSOCKET
    DA CORRETORA OU PROVEDOR


    Exemplo:

    conexaoTempoReal =
    new WebSocket(
        "URL_WEBSOCKET_AQUI"
    );


    */


    console.log(
        "Aguardando conexão WebSocket real..."
    );


}



// =================================================
// RECEBER PREÇO EM TEMPO REAL
// =================================================

function receberTempoReal(dado){


    if(!dado){

        return;

    }



    if(dado.preco){


        precoMercado =
        Number(
            dado.preco
        );


        atualizarPrecoTela();


    }



}



// =================================================
// ATUALIZAR VARIAÇÃO
// =================================================

function atualizarVariacao(valor){


    const campo =
    document.getElementById(
        "variacao"
    );


    if(campo){


        campo.innerHTML =
        valor + "%";


    }


}



// =================================================
// STATUS DA API
// =================================================

function atualizarStatusAPI(status){


    const mensagem =
    document.querySelector(
        ".status-api"
    );


    if(mensagem){


        mensagem.innerHTML =
        status;


    }


}



// =================================================
// INICIAR API
// =================================================

function iniciarAPI(){


    atualizarNomeAtivo();


    iniciarMercado();


    // Futuramente:
    // conectarTempoReal();



}



// =================================================
// FIM DA PARTE 4
// =================================================

// =================================================
// BRAIN WALKER IA
// VALIDAÇÃO DOS DADOS DA API
// PARTE 5
// =================================================


// =================================================
// FORMATAR PREÇO
// =================================================

function formatarPreco(valor){


    if(!valor){

        return "--";

    }


    return Number(valor)
    .toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );


}



// =================================================
// FORMATAR CANDLE
// =================================================

function organizarCandle(candle){


    return {


        abertura:
        Number(candle.open),


        maxima:
        Number(candle.high),


        minima:
        Number(candle.low),


        fechamento:
        Number(candle.close),


        volume:
        Number(candle.volume),


        horario:
        candle.datetime


    };


}




// =================================================
// ORGANIZAR TODOS OS CANDLES
// =================================================

function organizarCandles(lista){


    if(!Array.isArray(lista)){


        return [];


    }



    return lista.map(

        candle => organizarCandle(candle)

    );


}



// =================================================
// PREPARAR DADOS PARA O GRÁFICO
// =================================================

function prepararGrafico(dados){


    const candles =
    organizarCandles(
        dados
    );


    dadosCandles =
    candles;


    return candles;


}



// =================================================
// FIM DA PARTE 5
// =================================================


// =================================================
// BRAIN WALKER IA
// CONTROLE DE ERROS E STATUS
// PARTE 6
// =================================================


// =================================================
// MOSTRAR ERRO DA API
// =================================================

function mostrarErroAPI(mensagem){


    console.log(
        "API ERRO:",
        mensagem
    );


    const status =
    document.getElementById(
        "mercadoStatus"
    );


    if(status){


        status.innerHTML =
        mensagem;


    }


}



// =================================================
// MOSTRAR MERCADO ONLINE
// =================================================

function mercadoOnline(){


    const status =
    document.getElementById(
        "mercadoStatus"
    );


    if(status){


        status.innerHTML =
        "Mercado conectado em tempo real";


    }


}



// =================================================
// TESTAR CONEXÃO API
// =================================================

async function testarAPI(){


    try{


        const dados =
        await buscarMercadoReal();



        if(dados){


            mercadoOnline();



            console.log(
                "API funcionando",
                dados
            );


        }



    }
    catch(error){


        mostrarErroAPI(
            "Falha na conexão"
        );


    }


}



// =================================================
// INICIALIZAÇÃO AUTOMÁTICA
// =================================================

window.addEventListener(
    "load",
    ()=>{


        iniciarAPI();


    }
);



// =================================================
// FIM DA PARTE 6
// =================================================
