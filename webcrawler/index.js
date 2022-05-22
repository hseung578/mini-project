import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbucks } from "./models/starkbucks.models.js";

// // MongoDB 접속!!
mongoose.connect("mongodb://localhost:27017/mydocker03");

async function starbucksCrawling() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  for (let i = 1; i <= 30; i++) {
    // 메뉴 이름 가져오기
    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );

    // 메뉴 이미지 가져오기
    const img = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img`,
      (el) => el.src
    );

    // DB에 저장하기
    const starbucks = new Starbucks({
      name,
      img,
    });
    await starbucks.save();
  }

  await browser.close();
}

starbucksCrawling();
