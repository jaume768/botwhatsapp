
const {sendMessage,saberSiInsertarPersona,palabrasFrases,
    saberSiInsertarInformacionPersona,saberSiDarInformaciónPersona,
    saberSiActualizarInfo} = require("./components/normales.js")

const {personasGuardadas,todosLosRecordatorios,
        insertaPersona,insertarInfromacion,informacion_persona,
        actualizarInfoEspecifica} = require("./components/consultes.js")
const {PORT} = require('./config.js')

const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

let plantilla = 'Consultar el nombre de las personas guardadas: "Personas guardadas"' +  
                '\n \n Consultar todos los recordatorios: "Dime todos los recordatorios"' +  
                '\n \n Insertar persona: "Insertar persona (*nombre de la persona*),(*edad*),(*telefono*),(*gmail*),(*ciudad*),(*direccion*)"' + 
                '\n \n Insertar información de una persona: "Insertar informacion de (*nombre de la persona, tiene que estar insertada primero*)"' + 
                '\n \n Saber la información de una persona: "Dame toda la información de ,(*Nombre de la persona*)"' +
                '\n \n Actualizar dato en concreto de una persona: "Actualizar ,(*Persona*),(*Dato*),(*información*)"';

app.post("/webhook",function(req,res){
    if(req.body.Body == "hola"){
        sendMessage(req.body.WaId,"Hola señor, soy tu Bot, pídeme lo que quieras!! \nTengo una plantilla para ayudarte si lo necesitas (*Plantilla*)")
    }
    if(req.body.Body == "Personas guardadas"){
        let mensaje;
        (async () => {
            let resultados = "";
            resultados = await personasGuardadas()
            for(let i = 0; i < resultados.length; i++){
                mensaje += resultados[i].nombre + "\n"
            }
            sendMessage(req.body.WaId,mensaje.substring(9,mensaje.length))
        })();
    }
    if(req.body.Body == "Plantilla"){
        sendMessage(req.body.WaId, plantilla)
    }
    if(req.body.Body == "Dime todos los recordatorios"){
        (async () => {
            let resultados = "";
            let mensaje = "";
            resultados = await todosLosRecordatorios()
            mensaje += "------------------------ \n"
            for(let i = 0; i < resultados.length; i++){
                mensaje += "Recordatorio " + (i+1) + "\n";
                mensaje += resultados[i].titulo + "\n"
                mensaje += resultados[i].descripcion + "\n"
                mensaje += resultados[i].fecha + "\n"
                mensaje += resultados[i].hora + "\n"
                mensaje += "------------------------ \n"
            }
        
            sendMessage(req.body.WaId,mensaje)
            
        })();
    }
    if(saberSiInsertarPersona(req.body.Body)){
        insertaPersona(palabrasFrases(1,req.body.Body),palabrasFrases(2,req.body.Body),palabrasFrases(3,req.body.Body),palabrasFrases(4,req.body.Body),palabrasFrases(5,req.body.Body),palabrasFrases(6,req.body.Body))
        sendMessage(req.body.WaId,"La persona " + palabrasFrases(1,sql) + " ya está insertada!!")
    }
    if(saberSiInsertarInformacionPersona(req.body.Body)){
        insertarInfromacion(palabrasFrases(1,req.body.Body),palabrasFrases(6,req.body.Body),req.body.WaId)
    }
    if(saberSiDarInformaciónPersona(req.body.Body)){
        informacion_persona(req.body.WaId,palabrasFrases(6,req.body.Body))
    }
    if(saberSiActualizarInfo(req.body.Body)){
        actualizarInfoEspecifica(palabrasFrases(1,req.body.Body),palabrasFrases(6,req.body.Body))
        sendMessage(req.body.WaId,"Información actualizada") 
    }
})

app.listen(PORT,() => {
    console.log("el servidor esta en el puerto " + PORT)
});