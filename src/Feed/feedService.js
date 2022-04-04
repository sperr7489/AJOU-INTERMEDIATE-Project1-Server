const pool = require("../../config/database");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const feedDao = require('./feedDao');

exports.createFeed = async(title, content, author)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        const insertFeedPostParams = [title, content, author];
        await feedDao.insertBoardPost(connection, insertFeedPostParams);
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