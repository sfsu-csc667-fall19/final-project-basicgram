class KafkaProducerLibrary {
  constructor(kafkaProducer) {
    this.kafkaProducer = kafkaProducer;
  }

  produceMessage(topic, message) {
    let updateFeedPayload = [{
      topic: topic,
      message: message !== null ? message : topic
    }];

    return this.kafkaProducer.send(updateFeedPayload, (err, data) => {
      if (err) {
        console.log(`[kafka-producer => ${topic}]: UPDATE FAILED`);
        console.log(err)
      } else {
        console.log(`[kafka-producer => ${topic}]: UPDATE SUCCESS`);
        console.log("DATA RESPONSE FROM PRODUCTION: " + data);
      }
    });
  };
}

module.exports = KafkaProducerLibrary;