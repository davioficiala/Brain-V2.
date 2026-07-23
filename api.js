// =================================================
// BRAIN WALKER IA
// API DE MERCADO REAL
// PARTE 1
// =================================================


// =================================================
// CONFIGURAÇÃO DA API
// =================================================

// COLOQUE SUA CHAVE DA API AQUI
const API_KEY = "COLE_SUA_API_KEY_AQUI";


// =================================================
// CONFIGURAÇÃO DO ATIVO
// =================================================

let ativoAtual = "PETR4";

let intervalo = "1min";


// =================================================
// URL DA API
// COLE A URL DO PROVEDOR DE DADOS AQUI
// =================================================

const API_URL = "COLE_AQUI_URL_DA_API";


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
