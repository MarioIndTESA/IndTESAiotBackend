import nodemailer from 'nodemailer';

const RegistroEmail= async(datos)=>{
  const {email,nombre,token}=datos;
  var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const info=await transport.sendMail({
        from:`"IndTESA IoT"`,
        to: email,
        subject:`Confirmación de cuenta`,
        text:"Comprueba tu cuenta en IndTESA IoT",
        html:`<h2>¡Bienvenido a IndTESA IoT ${nombre}!</h2>
        <p>Gracias por registrarte en IndTESA IoT, por favor, verifica tu direccion email en este enlace:</p>
        <br>
        <a href="${process.env.FRONTEND_URL}/Confirm/${token}">Comprobar cuenta</a>
        <p>Si tu no creaste esta cuenta, ignora este mensaje</p>
        `
    })
}

const ForgotPasswordEmail= async(datos)=>{
  const {email,nombre,token}=datos;
  var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const info=await transport.sendMail({
        from:`"IndTESA IoT"`,
        to: email,
        subject:`Reestablecer contraseña`,
        text:"Reestablece tu contraseña en IndTESA IoT",
        html:`<h2>Solicitaste un cambio de contraseña en IndTESA IoT ${nombre}</h2>
        <p>Sigue el siguiente enlace para crear una nueva contraseña </p>
        <br>
        <a href="${process.env.FRONTEND_URL}/forgot/${token}">Reestablecer contraseña</a>
        <p>Si tu no solicitaste este cambio, ignora este mensaje</p>
        `
    })
}


export {RegistroEmail,ForgotPasswordEmail}