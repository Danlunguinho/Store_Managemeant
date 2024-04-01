const mongoose = require('mongoose')

//Criação modelo para os registros 'user'
const User = mongoose.model('user', {

    usuario:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
})

//Exportar o acesso ao modelo do user
module.exports = User