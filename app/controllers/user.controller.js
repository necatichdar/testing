const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

class UserController {
    // Create and Save a new User
    create = (req, res) => {
        // Validate request

        // Save User in the database
        User.create(req.body)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    };

    // Retrieve all Tutorials from the database.
    findAll = (req, res) => {
        // const title = req.query.title;
        // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        // User.findAll({ where: condition })
        User.findAll()
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

        User.findAll({ where: condition })
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

    // Find a single User with an id
    findOne = (req, res) => {
        const id = req.params.id;

        User.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find User with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving User with id=" + id
                });
            });
    };

    // Update a User by the id in the request
    update = (req, res) => {
        const id = req.params.id;

        User.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    };

    // Delete a User with the specified id in the request
    delete = (req, res) => {
        const id = req.params.id;

        User.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete User with id=${id}. Maybe User was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    };

    // Delete all Tutorials from the database.
    deleteAll = (req, res) => {
        User.destroy({
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

    // find all published User
    findAllPublished = (req, res) => {
        User.findAll({ where: { isBanned: 0 } })
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

module.exports = new UserController()