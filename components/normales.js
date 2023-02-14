const twilio = require('twilio');

const accountSid = 'AC4d911107beb2d5969523ac989e8ce8bf'; // Your Account SID from www.twilio.com/console
const authToken = '5f5c630187a3528b124e5e04913ae655'; // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);

function sendMessage(sender, message) {
    client.messages
    .create({
        body: message,
        to: 'whatsapp:+' + sender, // Text this number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
    })
  .then((message) => console.log(message.sid));

}

function saberBuscaInfoPersona(mensaje){
  if(mensaje.length >= 23 && mensaje.substring(0,23) == "Dame la información de "){
    return true;
  }

  return false;
}

function extraerPersona(mensaje){

  let plantilla = "Dame la información de "
  if(mensaje.length >= 23 && mensaje.substring(0,23) == "Dame la información de "){
    let persona = (mensaje.substring(23,mensaje.length))
    return persona;
  }

}

function saberSiInsertarPersona(mensaje){
  if(mensaje.substring(0,17) == "Insertar persona "){
    return true;
  }
  return false;
}

function palabrasFrases(numPalabra,frase){
  let palabra = ""
  let contadorComa = 0;
  if(numPalabra > 0 && numPalabra < 6){
    for (let i = 0; i < frase.length; i++) {
      if(frase.charAt(i) == ",")
        contadorComa = contadorComa + 1
      if(contadorComa == numPalabra){
        let coma = i
        for(let j = coma-1; j > 0; j--){
          if(numPalabra === 1 && frase.charAt(j) == " " || numPalabra > 1 && numPalabra < 6 && frase.charAt(j) == ","){
            return palabra.split("").reverse().join("");
          }
          palabra += frase.charAt(j)
        }
      }  
    }
  }
  if(numPalabra === 6){
    for(let i = frase.length; i > 0; i--){
      if(frase.charAt(i) == ","){
        return palabra.split("").reverse().join("");
      }
      palabra += frase.charAt(i)
    }
  }
}

function saberSiInsertarInformacionPersona(mensaje){
  if(mensaje.substring(0,24) == "Insertar información de "){
    return true;
  }
  return false;
}


module.exports = {sendMessage,saberBuscaInfoPersona,extraerPersona,saberSiInsertarPersona,palabrasFrases,saberSiInsertarInformacionPersona};