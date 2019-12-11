// some constants used across components
// TODO: Add all them port host constants here
module.exports = {
    WEBSOCKET_HOST: process.env.WEBSOCKET_HOST || 6000,
    KAFKA_FEED_TOPIC: 'feed',
    KAFKA_COMMENT_TOPIC: 'comment',
    KAFKA_SERVER: 'localhost:9092'
};