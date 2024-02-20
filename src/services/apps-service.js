const getApps = (req, res) => {
    return res.send(['one', 'two', 'three']);
}

module.exports = {
    getApps,
};