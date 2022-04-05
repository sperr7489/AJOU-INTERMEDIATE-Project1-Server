const pool = require("../../config/database");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const feedDao = require('./feedDao');

// 피드 생성
exports.createFeed = async(title, content, author)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        const insertFeedParams = [title, content, author];
        await feedDao.insertFeed(connection, insertFeedParams);
        await connection.commit();
        return basicResponse(response.SUCCESS);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }

}

// 피드 수정 
exports.updateFeed = async(feedIdx,title, content, author)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        const updateFeedParams = [title, content, author,feedIdx];
        await feedDao.updateFeed(connection, updateFeedParams);
        await connection.commit();
        return basicResponse(response.SUCCESS);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }

}

//피드 삭제
exports.deleteFeed = async(feedIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await feedDao.deleteFeed(connection, feedIdx);
        await connection.commit();
        return basicResponse(response.SUCCESS);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}