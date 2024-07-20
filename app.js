const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes');

//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://Zatjat:test@classtutorial.eh3gze7.mongodb.net/node_tutorial?retryWrites=true&w=majority&appName=classtutorial'
mongoose.connect(dbURI/*, { useNewUrlParser: true, useUnifiedTopology: true} use if depricated warning*/)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
/* app.set('views', 'ViewsFolder') */ //This is for using a views folder that doesn't go by the name of views

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//mongoose and mango sandbox routes
    /*app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 7',
        snippet: 'about the new blog',
        body: 'write here'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6692e819c9a73c9b976a0835')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})*/

app.get('/', (req, res) => {
    /*const blogs = [
        {title: 'Kratos offs Hades', snippet: 'In his fit of rage against the gods, Kratos decided to punish them for their selfishness'},
        {title: 'Doom Slayer is back for more', snippet: 'Doom Slayer is once again out for blood as he traps himself in Hell once again'},
        {title: 'Dante & Vergil have teamed up', snippet: 'After Vergil recovered from his previous wounds, he and Dante have decided to stop demons from entering the land of humans'},
    ]
    //res.send('<p>Homeless page</p>');
    res.render('index', { title: 'Home', blogs});*/
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>About the homeless page</p>');
    res.render('about', { title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
});
