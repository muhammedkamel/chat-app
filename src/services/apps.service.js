const app = require('../app');
const appResource = require('../resources/app.resource');

const createApp = async (req, res) => {
    const app = await App.create(req.body);

    return res.json(appResource(app));
}

const getApps = async (req, res) => {
    const AppsModel = app.getModel('apps');

    const apps = await AppsModel.findAll({
        order: [
            ['id', 'DESC']
        ],
    });

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