const Order = require('../../../models/order');

const getAll = async(req, res) => {
    try {
        const { sort, order = 'asc', name, status } = req.query;

        // Base query
        let query = {};

        // Add filters
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive regex for name
        }
        if (status) {
            query.status = status; // Exact match for status
        }

        // Add sorting
        let sortOption = {};
        if (sort) {
            const sortField = sort === 'date' ? 'date' : 'name'; // Allowed fields to sort
            const sortOrder = order === 'desc' ? -1 : 1; // Sort direction
            sortOption[sortField] = sortOrder;
        }

        // Execute query with sorting
        const orders = await Order.find(query).sort(sortOption);

        res.json({
            status: 'success',
            data: {
                orders,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
}

const create = async (req, res) => {
    let order = new Order();
    order.name = req.body.name;
    order.email = req.body.email;
    order.address = req.body.address;
    order.country = req.body.country;
    order.product = req.body.product;
    order.totalPrice = req.body.totalPrice;
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