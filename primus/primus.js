const Primus = require('primus');

let primus;

// Start Primus
let go = (server) => {
    primus = new Primus(server, { transformer: 'websockets' });

    // Handle new connections
    primus.on('connection', (spark) => {
        console.log('New spark connected:', spark.id);

        spark.on('order-added', (order) => {
            primus.write({ event: 'order-added', data: order });
        });

        spark.on('order-deleted', (orderId) => {
            primus.write({ event: 'order-deleted', data: { orderId } });
        });

        spark.on('order-updated', (updatedOrder) => {
            primus.write({ event: 'order-updated', data: updatedOrder });
        });

        // Handle disconnections
        spark.on('end', () => {
            console.log(`Spark disconnected: ${spark.id}`);
        });

        primus.options.parser = 'json';
        primus.options.cors = {
            credentials: true,
            origin: 'http://localhost:5173', // Frontend URL
        };
    });

    return primus;
};

const getPrimus = () => {
    if (!primus) {
        throw new Error('Primus has not been initialized. Call `go` first.');
    }
    return primus;
};

module.exports = { go, getPrimus };
