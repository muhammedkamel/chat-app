const app = require('../app');
const chatResource = require('../resources/chat.resource');

const createChat = async (req, res) => {
    const redisClient = app.get('redisClient');
    const broker = app.get('broker');
    const AppsModel = app.getModel('apps');
    const token = req.params.token;

    const application = await AppsModel.findOne({ where: { token } });

    if (!application) {
        return res
            .status(404)
            .json({
                message: 'Application with this token is not found'
            });
    }

    // increment and get new chat number for token
    const chatNumber = await redisClient.INCR(`app:${token}:chats`);

    // publish message to rabbitmq with the chat 
    await broker.publish(
        'chats_pub',
        {
            number: chatNumber,
            appId: application.id
        }
    );

    res.json(
        chatResource({
            number: chatNumber,
            messagesCount: 0,
        })
    );
}

const getChats = async (req, res) => {
    const AppsModel = app.getModel('apps');
    const ChatsModel = app.getModel('chats');

    const application = await AppsModel.findOne({ where: { token: req.params.token } });

    if (!application) {
        return res
            .status(404)
            .json({
                message: 'Application with this token is not found'
            });
    }

    const chats = await ChatsModel.findAll({
        where: { appId: application.id },
        order: [['id', 'DESC']],
    });

    res.json(chats.map(chatResource));
}

const saveChatsBatch = async (chats) => {
    console.log(chats);

    const ChatsModel = app.getModel('chats');

    await ChatsModel.bulkCreate(chats);
}

module.exports = {
    createChat,
    getChats,
    saveChatsBatch
};