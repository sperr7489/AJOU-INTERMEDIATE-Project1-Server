// 전체 피드 조회
exports.readAllFeed =async (connection)=>{
    const readAllFeedQuery = `
    SELECTed * FROM feed;
    `
    const [readAllFeedRow] = await connection.query(readAllFeedQuery);
    return readAllFeedRow;
}

//특정 피드가 존재하는지 조회
exports.selectedFeedExist = async (connection,feedIdx)=>{
    const selectFeedExistQuery = `
    SELECT EXISTS (
        SELECT *
        FROM feed
        WHERE FeedIdx = ? AND status = 'N'
    ) as exist;
    `
    const [selectFeedExistRow] = await connection.query(selectFeedExistQuery,feedIdx);
    return selectFeedExistRow
}

//특정 피드의 정보 조회
exports.selectedFeed = async(connection,feedIdx)=>{
    const selectedFeedQuery =`
        select * from feed 
        where feedIdx =? AND status="N";
    `
    const [selectedFeedRow]=await connection.query(selectedFeedQuery,feedIdx);
    console.log(selectedFeedRow)
    return selectedFeedRow;
}
//피드 생성
exports.insertFeed = async(connection,insertFeedParams)=>{
    const insertFeedQuery = `
        insert into feed(title,content,author) values(?,?,?);
    `
    const [insertFeedRow]=await connection.query(insertFeedQuery,insertFeedParams)

    return insertFeedRow;
}
exports.updateFeed = async(connection, updateFeedParams) =>{
    const updateFeedQuery = `
        update feed set title = ?, content = ?, author = ?
        where feedIdx = ? ;
    `
    const [updateFeedRow] =await connection.query(updateFeedQuery,updateFeedParams)
    return updateFeedRow
}

//피드 삭제
exports.deleteFeed = async(connection, feedIdx)=>{
    const deleteFeedQuery =`
        update feed set status = "Y" where feedIdx = ?;
    `
    const [deleteFeedRow] = await connection.query(deleteFeedQuery,feedIdx)
    return deleteFeedRow
}