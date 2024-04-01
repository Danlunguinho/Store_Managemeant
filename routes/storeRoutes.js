const router = require('express').Router()
const Store = require('../models/store')
const {eAdmin} = require('../helpers/eAdmin')

//Rota que chama o arquivo handlebars responsavel pelo formulario da pagina.
router.get('/', eAdmin, async (req, res) => {

        res.render('new', { nomeUsuario: req.user.usuario});
})

//Rota para realizar a busca de uma loja pelo cnpj
router.get('/search', eAdmin, (req, res) => {

    if(!req.query.cnpj){
        req.flash('error_msg', 'O CNJP solicitado não está cadastrado')
        res.render('store')
    }
    else{
        const search = req.query.cnpj
        Store.findOne({cnpj: search}).lean().then((store) => {
            res.render('search', {search: store})
        }).catch((err) => {
            req.flash('error_msg', 'Não foi possivel achar a loja')
            res.render('store')
        })
    }
})

//Rota para realizar o filtro por tipo de cadastro
router.get('/filter', eAdmin, (req, res) => {
    
    Store.find({ cadastro: 'ASSOCIATIVISMO'}).lean().then((stores) => {
        res.render('filter', {filter: stores})
    })
    
})
router.get('/filter1', eAdmin, (req, res) => {

    Store.find({ cadastro: 'FRANQUIADO'}).lean().then((stores) =>{
        res.render('filter', {filter: stores})
    })

})
router.get('/filter2', eAdmin, (req, res) => {
    
    Store.find({ cadastro: 'INATIVO'}).lean().then((stores) =>{
        res.render('filter', {filter: stores})
    })
})
    
//Rota para criar outra loja com todos os atributos necessarios 
router.post('/', eAdmin, function(req, res) {

    var erros = []

    if(erros.length > 0){
        res.render('new', {erros: erros})
    }

    Store.create({
        razaoSocial: req.body.razaoSocial,
        nomeFantasia: req.body.nomeFantasia,
        cnpj: req.body.cnpj,
        inscEst: req.body.inscEst,
        endereco: req.body.endereco,
        numero: req.body.numero,
        uf: req.body.uf,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        cep: req.body.cep,
        cadastro: req.body.cadastro,
        consultor: req.body.consultor,
        socioAdministrador: req.body.socioAdministrador,
        telefone: req.body.telefone,
        telefone2: req.body.telefone2,
        telefone3: req.body.telefone3,
        cpf: req.body.cpf,
        email: req.body.email,
        nomeComprador: req.body.nomeComprador,
        contatoComprador: req.body.contatoComprador,
        emailComprador: req.body.emailComprador,
        nomeFinanceiro: req.body.nomeFinanceiro,
        contatoFinanceiro: req.body.contatoFinanceiro,
        emailFinanceiro: req.body.emailFinanceiro,
        recarga: req.body.recarga,
        qualEmpresa: req.body.qualEmpresa,
        layoutExterno: req.body.layoutExterno,
        autosserviço: req.body.autosserviço,
        fardamento: req.body.fardamento,
        entregaDomicilio: req.body.entregaDomicilio,
        operadoraCartao: req.body.operadoraCartao,
        qualOperadora: req.body.qualOperadora,
        sistemaOperacional: req.body.sistemaOperacional,
        qualSistema: req.body.qualSistema,
        atendimento24: req.body.atendimento24,
        banco: req.body.banco,
        agencia: req.body.agencia,
        numeroConta: req.body.numeroConta,
        favorecido: req.body.favorecido,
        cpf_cnpj: req.body.cpf_cnpj,
        taxaAdesao: req.body.taxaAdesao,
        mensalidade: req.body.mensalidade,
        obs: req.body.obs,
        dataCadastro: req.body.dataCadastro,
        nomeUsuario: req.body.nomeUsuario
        }).then(function(){
            req.flash('success_msg', 'Loja Cadastrada com Sucesso!')
            res.redirect('/home')
        }).catch(function(){
            req.flash('error_msg', 'Não foi possivel cadastrar a loja')
            res.redirect('/store')
        })
})

