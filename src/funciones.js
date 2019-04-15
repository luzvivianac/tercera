const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'cursos';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

let collCursos;

const conectar = () =>{

    // Use connect method to connect to the Server
    client.connect(function(err) {
    //assert.equal(null, err);
    if(err) {
        return console.log("No se ha podido conectar.")
    }
    console.log("Conectados satisfactoriamente al servidor");

    const db = client.db(dbName);
    collCursos = db.collection('cursos');

    //OJO!!!
    //  client.close();
    });
}

//listaEstudiantes =[];
listaCursos =[];

//si
const crearCurso =(curso) => {
    //listar();

    //let duplicado = listaCursos.find(cursoB => cursoB.id == curso.id);
    let duplicado = findbyId(curso.id);
    console.log("RESULTADO duplicado: " + duplicado);
    if (!duplicado){
        listaCursos.push(curso);
        console.log(listaCursos);
        guardar(curso);
    }else{
        console.log('Ya existe otro curso con ese id.');
    }
}

//si
const findbyId = (p_id, resultado) =>{

  console.log("LLEGA al find: " + p_id);
  collCursos.findOne({id:p_id}, (err, resultado) => {
    if (err){
      console.log("ERROR consultando un elemento-");
      return resultado;
    }

    console.log("RESULTADO dentro del find: " + resultado);

    if (!resultado){
      console.log("No se encontró el curso.");
      return resultado;
    }
    console.log("El resultado dentro del findone: " + resultado);
    return resultado;
  });

  console.log("RESULTADO del findone: " + resultado);
  return resultado;

}



//si
const listar = () => {
    try{
        //listaCursos = require('./listadoCursos.json'); //opción 1

        collCursos.find({estado: "disponible"}).toArray((err, resultados) => {
            if (err){
                console.log("ERROR consultando TODOS los cursos.");
                return resultado;
              }
            //console.log("Estos son TODOS: " + JSON.stringify(resultados));
            console.log("Estos son TODOS: " + resultados);
            return resultados;
        });
        listaCursos =  resultados;
    
    } catch(error){
        listaCursos =[];
    }
    return listaCursos;
}

//si
const guardar =(curso) => {
/*
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listadoCursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado con éxito');
    })
*/
    collCursos.insertOne({
        id: curso.id,
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        valor: curso.valor,
        modalidad: curso.modalidad,
        intensidad: curso.intensidad,
        estado: curso.estado
      }, (err, result) => {
        if (err){
          return console.log("error agregando un curso.")
        }
        return console.log(result.ops)
      });

}






module.exports = {
    crearCurso,
    conectar,
    listar
}