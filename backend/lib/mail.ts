import { createTransport, getTestMessageUrl } from "nodemailer";

// Connects to our ethereal credentials in our .env file (where password reset emails will be sent while in development)
// createTransport comes from nodemailer, which is what Node uses to send emails
const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

// Function to template an email
// There are frameworks for designing, rendering emails but this is DIY
function makeEmail(text: string): string {
    return `
        <div style="
            border: 1px solid black; 
            padding: 20px; 
            font-family:sans-serif; 
            line-height: 2; 
            font-size: 20px;"
        >
            <h2>Hello there!</h2>
            <p>${text}</p>
            <p>Nataliya</p>
        </div>
    `
}

// Function that sends the email
// Function is called in keystone.ts when a password reset is requested
// Email will be sent with password reset  link with token in the URL
export async function sendPasswordResetEmail(
    resetToken: string, 
    to: string
): Promise<void> {
    // email the user a token
    const info = await transport.sendMail({
        to,
        from: 'test@example.com',
        subject: 'Your password reset token',
        html: makeEmail(`Your Password Reset Token is here! 
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset!</a>`)
    });

    // If testing with an ethereal email, helper link to the email message will be sent to backend terminal
    if(process.env.MAIL_USER.includes('ethereal.email')) {
        console.log(`Message sent! Preview it at ${getTestMessageUrl(info)}`)
    }
}