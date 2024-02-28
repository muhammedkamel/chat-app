const createApp = (req, res) => {
    console.log(req.body);

    return res.send(['one', 'two', 'three']);
}

module.exports = {
    createApp
};