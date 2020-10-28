const nodemailer = require('nodemailer');

module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'proyecto2.archivos2020@gmail.com', // Cambialo por tu email
 pass: 'JRamos2015017' // Cambialo por tu password
 }
 });
 const mailOptions = {
    from: 'proyecto2.archivos2020@gmail.com',
    to: formulario.mail, // Cambia esta parte por el destinatario
    subject: formulario.mensaje,
    html: `
    <strong>Nombre:</strong> ${formulario.nombre} <br/>
    <strong>E-mail:</strong> ${formulario.mail} <br/>
    <strong>Mensaje:</strong> ${formulario.mensaje}
    
    <br>
    Para confirmar su acceso dirijase al siguiente link
    <strong>http://localhost:3000/confirmar/${formulario.idusuario}</strong>
    
    
    
    `
};
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}