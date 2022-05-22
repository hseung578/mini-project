/**
 * @swagger
 * /users:
 *  get:
 *      summary: 회원 목록 조회
 *      tags: [user]
 *      requestBody:
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  og:
 *                                      type: object
 *                                      properties:
 *                                          title:
 *                                              type: string
 *                                              example: 네이버
 *                                          description:
 *                                              type: string
 *                                              example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                          image:
 *                                              type: string
 *                                              example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 *                                  _id:
 *                                      type: ObjectId
 *                                      example: 628882c83fe61e6c22e4e802
 *                                  name:
 *                                      type: string
 *                                      example: 철수
 *                                  email:
 *                                      type: string
 *                                      example: soo@naver.com
 *                                  personal:
 *                                      type: string
 *                                      example: 220113-2222222
 *                                  prefer:
 *                                      type: string
 *                                      example: https://naver.com
 *                                  pwd:
 *                                      type: string
 *                                      example: q1w2e3
 *                                  phone:
 *                                      type: string
 *                                      example: "01012345678"
 *                                  __v:
 *                                      type: number
 *                                      example: 0
 */
