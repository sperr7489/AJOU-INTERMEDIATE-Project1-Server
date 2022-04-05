module.exports = (app) => {
    const feed = require("./feedController");

    // 피드 전체 조회 API
    app.get("/feed", feed.getAllFeed);

    // 특정 피드 조회 API
    app.get("/feed/:feedIdx", feed.getSelectedFeed);

    // 피드 작성 API
    app.post("/feed", feed.postFeed);

    // 피드 수정 API
    app.patch("/feed/:feedIdx", feed.patchFeed);

    // 피드 삭제 API
    app.delete("/feed/:feedIdx", feed.deleteFeed);
}