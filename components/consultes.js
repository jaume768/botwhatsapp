const connection = require("./BDD.js")

connection.connect();

async function informacionPersona(persona) {
    connection.connect();

    const sql = 'select * FROM Personas INNER JOIN Personas_info ON Personas.id = Personas_info.id_persona INNER JOIN informacion ON Personas_info.id_info = informacion.id WHERE Personas.nombre = "' + persona + '";';
  
    const [results, fields] = await connection.promise().query(sql);
  
    connection.end();
  
    return results;
}

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

async function insertarInfromacion(nombre,informacion){

    connection.connect();

    const sql = `INSERT INTO informacion (informacion) values(?)`
    const id_persona = `select Personas.id from Personas where Personas.nombre = ?;`
    const id_info = `select informacion.id from informacion order by informacion.id Desc limit 1;`
    const insertInfo_Persona = `insert into Personas_info values (?,?)`

    "const [results] = await connection.promise().execute(sql, [informacion]);"
    const [idPersona] = await connection.promise().query(id_persona, [nombre]);
    console.log(idPersona[0].id)

    "const [idInfo] = await connection.promise().query(id_info);"
    "const [insertInfoPersona] = await connection.promise().execute(insertInfo_Persona, [idPersona[0].id,idInfo[0].id]);"



    connection.end();

}

module.exports = {informacionPersona,personasGuardadas,todosLosRecordatorios,insertaPersona,insertarInfromacion};