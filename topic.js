const { Kafka } = require("kafkajs")

async function run () {

    const kafka = new Kafka({
        "cleintId": "myapp",
        "brokers": ["localhost:9092"],
    })

    const admin = kafka.admin();

    try {
        
        console.log("Connecting....");
        await admin.connect();
        console.log("Connected!");

        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })

        console.log("Created Successfully!");
        await admin.disconnect();

    } catch (error) {
        console.error(`Something went wrong: ${error}`)
    } finally {
        process.exit(0);
    }
};

run();