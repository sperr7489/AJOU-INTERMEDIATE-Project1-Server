const res = require("express/lib/response");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const feedProvider = require("./feedProvider");

// 피드 게시물 전체 조회
exports.getAllFeed = async (req,res)=>{
    const getFeedPostResult = await feedProvider.readAllFeed()
    return res.send(getFeedPostResult)
}

// 선택된 피드 정보 가져오기
exports.getSelectedFeed = async(req,res)=>{
    const feedIdx = req.params.feedIdx;

    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));

    const getSelectedFeedResult = await feedProvider.readSelectedFeed(feedIdx);
    return res.send(getSelectedFeedResult)
}

//피드 생성
exports.postFeedPost = async(req,res)=>{
    const {  title, content, author } = req.body;

    if (  !title || !content || !author) return res.send(basicResponse(response.FEED_PARAMS_EMPTY));

    const postBoardPostResult = await boardService.createFeed( title, content, author);
    return res.send(postBoardPostResult);
}