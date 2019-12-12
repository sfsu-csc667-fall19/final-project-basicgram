Install Kafka using this guide: <br>
https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-ubuntu-18-04

In the `conf/server.properties`, ensure that `listeners=PLAINTEXT://127.0.0.1:9092` is uncommented and set.<br>
With Ubuntu on EC2, we can set up systemd commands such that it runs on bootup.
