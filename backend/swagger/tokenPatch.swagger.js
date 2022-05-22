/**
 * @swagger
 * /tokens/phone:
 *  patch:
 *      summary: 인증 완료
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
 *                      token:
 *                          tpye: string
 *                          example: "012345"
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *                          example: 인증 성공/
 *                                   토큰 불일치/
 *                                   토큰 생성 안됨
 */
