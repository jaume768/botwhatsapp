const {sendMessage,saberBuscaInfoPersona,extraerPersona,saberSiInsertarPersona,palabrasFrases} = require("./components/normales.js")
const {informacionPersona,personasGuardadas,todosLosRecordatorios,insertaInformacionPersona} = require("./components/consultes.js")
const {PORT} = require('./config.js')

const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

let plantilla = 'Consultar información persona: "Dame la información de (*nombre de la persona*)" \n Consultar el nombre de las personas guardadas: "Personas guardadas" \n Consultar todos los recordatorios: "Dime todos los recordatorios" \n Insertar persona: "Insertar persona (*nombre de la persona*),(*edad*),(*telefono*),(*gmail*),(*ciudad*),(*direccion*)"';


let frase = "Insertar persona pepito,12,683472110,prova@gmail.com,Manacor,mallorca"
insertaInformacionPersona(palabrasFrases(1,frase),palabrasFrases(2,frase),palabrasFrases(3,frase),palabrasFrases(4,frase),palabrasFrases(5,frase),palabrasFrases(6,frase))

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
        console.log("insertar")
    }
})

app.listen(PORT,() => {
    console.log("el servidor esta en el puerto 3000")
});