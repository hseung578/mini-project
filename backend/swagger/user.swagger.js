/**
 * @swagger
 * /user:
 *  post:
 *      summary: 회원 가입
 *      tags: [user]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: 철수
 *                      email:
 *                          tpye: string
 *                          example: aaa@gmail.com
 *                      personal:
 *                          tpye: string
 *                          example: 220122-1234567
 *                      prefer:
 *                          tpye: string
 *                          example: https://naver.com
 *                      pwd:
 *                          tpye: string
 *                          example: q1w2e3
 *                      phone:
 *                          tpye: string
 *                          example: "01012345678"
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *                          example: 628882c83fe61e6c22e4e802
 *          422:
 *              description: 실패
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *                          example: 에러!! 핸드폰 번호가 인증되지 않았습니다
 */
