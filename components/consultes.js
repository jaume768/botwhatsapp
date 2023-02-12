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

async function insertaInformacionPersona(nombre, edad,telefono,gmail,ciudad,direccion){

    const sql = `INSERT INTO Personas (nombre, edad,telefono,gmail,ciudad,direccion) VALUES (?,?,?,?,?,?)`;
    const [results] = await connection.promise().execute(sql, [nombre,edad,telefono,gmail,ciudad,direccion]);

    connection.end();
}

module.exports = {informacionPersona,personasGuardadas,todosLosRecordatorios,insertaInformacionPersona};