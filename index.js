//Imports
const express = require('express')
const mongoose = require('mongoose')
require ('dotenv').config()
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Store = require('./models/store')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)
const {eAdmin} = require('./helpers/eAdmin')

//Template HTML para a pagina principal 
app.use(express.json())
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Config do body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Config session
app.use(session({
    secret: "projetoRM",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Config das mensagens flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})

//Config dos arquivos estaticos
app.use(express.static(path.join(__dirname,'public')))

//Rota inicial para fazer o login e ter acesso a aplicação 
app.get('/', (req, res) => {
    res.render('login')
})

//Rota da pagina principal onde vai mostrar a tabela com as lojas
app.get('/home', eAdmin, async(req, res) => {
    const stores = await Store.find({}).lean()
    res.render('Store', {store: stores})
})

//Acesso ao /store que permite usar as rotas store 
const storeRoutes = require('./routes/storeRoutes')
app.use('/store', storeRoutes)

//Acesso ao /person que premite usar as rotas person
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

//Conexão com banco de dados
const port = process.env.PORT || 3000

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cadastrodelojas.ue9gjmb.mongodb.net/`
    )
    .then(() => {

        console.log("Conectado!")
        app.listen(port)

    }) 
    .catch() 