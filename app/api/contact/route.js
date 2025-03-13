import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Thank you! Your message has been sent.'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email send error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send message. Please try again later.'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}