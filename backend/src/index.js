import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "../swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { Starbucks } from "../models/starkbucks.models.js";
import { Token } from "../models/token.models.js";
import { scrapingOg } from "./scraping.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// /users
app.get("/users", async (req, res) => {
  //1.데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = await User.find();

  //2.꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/user", async (req, res) => {
  const client = req.body;
  console.log(client);

  const check = await Token.findOne({ phone: client.phone });
  console.log(check.isAuth);
  if (check.isAuth) {
    // scraping with cheerio
    const og = await scrapingOg(client.prefer);

    // 주민번호 보호
    const personal = client.personal.split("-")[0] + "-";
    const protectedPersonal = personal.padEnd(14, "*");

    // DB에 저장
    const user = new User({
      name: client.name,
      email: client.email,
      personal: protectedPersonal,
      prefer: client.prefer,
      pwd: client.pwd,
      phone: client.phone,
      og: {
        title: og.title,
        description: og.description,
        image: og.image,
      },
    });
    await user.save();

    // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
    const isValid = checkValidationEmail(client.email);
    if (isValid) {
      // 2. 가입환영 템플릿 만들기
      const mytemplate = getWelcomeTemplate(client);

      // 3. 이메일에 가입환영 템플릿 전송하기
      // sendTemplateToEmail(client.email, mytemplate);
    }

    // id 반환
    res.send(user.id);
  } else {
    res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다");
  }
});

// /starbucks
app.get("/starbucks", async (req, res) => {
  //1.데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = await Starbucks.find();

  //2.꺼내온 결과 응답 주기
  res.send(result);
});

// /tokens/phone
app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  // 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 핸드폰 토큰 6자리 만들기1213
    const mytoken = getToken();

    // 핸드폰번호 DB에 있는지 확인
    const check = await Token.findOne({ phone: myphone });

    if (check !== null) {
      Token.updateOne(
        { phone: myphone },
        { $set: { token: mytoken } },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated Docs : ", docs);
          }
        }
      );
    } else {
      const isAuth = false;
      //  데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      const token = new Token({
        token: mytoken,
        phone: req.body.phone,
        isAuth,
      });
      await token.save();
    }

    // 핸드폰번호에 토큰 전송하기
    // sendTokenToSMS(myphone, mytoken);
    res.send(`${myphone}으로 ${mytoken}인증번호 전송에 성공하였습니다`);
  }
});

app.patch("/tokens/phone", async (req, res) => {
  const user = req.body;

  const check = await Token.findOne({ phone: user.phone });

  if (check !== null) {
    const savedToken = check.token;
    if (savedToken != user.token) {
      res.send("토큰 불일치");
    } else {
      Token.updateOne(
        { phone: user.phone },
        { $set: { isAuth: true } },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated Docs : ", docs);
          }
        }
      );
      res.send("인증 성공");
    }
  } else {
    res.send("토큰 생성 안됨");
  }
});

// MongoDB 접속!!
mongoose.connect("mongodb://my-database:27017/mydocker03");

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
