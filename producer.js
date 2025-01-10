const { Kafka } = require("kafkajs")

const message = process.argv[2];

async function run () {

    const kafka = new Kafka({
        "cleintId": "myapp",
        "brokers": ["localhost:9092"],
    })

    const producer = kafka.producer();

    try {
        
        console.log("Connecting....");
        await producer.connect();
        console.log("Connected!");

        const partition = message[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": message,
                    "partition": partition
                }
            ]
        })

        console.log(`Sent message: ${JSON.stringify(result)}`);
        await producer.disconnect();

    } catch (error) {
        console.error(`Something went wrong: ${error}`)
    } finally {
        process.exit(0);
    }
};

run();