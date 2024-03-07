const app = require('../app');
const messageResource = require('../resources/message.resource');

const createMessage = async (req, res) => {
    const { token, number } = req.params;
    const { content } = req.body;

    const AppsModel = app.getModel('apps');
    const ChatsModel = app.getModel('chats');
    const redisClient = app.get('redisClient');
    const broker = app.get('broker');

    const application = await AppsModel.findOne({
        where: { token },
        include: [{ model: ChatsModel, as: 'chats', where: { number } }]
    });

    if (!application) {
        return res
            .status(404)
            .json({
                message: 'Application with this token is not found'
            });
    }

    const messageNumber = await redisClient.INCR(`app:${token}:chat:${number}:messages`);

    await broker.publish(
        'messages_pub',
        {
            number: messageNumber,
            content,
            chatId: application.chats[0].id,
        }
    )

    return res.json({
        number: messageNumber,
        content
    });
};

const getMessages = async (req, res) => {
    const { token, number } = req.params;

    const AppsModel = app.getModel('apps');
    const ChatsModel = app.getModel('chats');
    const MessagesModel = app.getModel('messages');

    const application = await AppsModel.findOne({
        where: { token },
        include: [{ model: ChatsModel, as: 'chats', where: { number } }]
    });

    if (!application) {
        return res
            .status(404)
            .json({
                message: 'Application with this token is not found'
            });
    }

    const messages = await MessagesModel.findAll({
        where: { chatId: application.chats[0].id },
        order: [['id', 'DESC']],
    });

    res.json(messages.map(messageResource));
}

const updateMessage = async (req, res) => {
    const { token, number, messageNumber } = req.params;
    const { content } = req.body;

    const AppsModel = app.getModel('apps');
    const ChatsModel = app.getModel('chats');
    const MessagesModel = app.getModel('messages');

    const application = await AppsModel.findOne({
        where: { token },
        include: [{ model: ChatsModel, as: 'chats', where: { number } }]
    });

    if (!application) {
        return res
            .status(404)
            .json({
                message: 'Application with this token is not found'
            });
    }

    const message = await MessagesModel.findOne({
        where: { chatId: application.chats[0].id, number: messageNumber },
    });

    const updatedMessage = await message.update({ content }, { returning: true });

    res.send(messageResource(updatedMessage))
}

const saveMessagesBatch = async (messages) => {
    console.log(messages);

    const MessagesModel = app.getModel('messages');

    await MessagesModel.bulkCreate(messages);
}

module.exports = {
    createMessage,
    getMessages,
    updateMessage,
    saveMessagesBatch
};