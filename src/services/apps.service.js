const app = require('../app');
const appResource = require('../resources/app.resource');

const createApp = async (req, res) => {
    const AppsModel = app.getModel('apps');

    const application = await AppsModel.create(req.body);

    return res.json(appResource(application));
}

const getApps = async (req, res) => {
    const AppsModel = app.getModel('apps');

    const applications = await AppsModel.findAll({
        order: [
            ['id', 'DESC']
        ],
    });

    return res.json(applications.map(appResource));
};

const updateApp = async (req, res) => {
    const AppsModel = app.getModel('apps');

    const application = await AppsModel.findOne({ where: { token: req.params.token } });

    if (!application) {
        return res
            .status(404)
            .json({
                message: 'Application with this token is not found'
            });
    }

    const updatedApp = await application.update(req.body, { returning: true });

    return res.json(appResource(updatedApp));
};

module.exports = {
    createApp,
    getApps,
    updateApp
};