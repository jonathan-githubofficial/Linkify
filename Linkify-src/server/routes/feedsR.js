const express = require("express");
const router = express.Router();

const feedsC = require("../controllers/feedsC");

router.get("/postFeed", feedsC.postFeed);
router.get("/getFeeds", feedsC.getAllPosts);
router.get("/addLike", feedsC.addLike);
router.get("/addComment", feedsC.addComment);
router.get("/updatePost", feedsC.updateFeed);
router.get("/deletePost", feedsC.deleteFeed);
router.get("/getFeedById", feedsC.getFeedById);
router.get("/getPersonalFeed", feedsC.getPersonalFeed);

module.exports = router;
