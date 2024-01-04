const express = require("express");
const { generateNewShortUrl, redirectToUrl, urlHomePage } = require("../controllers/url")
const router = express.Router()

router.post('/', generateNewShortUrl)
router.get('/:shortid', redirectToUrl)
router.get('/', urlHomePage)

module.exports = router;