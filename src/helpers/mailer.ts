import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'



export const sendEmail = async({ email, emailType, userId }:any) => {
    try {
       const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken : hashedToken,
                verifyTokenExpiry:Date.now() + 3600000 // equivalent to 1 hr = 3600000 ms
            })
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000 // equivalent to 1 hr = 3600000 ms
            }) 
        }

        const verifyEmail = `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? 'verify you email address' : 'Reset your password'} or copy and paste the below url in your browser. <br/> </p>${process.env.DOMAIN}/verifyemail?token=${hashedToken} `

        const resetPassword =`<p> Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? 'verify you email address' : 'Reset your password'} or copy and paste the below url in your browser. <br/> </p>${process.env.DOMAIN}/resetpassword?token=${hashedToken} `

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER_ID, // may cause error, yah id string me tha tume without string me kiya hai .env me
              pass: process.env.MAIL_USER_PASSWORD
            }
          });

        const mailOptions = {
            from: 'dev_nitishOfficial@gmail.com', // sender address
            to:email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify you email address" : "Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: emailType === "VERIFY" ? verifyEmail : resetPassword , // html body
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}