const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const feedProvider = require("./feedProvider");
const feedService = require("./feedService");

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
exports.postFeed = async(req,res)=>{
    const {  title, content, author } = req.body;

    if (  !title || !content || !author) return res.send(basicResponse(response.FEED_PARAMS_EMPTY));

    console.log(title,content,author)
    const postFeedPostResult = await feedService.createFeed( title, content, author);
    return res.send(postFeedPostResult);
}

//피드 수정. 
exports.patchFeed = async(req,res)=>{
    const feedIdx = req.params.feedIdx;
    const {  title, content, author } = req.body;


    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))
    if ( !title || !content || !author) return res.send(basicResponse(response.FEED_PARAMS_EMPTY));

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));

    const patchFeedResult = await feedService.updateFeed(feedIdx,title, content, author)
    return res.send(patchFeedResult)
}
exports.deleteFeed  =async(req,res)=>{
    const feedIdx =req.params.feedIdx
    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));

    const deleteFeedResult = await feedService.deleteFeed(feedIdx)  
    return res.send(deleteFeedResult)
}