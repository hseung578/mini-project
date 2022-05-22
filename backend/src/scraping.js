import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapingOg(url) {
  // 주소로 axios.get 요청해서 html코드 받아오기 => 스크래핑
  const result = await axios.get(url);

  // 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
  const og = {};
  const $ = cheerio.load(result.data);
  $("meta").each((_, el) => {
    if ($(el).attr("property")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      og[key] = value;
    }
  });
  return og;
}
