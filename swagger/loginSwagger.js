/**
 * @swagger
 *  /auth/token:
 *    post:
 *      tags:
 *      - 로그인 / 회원
 *      description: 로그인
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: data
 *          required: true
 *          schema:
 *              properties:        
 *                  mbrEmail:
 *                      type: string
 *                      required: true
 *                      description: 로그인 이메일
 *                  mbrPw:
 *                      type: string
 *                      required: true
 *                      description: 로그인 비밀번호
 *      responses:
 *       200:
 *        description: 성공
 *       400:
 *        description: 이메일이 존재하지 않습니다. / 비밀번호가 존재하지 않습니다.
 *       404:
 *        description: 사용자 정보가 일치하지 않습니다.
 */