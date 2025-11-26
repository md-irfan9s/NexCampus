// // code to send email using resend
// // import { Resend } from "resend";
// // import dotenv from "dotenv";

// const {Resend} = require("resend")
require("dotenv").config()

// // dotenv.config();

// // creating resend client using api key from env file
// // const resend = new Resend(process.env.RESEND_API_KEY);
// const resend = new Resend(process.env.RESEND_API_KEY)

// // function to send email anywhere in the app
// exports.sendEmail = async (to, subject, html) => {
//     try {
//         const response = await resend.emails.send({
//             from: "NexCampus <onboarding@resend.dev>",
//             to,
//             subject,
//             html,
//         });

//         console.log("Email sent successfully:", response);
//         return response;
//     } catch (error) {
//         console.error("Error sending failed:", error);
//         throw error;
//     }
// };


// sendEmail.js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Reusable function
async function sendEmail(to, subject, html) {
  const msg = {
    from: "irfancs887@gmail.com",  // apni verified email lagao
    to,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
    return { success: true };
  } catch (error) {
    console.log("SendGrid Error:", error);
    return { success: false, error };
  }
}

module.exports = sendEmail;

