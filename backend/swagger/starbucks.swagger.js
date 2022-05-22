/**
 * @swagger
 * /starbucks:
 *  get:
 *      summary: 커피 목록 조회
 *      tags: [starbucks]
 *      requestBody:
 *      responses:
 *          200:
 *            description: 성공
 *            content:
 *                application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                    type: ObjectId
 *                                    example: 62887fdd320fc84ed15b9826
 *                                name:
 *                                    type: string
 *                                    example: 라벤더 카페 브레베
 *                                img:
 *                                    type: string
 *                                    example: https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000004119]_20220412083025862.png
 *                                __v:
 *                                    type: number
 *                                    example: 0
 */
