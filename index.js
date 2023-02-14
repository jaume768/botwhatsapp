const {sendMessage,saberBuscaInfoPersona,extraerPersona,
    saberSiInsertarPersona,palabrasFrases,saberSiInsertarInformacionPersona,saberSiDarInformaciónPersona} = require("./components/normales.js")
const {informacionPersona,personasGuardadas,todosLosRecordatorios,insertaPersona,insertarInfromacion,informacion_persona} = require("./components/consultes.js")
const {PORT} = require('./config.js')

const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

let plantilla = 'Consultar información persona: "Dame la información de (*nombre de la persona*)"' + 
                '\n \n Consultar el nombre de las personas guardadas: "Personas guardadas"' +  
                '\n \n Consultar todos los recordatorios: "Dime todos los recordatorios"' +  
                '\n \n Insertar persona: "Insertar persona (*nombre de la persona*),(*edad*),(*telefono*),(*gmail*),(*ciudad*),(*direccion*)"' + 
                '\n \n Insertar información de una persona: "Insertar informacion de (*nombre de la persona, tiene que estar insertada primero*)"' + 
                '\n \n Saber la información de una persona: "Dame toda la información de ,(*Nombre de la persona*)"';

app.post("/webhook",function(req,res){
    if(saberBuscaInfoPersona(req.body.Body)){
        (async () => {
            let persona = extraerPersona(req.body.Body)
            let resultados = "";
            let funciona = true;
            try {
                resultados = await informacionPersona(persona);
            } catch (err) {
                console.log(err);
                funciona = false;
            }
            
            if(funciona){
                sendMessage(req.body.WaId,resultados[0].informacion)
            } else {
                sendMessage(req.body.WaId,"no se encuentra la persona")
            }
            
        })();
    }
    if(req.body.Body == "hola"){
        sendMessage(req.body.WaId,req.body.Body)
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
        let sql = req.body.Body
        console.log(palabrasFrases(1,sql))
        insertaPersona(palabrasFrases(1,sql),palabrasFrases(2,sql),palabrasFrases(3,sql),palabrasFrases(4,sql),palabrasFrases(5,sql),palabrasFrases(6,sql))
        sendMessage(req.body.WaId,"La persona " + palabrasFrases(1,sql) + " ya está insertada!!")
    }
    if(saberSiInsertarInformacionPersona(req.body.Body)){
        insertarInfromacion(palabrasFrases(1,req.body.Body),palabrasFrases(6,req.body.Body),req.body.WaId)
    }
    if(saberSiDarInformaciónPersona(req.body.Body)){
        
        informacionPersona(req.body.WaId,palabrasFrases(6,req.body.Body))
    }

})

app.listen(PORT,() => {
    console.log("el servidor esta en el puerto " + PORT)
});