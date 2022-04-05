const pool = require("../../config/database");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const commentDao = require('./commentDao');

// comment 생성  
exports.createComment = async(feedIdx,author,content)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const createCommentParams = [feedIdx,author,content]    
        await connection.beginTransaction();
        await commentDao.insertComment(connection, createCommentParams);
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
exports.updateCommentOfFeed = async(updateCommentOfFeedParams)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.updateCommentOfFeed(connection, updateCommentOfFeedParams);
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
exports.deleteCommentOfFeed = async(feedIdx,commentIdx)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await commentDao.deleteCommentOfFeed(connection, feedIdx,commentIdx);
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