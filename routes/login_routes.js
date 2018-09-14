module.exports = function(pool){
    function home_route(req, res){
        try {
            res.render('login')

        } catch (error) {
            
        }
        }
    
    return{
        home_route
    }
}