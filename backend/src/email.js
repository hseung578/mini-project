import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러 발생!!! email를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, phone, prefer }) {
  return `
    <html>
        <body>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 500px">
              <h1 style="color: blue">${name}님 가입을 환영합니다!!!</h1>
              <hr />
              <div>이름: ${name}</div>
              <div>전화번호: ${phone}</div>
              <div>좋아하는 사이트: ${prefer}</div>
              <div>가입일: ${getToday()}</div>
            </div>
          </div>
        </body>
    </html>
`;
}

export async function sendTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "가입을 환영합니다^^",
    html: mytemplate,
  });
  console.log(result);

  // console.log(`${email}이메일로 ${mytemplate}를 전송합니다!!"`);
}
