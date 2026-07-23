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
