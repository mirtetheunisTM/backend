const Order = require('../../../models/order');

const getAll = async(req, res) => {
    const orders = await Order.find();
    res.json({
        "status": "success",
        "data": {
            "orders": orders
        }
    })
}

const create = (req, res) => {
    let order = new Order();
    order.name = req.body.name;
    order.email = req.body.email;
    order.address = req.body.address;
    order.city = req.body.city;
    order.state = req.body.state;
    order.items = req.body.items;
    order.total = req.body.total;
    order.status = req.body.status;

    order.save().then(order => {
        res.json({
            "status": "success",
            "data": {
                "order": order
            }
        })
    });
}

const getOne = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if(!order) {
            return res.status(404).json({
                "status": "error",
                "message": "Order not found"
            });
        }
        if (order) {
            res.json({
                "status": "success",
                "data": {
                    "order": order
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }

    res.json({
        "status": "success",
        "data": {
            "order": {}
        }
    })
}

const update = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "order": {}
        }
    })
}

const destroy = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "order": {}
        }
    })
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    destroy
}