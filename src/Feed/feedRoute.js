module.exports = (app) => {
    const feed = require("./feedController");

    // 피드 게시글 전체 조회 API
    app.get("/feed", feed.getAllFeed);

    // // 특정 피드 조회 API
    app.get("/feed/:feedIdx", feed.getSelectedFeed);

    // // 게시판 게시글 작성 API
    app.post("/feed", feed.postFeed);

    // // 게시판 게시글 수정 API
    app.patch("/feed/:feedIdx", feed.patchFeed);

    // // 게시판 게시글 삭제 API
    app.delete("/feed/:feedIdx", feed.deleteFeed);
}