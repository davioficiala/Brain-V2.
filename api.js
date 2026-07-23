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
