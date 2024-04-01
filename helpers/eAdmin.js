module.exports = {
   eAdmin: function(req, res, next){

        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash('error_msg', 'Por favor realize o login')
        res.redirect('/')
        }
   
   }
}