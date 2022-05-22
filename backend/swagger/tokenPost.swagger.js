/**
 * @swagger
 * /tokens/phone:
 *  post:
 *      summary: 토큰 인증 요청
 *      tags: [token]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      phone:
 *                          type: string
 *                          example: "01012345678"
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *                          example: 01012345678으로 123456인증번호 전송에 성공하였습니다
 */
