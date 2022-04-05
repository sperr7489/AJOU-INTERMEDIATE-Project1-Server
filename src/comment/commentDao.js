// 피드에 댓글 삽입. 
exports.insertComment = async(connection,createCommentParams)=>{
    const insertCommentQuery = `
        INSERT INTO comment(feedIdx, author, content) VALUES (?,?,?);
    `
    const [insertCommentRow] = await connection.query(insertCommentQuery,createCommentParams)
    return insertCommentRow;
}

// 특정 피드에 해당하는 댓글들 조회
exports.readAllCommentOfFeed = async (connetion, feedIdx)=>{
    const readAllCommentOfFeedQuery = `
    select f.feedIdx,commentIdx,f.author "feed author", f.content "feed",c.author "comment author",c.content "comment" from comment c 
    left join feed f on f.feedIdx = c.feedIdx
    where f.feedIdx=? and c.status = "N";
    `
    const [readAllCommentOfFeedRow] = await connetion.query(readAllCommentOfFeedQuery,feedIdx)
    console.log(readAllCommentOfFeedRow)
    return readAllCommentOfFeedRow;
}
//특정 피드에 댓글이 존재하는지 검사. 
exports.commentIdxCheck = async (connetion, feedIdx,commentIdx) =>{
    const commentIdxCheckQuery = `
    SELECT EXISTS (
        SELECT *
        FROM comment
        WHERE feedIdx = ? and commentIdx= ? AND status = 'N'
    ) as exist;
    `
    
    const [[commentIdxCheckRow]]= await connetion.query(commentIdxCheckQuery,[feedIdx,commentIdx])
    return commentIdxCheckRow;
}

// 피드의 댓글을 수정하는 것. 
exports.updateCommentOfFeed = async(connection,updateCommentOfFeedParams)=>{
    const updateCommentOfFeedQuery = `
        update comment set author = ?, content = ?
        where feedIdx = ? and commentIdx = ?;
    `
    const [updateCommentOfFeedRow]  = await connection.query(updateCommentOfFeedQuery,updateCommentOfFeedParams)
    return updateCommentOfFeedRow;
}
//피드의 댓글을 삭제하는 것.
exports.deleteCommentOfFeed = async(connection,feedIdx,commentIdx)=>{
    const deleteCommentOfFeedQuery = `
        update comment set status = "Y" where feedIdx = ? and commentIdx = ?;
    `
    const [deleteCommentOfFeedRow]= await connection.query(deleteCommentOfFeedQuery,[feedIdx,commentIdx]);
    return deleteCommentOfFeedRow;
}