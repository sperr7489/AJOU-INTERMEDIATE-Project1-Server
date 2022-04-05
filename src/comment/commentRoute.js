module.exports= (app)=>{
    const comment = require("./commentController");
    
    // comment 생성 api
    app.post('/comment',comment.createComment);

    // 특정 피드의 comment 조회 api 
    app.get('/comment',comment.selectCommentOfFeed);

    // comment 수정 api
    app.patch('/comment',comment.updateCommentOfFeed);

    // comment 삭제 api
    app.delete('/comment',comment.deleteCommentOfFeed)
}
