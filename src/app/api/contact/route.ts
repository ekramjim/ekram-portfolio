import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use app-specific password for Gmail
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    const emailSubject = subject?.trim() || "New contact form message";

    const recipients = [
      process.env.EMAIL_RECIPIENT_1,
      process.env.EMAIL_RECIPIENT_2,
      "ekramjim002@gmail.com",
    ].filter(Boolean);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(", "),
      replyTo: email,
      subject: emailSubject,
      text: `
Name: ${name}
Email: ${email}
Subject: ${emailSubject}
Message: ${message}
      `,
      html: `
<h3>New Contact Form Message</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${emailSubject}</p>
<p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
