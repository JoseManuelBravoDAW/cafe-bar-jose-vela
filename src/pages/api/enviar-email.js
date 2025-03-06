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

    console.log('Form Data:', { name, phone, email, message });

    if (!name || !phone || !email || !message) {
      console.error('Missing form data');
      return new Response('Missing form data', { status: 400 });
    }

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: tipoCorreo, 
      auth: {
        user: correo, 
        pass: contrasena,  
      },
    });

    // Set email options
    const mailOptions = {
      from: email,
      to: correo, // Your email address or the address where the email will be sent
      subject: 'Formulario de contacto',
      text: `Mensaje de: ${name} (Email: ${email})(Teléfono: ${phone})\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return new Response('Email sent successfully!', { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response('Failed to send email.', { status: 500 });
  }
}