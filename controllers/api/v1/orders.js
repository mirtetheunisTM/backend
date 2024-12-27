const getAll = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "orders": []
        }
    })
}

const create = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "order": {}
        }
    })
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