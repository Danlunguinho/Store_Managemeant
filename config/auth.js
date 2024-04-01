const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Importando o Model User
const User = require('../models/user')

module.exports = function(passport){

    //Validação do usuario ao logar
    passport.use('local', new localStrategy({usernameField: 'usuario', passwordField: 'senha'}, ( usuario, senha, done) => {
        User.findOne({usuario: usuario}).then((usuario) => {
           //Checagem do nome
            if(!usuario){
                return done(null, false, {message: "Esse usuário não existe"})
            }
                //Checagem da senha
                bcrypt.compare(senha, usuario.senha, (erro, exist) => {
                    if(exist){

                        return done(null, usuario)
                    }else{

                        return done(null, false, {message: "Senha incorreta"})
                    }
                })
        })
    }))

    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id)
    })
    
    passport.deserializeUser((id,done)=>{
        User.findById(id).lean().then((usuario)=>{
            done(null,usuario)
        }).catch((err)=>{
             done (null,false,{message:'algo deu errado'})
        })
    })
}
