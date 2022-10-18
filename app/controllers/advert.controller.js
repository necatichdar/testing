const db = require("../models");
const Advert = db.advert;
const Op = db.Sequelize.Op;

class AdvertController {
    // Create and Save a new Advert
    create = (req, res) => {
        // Validate request

        // Save Advert in the database
        Advert.create(req.body)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Advert."
                });
            });
    };

    // Retrieve all Tutorials from the database.
    findAll = (req, res) => {
        // const title = req.query.title;
        // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        // Advert.findAll({ where: condition })
        Advert.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };

    // Retrieve all Tutorials from the database.
    findTitle = (req, res) => {
        const title = req.params.title;
        console.log(title);
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        Advert.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };

    // Find a single Advert with an id
    findOne = (req, res) => {
        const id = req.params.id;

        Advert.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Advert with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Advert with id=" + id
                });
            });
    };

    // Update a Advert by the id in the request
    update = (req, res) => {
        const id = req.params.id;

        Advert.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Advert was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Advert with id=${id}. Maybe Advert was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Advert with id=" + id
                });
            });
    };

    // Delete a Advert with the specified id in the request
    delete = (req, res) => {
        const id = req.params.id;

        Advert.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Advert was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Advert with id=${id}. Maybe Advert was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Advert with id=" + id
                });
            });
    };

    // Delete all Tutorials from the database.
    deleteAll = (req, res) => {
        Advert.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Tutorials were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while removing all tutorials."
                });
            });
    };

    // find all published Advert
    findAllPublished = (req, res) => {
        Advert.findAll({ where: { isBanned: 0 } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };


}

module.exports = new AdvertController()