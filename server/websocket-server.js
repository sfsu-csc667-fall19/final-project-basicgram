const WebSocket = require('ws');
const { WEBSOCKET_HOST } = require('./library/consts.js');
const wss = new WebSocket.Server({ port: WEBSOCKET_HOST });
const CONSTANTS = require('./library/consts.js');
const KafkaConsumer = require('./library/kafka-consumer.js');

// const KafkaClient = new kafka.KafkaClient({kafkaHost:CONSTANTS.KAFKA_SERVER}); // localhost:9092
const consumer = new KafkaConsumer([CONSTANTS.FEED_TOPIC, CONSTANTS.KAFKA_COMMENT_TOPIC]);

consumer.connect();
// payload from producer contains a message string
consumer.on('message', (message) => {
    if (message === "post") {
        console.log("message received: updateFeed next");
        updateFeed();
    } else {
        console.log("message received: updateComment next");
        updateComment(message);
    }
});

const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message)); //server to client
        }
    });
};

const updateFeed = () => {
    broadcastMessage({
        type: 'UPDATE_FEED',
    });
};

const updateComment = (postId) => {
    broadcastMessage({
        type: 'UPDATE_COMMENT',
        postId
    });
};


wss.on('connection', (ws) => {
    console.log('Someone has connected');
    ws.on('close', () => {
        console.log('someone has disconnected!');
    });

    ws.on('error', (e) => {
        console.log(e);
    });

    ws.on('message', (message) => {
        const messageObject = JSON.parse(message);
        switch (messageObject.type) {
            default:
                ws.send('Did not expect a message!');
        }
    });
});
