const nodemailer = require('nodemailer');
exports.recuperarContrasena= async (data) =>
{
    const configurarCorreo= {
        from: process.env.APP_CORREO,
        to: data.correo,
        subject: "Recuperacion de contrasena",
        text: 'Contrasena temporal :' + data.contrasena_encriptada,

    };


const transporte = nodemailer.createTransport({
    host: process.env.CORREO_SERVICIO,
    port: process.env.CORREO_PORT,
    secure: true,
    auth:
    {
      user: process.env.APP_CORREO,
      pass: process.env.CORREO_CONTRASENA,

    },
});

transporte.verify(function(error, success)
{
    if(error){
        console.log(error);
        return false;
    } else{
        console.log("El servidor puede enviar mensajes");
    }
});

return await transporte.sendMail(configurarCorreo);

};