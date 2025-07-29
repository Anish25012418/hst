"use server"
import {Resend} from "resend";
import ContactEmail from "@/helpers/components/email/ContactEmail.tsx";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

console.log(resend)

// export const sendEmail = async (data) => {
//   console.log(data);
//   await resend.emails.send({
//     from: data.email,
//     to: "anishdangi999@gmail.com",
//     subject: "Inquiry email",
//     react: ContactEmail({data})
//   })
// }

export const sendEmail = async (data: any) => {
  try {
    console.log('Sending email with data:', data);

    const result = await resend.emails.send({
      // Use a verified domain email as 'from' - cannot use user's email directly
      from: 'contacts@himalayansingletrack.com',
      to: ['anishdangi999@gmail.com'],
      subject: 'New Contact Form Inquiry',
      react: ContactEmail({ data }),
    });

    console.log('Email sent successfully:', result);
    return result;

  } catch (error: any) {
    console.error('Error sending email:', error);
    // Log the specific error details
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error; // Re-throw so the calling function can handle it
  }
};