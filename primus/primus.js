const Primus = require('primus');

// Start Primus
let go = (server) => {
    let primus = new Primus(server, { transformer: 'websockets' });

    // Handle new connections
    primus.on('connection', (spark) => {
        console.log('New spark connected:', spark.id);

        // Example: Listen for data from a client
        spark.on('data', (data) => {
            console.log(`Received data from ${spark.id}:`, data);

            // Broadcast the data to all other connected clients
            primus.write(data);
        });

        // Handle disconnections
        spark.on('end', () => {
            console.log(`Spark disconnected: ${spark.id}`);
        });
    });

    return primus;
};

module.exports = { go };
