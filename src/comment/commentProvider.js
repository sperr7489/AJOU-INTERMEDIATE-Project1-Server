const pool = require("../../config/database");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const commentDao = require("./commentDao");

//특정 피드의 comment 조회
exports.selectCommentOfFeed = async(feedIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const selectCommentOfFeedResult = await commentDao.readAllCommentOfFeed(connection,feedIdx);
        return resultResponse(response.SUCCESS,selectCommentOfFeedResult);
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }

}

//특정 피드의 comment 존재 여부 체크
exports.commentIdxCheck = async(feedIdx,commentIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const commentIdxCheckResult = await commentDao.commentIdxCheck(connection,feedIdx,commentIdx);
        return commentIdxCheckResult
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}