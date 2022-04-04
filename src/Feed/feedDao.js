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