//Rota que vai chamar o fomulario para realizar a edição com todos os campos preencidos segundo o cadastro da Loja
router.get('/update/:id', eAdmin, (req, res) => {

    Store.findOne({_id:req.params.id}).lean().then((store) =>{
        res.render('edit', {update: store, nomeUsuario: req.user.usuario})
    }).catch((err)=>{
        req.flash('error_msg', 'Não foi possivel achar a loja')
        res.render('store')
    })
            
})

//Rota para enviar as alterações feitas no formulario de edição (Rota de Atualização)
router.post('/update', eAdmin, (req, res) => {
    
    var erros = []

    if(erros.length > 0){
        res.render('edit', {erros: erros})
    }
    
    Store.findOne({_id:req.body.id}).then((store) => {
        store.razaoSocial = req.body.razaoSocial,
        store.nomeFantasia = req.body.nomeFantasia,
        store.cnpj = req.body.cnpj,
        store.inscEst = req.body.inscEst,
        store.endereco = req.body.endereco,
        store.numero = req.body.numero,
        store.uf = req.body.uf,
        store.bairro = req.body.bairro,
        store.cidade = req.body.cidade,
        store.cep = req.body.cep,
        store.cadastro = req.body.cadastro,
        store.consultor = req.body.consultor,
        store.socioAdministrador = req.body.socioAdministrador,
        store.telefone = req.body.telefone,
        store.telefone2 = req.body.telefone2,
        store.telefone3 = req.body.telefone3,
        store.cpf = req.body.cpf,
        store.email = req.body.email,
        store.nomeComprador = req.body.nomeComprador,
        store.contatoComprador = req.body.contatoComprador,
        store.emailComprador = req.body.emailComprador,
        store.nomeFinanceiro = req.body.nomeFinanceiro,
        store.contatoFinanceiro = req.body.contatoFinanceiro,
        store.emailFinanceiro = req.body.emailFinanceiro,
        store.recarga = req.body.recarga,
        store.qualEmpresa = req.body.qualEmpresa,
        store.layoutExterno = req.body.layoutExterno,
        store.autosserviço = req.body.autosserviço,
        store.fardamento = req.body.fardamento,
        store.entregaDomicilio = req.body.entregaDomicilio,
        store.operadoraCartao = req.body.operadoraCartao,
        store.qualOperadora = req.body.qualOperadora,
        store.sistemaOperacional = req.body.sistemaOperacional,
        store.qualSistema = req.body.qualSistema,
        store.atendimento24 = req.body.atendimento24,
        store.banco = req.body.banco,
        store.agencia = req.body.agencia,
        store.numeroConta = req.body.numeroConta,
        store.favorecido = req.body.favorecido,
        store.cpf_cnpj = req.body.cpf_cnpj,
        store.taxaAdesao = req.body.taxaAdesao,
        store.mensalidade = req.body.mensalidade,
        store.obs = req.body.obs,
        store.dataAtualizacao = req.body.dataAtualizacao
        store.nomeUsuario = req.body.nomeUsuario
            store.save().then(()=>{
                req.flash('success_msg', 'Loja Atualizada com Sucesso!')
                res.redirect('/home')
            }).catch((err)=>{
                req.flash('error_msg', 'Ocorreu um erro ao atualizar a loja, tente novamente mais tarde')
                res.render('store')
            })

        }).catch((error)=>{
            res.json(error)
        })
})

//Rota para deletar um cadastro de loja
router.get('/delete/:id', eAdmin, async (req, res) => {
    Store.deleteOne({_id:req.params.id}).then(() => {
        req.flash('success_msg', 'A loja foi excluida do banco de dados')
        res.redirect('/home')
    }).catch((err)=>{
        req.flash('error_msg', 'Não foi possivel excluir a loja, tente novamente mais tarde')
        res.render('store')
    })
})

module.exports = router