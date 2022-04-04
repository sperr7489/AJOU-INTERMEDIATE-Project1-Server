const pool = require("../../config/database");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const feedDao = require("./feedDao");

// 모든 피드 조회
exports.readAllFeed =async()=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const feedCheckResult = await feedDao.readAllFeed(connection);
        return resultResponse(response.SUCCESS,feedCheckResult);
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}
//피드 인덱스가 존재하는지 확인
exports.feedIdxCheck =async(feedIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const feedIdxCheckResult = await feedDao.selectedFeedExist(connection, feedIdx);
        return feedIdxCheckResult;
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }

}
//선택된 피드 읽어오기
exports.readSelectedFeed = async(feedIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const readSelectedFeedResult = await feedDao.selectedFeed(connection, feedIdx);
        return resultResponse(response.SUCCESS,readSelectedFeedResult) ;
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }

}
