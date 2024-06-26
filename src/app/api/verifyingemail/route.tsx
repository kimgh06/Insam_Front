import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.NEXT_PUBLIC_AUTH_EMAIL,
    pass: process.env.NEXT_PUBLIC_AUTH_PASS,
  }
})

export async function POST(req: Request, response: Response) {
  const { email } = await req.json();
  const verfifycode = Math.floor(Math.random() * 1000000).toString().padStart(6, "0")
  const mailOption = {
    from: 'Insam@insam.com',
    to: email,
    subject: "Insam 인증번호 : " + verfifycode,
    html: `<div>
      인증번호는 ${verfifycode} 입니다.<br/>
      요청하지 않았다면 무시해도 됩니다.<br/>
      <br/>
      Project Insam.
      </div>`
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err, 'error at post verifyingemail');
        reject(err)
      } else {
        resolve(info)
      }
    });
  })
  return NextResponse.json({ code: verfifycode });
}