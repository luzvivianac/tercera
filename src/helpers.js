const hbs = require('hbs');
const funciones = require('./funciones');


hbs.registerHelper('listar', ()=>{
    //listaCursos = require('./listadoCursos.json');
    listaCursos = funciones.listar();
    let texto = '<table> \
                <thead>  \
                <th> Id </th> \
                <th> Nombre </th> \
                <th> Descripción </th> \
                <th> Valor </th> \
                <th> Modalidad </th> \
                <th> Intensidad </th> \
                <th> Estado </th> \
                </thead>  \
                <tbody> ';

    listaCursos.forEach(curso => {
        texto = texto + 
            '<tr><td>' + curso.id + '</td>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.valor + '</td>' +
            '<td>' + curso.modalidad + '</td>' +
            '<td>' + curso.intensidad + '</td>' +
            '<td>'+ curso.estado + '</td></tr>';
    });
    texto = texto + '</tbody></table>';
    return texto;
})
