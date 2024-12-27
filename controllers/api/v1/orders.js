const Order = require('../../../models/order');

const getAll = async(req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            "status": "success",
            "data": {
                "orders": orders
            }
        })    
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
}

const create = async (req, res) => {
    let order = new Order();
    order.name = req.body.name;
    order.email = req.body.email;
    order.address = req.body.address;
    order.city = req.body.city;
    order.state = req.body.state;
    order.items = req.body.items;
    order.total = req.body.total;
    order.status = req.body.status;

    try {
        order = await order.save();
        res.json({
            "status": "success",
            "data": {
                "order": order
            }
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
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

const update = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            items: req.body.items,
            total: req.body.total,
            status: req.body.status
        }, { new: true });

        if(!updatedOrder) {
            return res.status(404).json({
                "status": "error",
                "message": "Order not found"
            });
        }
        if (updatedOrder) {
            res.json({
                "status": "success",
                "data": {
                    "order": updatedOrder
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
}

const destroy = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if(!deletedOrder) {
            return res.status(404).json({
                "status": "error",
                "message": "Order not found"
            });
        }
        if (deletedOrder) {
            res.json({
                "status": "success",
                "data": {
                    "order": deletedOrder
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    destroy
}