export const prerender = false;
import nodemailer from 'nodemailer';

// Poner estos datos en .env
const correo = import.meta.env.CORREO; // Correo de la cuenta que se va a usar para enviar los correos
const contrasena = import.meta.env.CONTRASENA; // Contraseña de la cuenta que se va a usar para enviar los correos
const tipoCorreo = import.meta.env.TIPOCORREO; // Gmail, Outlook, etc.


export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('query');

    const people = formData.get('people');
    const date = formData.get('date');
    const type = formData.get('type');

    


    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: tipoCorreo, 
      auth: {
        user: correo, 
        pass: contrasena,  
      },
    });

    var mailOptions = {};

    switch (type) {
      case 'reserva':
        var mailContent = `El cliente ${name} (Email: ${email})(Teléfono: ${phone}) ha solicitado reservar mesa para ${people} personas en la fecha ${date}`
        if (message) {
          mailContent = mailContent + ` con el siguiente mensaje:\n\n${message}`;
        }
        
        mailOptions = {
          from: email,
          to: correo, // Your email address or the address where the email will be sent
          subject: 'Reserva',
          text: mailContent,
        };
        break;
    
      case 'contacto':
        mailOptions = {
          from: email,
          to: correo, // Your email address or the address where the email will be sent
          subject: 'Formulario de contacto',
          text: `Mensaje de: ${name} (Email: ${email})(Teléfono: ${phone})\n\n${message}`,
        };
        break;
    }


    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return new Response('Email sent successfully!', { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response('Failed to send email.', { status: 500 });
  }
}