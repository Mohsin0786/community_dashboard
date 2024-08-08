const express = require('express');
const {
    getSummary,getMembers,getTopContributors,getGrowthRate,
    getEngagementRate
} = require('../controller/communityController');

const router = express.Router();


router.get('/community/summary', getSummary);
router.get('/community/members', getMembers);
router.get('/community/top-contributors', getTopContributors);
router.get('/community/growth-rate', getGrowthRate);
router.get('/community/engagement-rate', getEngagementRate);


module.exports = router;
