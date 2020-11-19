const Model = require('../model')
const { Manufacturer } = Model

const ManufacturerController = {
    all(req, res) {
        Manufacturer.find({})
        .exec((err, manfacturers) => res.json(manfacturers))
    },
    

}