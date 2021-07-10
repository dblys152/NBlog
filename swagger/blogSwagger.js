/**
 * @swagger
 *  /blog/{blgMbrNo}:
 *    get:
 *      tags:
 *      - 블로그
 *      description: 블로그 정보
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: blgMbrNo
 *          required: true
 *          type: string
 *          description: 블로그 회원번호
 *      responses:
 *       200:
 *        description: 성공
 *       404:
 *        description: 블로그 주소가 잘못되었습니다.
 */