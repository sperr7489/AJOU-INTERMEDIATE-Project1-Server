const res = require("express/lib/response");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const commentService= require('../comment/commentService')
const commentProvider= require('../comment/commentProvider')
const feedProvider = require('../Feed/feedProvider')

//comment 생성 
exports.createComment = async (req,res)=>{
    const {feedIdx} =req.query
    const {author, content}  = req.body

    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));

    const createCommentResult = await commentService.createComment(feedIdx,author,content)
    return res.send(createCommentResult);
}
// 특정 feed의 comment 조회
exports.selectCommentOfFeed = async(req,res)=>{
    const {feedIdx} = req.query;

    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));

    const selectCommentOfFeedResult = await commentProvider.selectCommentOfFeed(feedIdx)
    return res.send(selectCommentOfFeedResult);

}
// 특정 feed의 comment 수정
exports.updateCommentOfFeed = async(req,res)=>{
    const {feedIdx,commentIdx} =req.query;
    const {author,content}=req.body;

    const updateCommentOfFeedParams = [author,content,feedIdx,commentIdx]

    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));
    // console.log(feedIdxCheck)
    const commentIdxCheck = await commentProvider.commentIdxCheck(feedIdx,commentIdx);
    if (commentIdxCheck.exist === 0) return res.send(basicResponse(response.COMMENT_NOT_EXIST));
    
    const updateCommentOfFeedResult = await commentService.updateCommentOfFeed(updateCommentOfFeedParams)

    return res.send(updateCommentOfFeedResult)

}
exports.deleteCommentOfFeed = async(req,res)=>{
    const {feedIdx, commentIdx} = req.query
    if (!feedIdx)  return res.send(basicResponse(response.FEED_PARAMS_EMPTY))

    const feedIdxCheck = await feedProvider.feedIdxCheck(feedIdx);
    if (feedIdxCheck.exist === 0) return res.send(basicResponse(response.FEED_NOT_EXIST));

    const commentIdxCheck = await commentProvider.commentIdxCheck(feedIdx,commentIdx);
    // console.log(commentIdxCheck, "commentController")
    if (commentIdxCheck.exist === 0) return res.send(basicResponse(response.COMMENT_NOT_EXIST));
    
    const deleteCommentOfFeedResult = await commentService.deleteCommentOfFeed(feedIdx,commentIdx)
    
    return res.send(deleteCommentOfFeedResult)


}