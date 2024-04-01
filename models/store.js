const mongoose = require('mongoose')

//Definição das variaveis e do banco de dados para as lojas
const Store = mongoose.model('store', {

    nomeLoja: String,
    cnpj: Number,
    cidade: String,
    endereco: String,
    numero: Number,
    uf: String,
    bairro: String,
    cep: Number,
    cadastro: [String],
    consultor: [String],
    gestor: String,
    telefone: String,
    cpf: Number,
    email: String,
    autosserviço: [String],
    fardamento: [String],
    entregaDomicilio: [String],
    operadoraCartao: [String],
    qualOperadora: String,
    atendimento24: [String],
    obs: String,
    dataCadastro: Date,
    dataAtualizacao: Date,
    nomeUsuario: String
})

//Exportar o acesso ao modelo da loja
module.exports = Store