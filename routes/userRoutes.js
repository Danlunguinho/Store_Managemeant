const router = require('express').Router()
const User = require('../models/user') 
const bcrypt = require('bcrypt')
const passport = require('passport')
const {eAdmin} = require('../helpers/eAdmin')

//Rota para renderizar o form 'login'
router.get('/', (req, res) => { res.render('login') })

//Rota para renderizar o form 'cad' para adicionar um novo usuario
router.get('/new', eAdmin, (req, res) => { res.render('cad') })

//Rota para criar o registro de user
router.post('/cad', eAdmin, async(req, res) => {
    var erros = []

    if(req.body.senha.length < 4){
        erros.push({texto: "A Senha deve conter mais de 4 caracteres"})
    }

    if(erros.length > 0){

        res.render('cad', {erros: erros})
    }else{

        //Validação do nome de usuário
        User.findOne({usuario: req.body.usuario}).lean().then((usuario) => {
            if(usuario){

                req.flash('error_msg', 'Nome de usuário ja existe, tente um diferente')
                res.redirect('/user/new')
            }else{

                //Constante que armazena o novo usuario que foi criado
                const newUser = new User({
                    usuario: req.body.usuario,
                    senha: req.body.senha
                })

                //Tornar a senha em hash
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash('error_msg', 'Ocorreu um erro ao salvar o usuário')
                            res.redirect('/user/new')
                        }

                        newUser.senha = hash 
                        newUser.save().then(() => {

                            req.flash('success_msg', 'Usuário criado com sucesso!')
                            res.redirect('/home')
                        }).catch((err) => {

                            req.flash('error_msg', 'não foi possível registrar o usuário')
                            res.redirect('/user/new')
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Ocorreu um erro no sistema')
            res.redirect('/home')
        })
    }
})

//Rota para realizar o login e a autenticação do user
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/user',
        failureFlash: true
    })(req, res, next)

})

//Rota para realizar o logout na aplicação
router.get('/logout', (req, res, next) => {
    
    req.logout(function(err) {
        if (err) { return next(err) }
        req.flash('success_msg', 'Sessão encerrada, para voltar, conecte-se novamente')
        res.redirect('/')
    })
})

//Exportar a rota person
module.exports = router