import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log('SMTP not configured, skipping email send to: ', options.email);
      console.log('Email Subject:', options.subject);
      console.log('Email Message:', options.message);
      return true;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    const message = {
      from: `${process.env.FROM_NAME || 'AutoMate'} <${process.env.SMTP_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default sendEmail;
