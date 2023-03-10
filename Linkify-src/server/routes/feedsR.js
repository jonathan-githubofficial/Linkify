const express = require("express");
const router = express.Router();
const feedsC = require("../controllers/feedsC");

router.post("/postFeed", feedsC.postFeed);
router.get("/getFeeds", feedsC.getAllPosts);
router.post("/addLike", feedsC.addLike);
router.post("/addComment", feedsC.addComment);
router.post("/updatePost", feedsC.updateFeed);
router.delete("/deletePost", feedsC.deleteFeed);
router.get("/getFeedById", feedsC.getFeedById);
router.get("/getPersonalFeed", feedsC.getPersonalFeed);

module.exports = router;