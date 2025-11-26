// code to send email using resend
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// creating resend client using api key from env file
const resend = new Resend(process.env.RESEND_API_KEY);

// function to send email anywhere in the app
export const sendEmail = async (to, subject, html) => {
    try {
        const response = await resend.emails.send({
            from: "NexCampus <no-reply@nexcampus.app>",
            to,
            subject,
            html,
        });

        console.log("Email sent successfully:", response);
        return response;
    } catch (error) {
        console.error("Error sending failed:", error);
        throw error;
    }
};