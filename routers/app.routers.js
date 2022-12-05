const express = require("express")
const productsRoutes = require("./products/products.router")
const router = express.Router();



// Middlewares
router.use("/products", productsRoutes)


// Routes
app.get('/', async (req, res) => {
    const user = await req.session.user;
    if (user) {
        return res.redirect("/profile")
    }
    else {
        return res.sendFile(__dirname + '/public/login.html');
    }
});

app.get('/profile', async (req, res) => {
    const user = await req.session.user;
    if (!user) { res.redirect('/'); }
    res.render('home.ejs', { sessionUser: user });
});

app.get('/register', async (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

/* app.post('/register', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.redirect('/error');
    req.session.user = email;
    req.session.password = password;
    req.session.save((err) => {
        if (err) {
            console.log("Session error => ", err);
            return res.redirect('/error');
        }
        res.redirect('/');
    });
}); */

app.post(
    '/register',
    passport.authenticate('signup', {
    failureRedirect: '/signup-error',
    successRedirect: '/profile'
    })
);

app.post(
    '/login',
    passport.authenticate('signin', {
    failureRedirect: '/signin-error',
    successRedirect: '/profile'
    })
);

app.get('/logout', async (req, res) => {
    const user = req.session?.user
    if (user) {
        req.session.destroy(err => {
            if (!err) {
                res.clearCookie('my-session');
                res.render("logout.ejs", { sessionUser: user })
                
            } else {
                res.clearCookie('my-session');
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});


module.exports = router;
