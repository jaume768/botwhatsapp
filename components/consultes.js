const connection = require("./BDD.js")

connection.connect();

async function informacionPersona(persona) {
    const sql = 'select * FROM Personas INNER JOIN Personas_info ON Personas.id = Personas_info.id_persona INNER JOIN informacion ON Personas_info.id_info = informacion.id WHERE Personas.nombre = "' + persona + '";';
  
    const [results, fields] = await connection.promise().query(sql);
  
    connection.end();
  
    return results;
}

async function personasGuardadas() {
    const sql = 'select Personas.nombre FROM Personas;';
  
    const [results, fields] = await connection.promise().query(sql);
  
    connection.end();
  
    return results;
}

async function todosLosRecordatorios() {
    const sql = 'select titulo, descripcion, fecha, hora FROM Recordatorio;';
  
    const [results, fields] = await connection.promise().query(sql);
  
    connection.end();
  
    return results;
}

async function insertaPersona(nombre, edad,telefono,gmail,ciudad,direccion){

    const sql = `INSERT INTO Personas (nombre, edad,telefono,gmail,ciudad,direccion) VALUES (?,?,?,?,?,?)`;
    const [results] = await connection.promise().execute(sql, [nombre,edad,telefono,gmail,ciudad,direccion]);

    connection.end();
}

async function insertarInfromacion(nombre,informacion){

    const sql = `INSERT INTO informacion (informacion) values(?)`
    const id_persona = `select Personas_info.id_persona from Personas,Personas_info,informacion where Personas.id = Personas_info.id_persona and Personas_info.id_info = informacion.id and Personas.nombre = "?";`
    const id_info = `select informacion.id from informacion order by informacion.id Desc limit 1;`
    const insertInfo_Persona = `insert into Personas_info values (?,?)`

    const [results] = await connection.promise().execute(sql, [informacion]);
    const idPersona = await connection.promise().query(id_persona, [nombre]);

    let persona;
    if (idPersona[0][0].id_persona == undefined || idPersona[0][0].id_persona == null){
        persona = idPersona[0].id_persona
    } else {
        persona = idPersona[0][0].id_persona
    }
    const [idInfo] = await connection.promise().query(id_info);
    const [insertInfoPersona] = await connection.promise().execute(insertInfo_Persona, [persona,idInfo[0].id]);

    connection.end();

}

module.exports = {informacionPersona,personasGuardadas,todosLosRecordatorios,insertaPersona,insertarInfromacion};