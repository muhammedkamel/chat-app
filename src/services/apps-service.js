const App = require('../models/app');
const appResource = require('../resources/app');

const createApp = async (req, res) => {
    const app = await App.create(req.body);

    return res.json(appResource(app));
}

const getApps = async (req, res) => {
    const apps = await App.findAll();

    return res.json(apps.map(appResource));
};

const updateApp = async (req, res) => {
    const app = await App.findOne({ where: { token: req.params.token } });

    if (!app) {
        return;
    }

    const updatedApp = await app.update(req.body, { returning: true });

    return res.json(appResource(updatedApp));
};

module.exports = {
    createApp,
    getApps,
    updateApp
};