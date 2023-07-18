import express from 'express';
const router = express.Router();

router.use('/abc', (req, res) => {
    res.send("abc")
})
module.exports = router;