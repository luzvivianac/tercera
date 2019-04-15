const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const funciones = require('./funciones');
const port = process.env.PORT || 3000;

require('./helpers');


//se sale de src y se mete a public
const directoriopublico = path.join(__dirname, '../public')
const directoriopartials = path.join(__dirname, '../partials')

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));

console.log(__dirname);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('listar', {
        
    });
});

app.get('/crear', (req, res) => {
    res.render('crear', {
        
    });
});


app.post('/crear', (req, res) =>{
    console.log("Entra a crear del post");
    console.log(req.query);
    //http://localhost:3000/calculos?nombre=Ana&nota1=4&nota2=3&nota3=4
    
    let cursoNuevo = {
        id: parseInt(req.body.id),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: parseInt(req.body.valor),
        modalidad: req.body.modalidad,
        intensidad: parseInt(req.body.intensidad),
        estado: req.body.estado
    };
    console.log("info del curso para crear: " + cursoNuevo);
    funciones.crearCurso(cursoNuevo);

    console.log("Curso creado!");
    res.render('listar', {
        
    });
});

app.get('*', (req, res) =>{
    res.render('error', {
        estudiante: 'Error'
    });
});

app.listen(port, () => {
    console.log('Escuchando en el puerto ' + port);
    funciones.conectar();
});