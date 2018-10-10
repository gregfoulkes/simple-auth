module.exports = function() {

    function login (req, res) {
        const loginUsername = req.query.username;
        if (loginUsername && !req.session.username) {
            req.session.username = loginUsername;
        }

        res.redirect('/');
    }

    function home (req, res) {
        let greeting = 'Hello';
        if (req.session.username) {
            greeting += (", " + req.session.username)
        }
        res.send(greeting);
    }

    function logout (req, res) {
        delete req.session.user;
        res.redirect('/');
    }

    return {
        login,
        home,
        logout
    }
}