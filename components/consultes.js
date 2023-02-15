const connection = require("./BDD.js")
const {sendMessage} = require("./normales.js")

connection.connect();

async function personasGuardadas() {
    connection.connect();

    const sql = 'select Personas.nombre FROM Personas;';
  
    const [results, fields] = await connection.promise().query(sql);
  
    connection.end();
  
    return results;
}

async function todosLosRecordatorios() {

    connection.connect();

    const sql = 'select titulo, descripcion, fecha, hora FROM Recordatorio;';
  
    const [results, fields] = await connection.promise().query(sql);
  
    connection.end();
  
    return results;
}

async function insertaPersona(nombre, edad,telefono,gmail,ciudad,direccion){

    connection.connect();

    const sql = `INSERT INTO Personas (nombre, edad,telefono,gmail,ciudad,direccion) VALUES (?,?,?,?,?,?)`;
    const [results] = await connection.promise().execute(sql, [nombre,edad,telefono,gmail,ciudad,direccion]);

    connection.end();
}

async function insertarInfromacion(nombre,informacion,persona){

    console.log(nombre)
    try {
        const sql = `INSERT INTO informacion (informacion) values(?)`
        const id_persona = `select Personas.id from Personas where Personas.nombre = ?;`
        const id_info = `select informacion.id from informacion order by informacion.id Desc limit 1;`
        const insertInfo_Persona = `insert into Personas_info values (?,?)`

        const [results] = await connection.promise().execute(sql, [informacion]);
        const [idPersona] = await connection.promise().query(id_persona, [nombre]);
        console.log(idPersona[0].id)

        const [idInfo] = await connection.promise().query(id_info);
        const [insertInfoPersona] = await connection.promise().execute(insertInfo_Persona, [idPersona[0].id,idInfo[0].id]);

        sendMessage(persona,"información insertada")

    } catch (error) {
        console.log("tiene un error")
        sendMessage(persona,"información insertada")
    }

    return;
    

}

async function informacion_persona(persona,nombre) {

    try{
        const sql = `select * from Personas,Personas_info,informacion where Personas.id = Personas_info.id_persona and Personas_info.id_info = informacion.id and Personas.nombre = ?;`
        const [results] = await connection.promise().query(sql,[nombre]);
        let contador = (results.length)-1
        let mensaje = "Nombre: " + results[contador].nombre + "\n" 
                        + "Edad: " + results[contador].edad + "\n" 
                        + "Telefono: " + results[contador].telefono + "\n"
                        + "Gmail: " + results[contador].gmail + "\n" 
                        + "Ciudad: " + results[contador].ciudad + "\n"
                        + "Direccion: " + results[contador].direccion + "\n"    
                        + "Información interesante: "   
        for(let i = 0; i < results.length; i++) {
            mensaje += results[i].informacion + ","
        } 
        "sendMessage(persona,mensaje)  "                     
    } catch (error) {
        console.log("tienes un error: " + error.message)
    }

}

module.exports = {personasGuardadas,todosLosRecordatorios,
                insertaPersona,insertarInfromacion,informacion_persona};