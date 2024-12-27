const Order = require('../../../models/order');

const getAll = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "orders": []
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

const getOne = (req, res) => {
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