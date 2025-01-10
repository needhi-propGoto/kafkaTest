const { Kafka } = require("kafkajs")

async function run () {

    const kafka = new Kafka({
        "cleintId": "myapp",
        "brokers": ["localhost:9092"],
    })

    const consumer = kafka.consumer({ "groupId": "test" });

    try {
        
        console.log("Connecting....");
        await consumer.connect();
        console.log("Connected!");

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async (result) => {
                console.log(`Received message: ${result.message.value.toString()} on partition ${result.partition}`);
            }
        })

    } catch (error) {
        console.error(`Something went wrong: ${error}`)
    }
};

run();