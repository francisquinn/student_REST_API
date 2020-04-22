const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        post:{
            title: 'Post page',
            description: 'you should be logged in'
        }
    })
});

module.exports = router