import User from '../models/user.js';
import Team from '../models/team.js';
import bcrypt from 'bcryptjs';

import { getToken, generateToken } from '../utils.js';

var userController = {

    signIn: async function(req, res) {
        try {

            const user = await User.findOne({ email: req.body.email });
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(200).send({
                        _id: user._id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        token: generateToken(user)
                    });
                } else {
                    return res.status(404).send({ message: 'Password incorrect' });
                }
            } else {
                return res.status(404).send({ message: 'User not created' });
            }

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },
    createUser: async function(req, res) {
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        });
        try {
            const createdUser = await user.save();
            return res.status(200).send({
                _id: createdUser._id,
                name: createdUser.name,
                surname: createdUser.surname,
                email: createdUser.email,
                token: generateToken(createdUser)
            });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },
    readUser: async function(req, res) {
        try {
            const userRead = User.findById({ _id: req.body.id });
            return res.status(200).send({
                _id: userRead._id,
                name: userRead.name,
                surname: userRead.surname,
                email: userRead.email,
                token: generateToken(createdUser)
            });
        } catch (error) {
            return res.status(404).send({ message: "User not found." });
        }
    },
    updateUser: async function(req, res) {
        const userID = req.params.id;
        const user = await User.findById(userID);
        if (user) {
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;

            const updatedUser = await user.save();
            return res.status(200).send({
                _id: updatedUser.id,
                name: updatedUser.name,
                surname: updatedUser.surname,
                email: updatedUser.email,
                token: getToken(updatedUser),
            });
        } else {
            return res.status(404).send({ message: "User not found." });
        }
    },
    deleteUser: async function(req, res) {
        const userID = req.params.id;
        const user = await User.findOneAndDelete(userID);

        if (user) {

            return res.status(200).send({
                _id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                token: getToken(updatedUser),
            });
        } else {
            return res.status(404).send({ message: "User not found." });
        }
    },
    searchUser: async function(req, res) {

        const fieldSearch = req.query.fieldSearch;
        if (!fieldSearch) {
            return res.status(404).send({ message: "Enter some value to search" });
        }
        var userId = req.query.userId;
        var queryUsers = {
            $or: [
                { name: { $regex: fieldSearch, $options: "i" } },
                { surname: { $regex: fieldSearch, $options: "i" } },
                { email: { $regex: fieldSearch, $options: "i" } }
            ]
        };

        var queryTeam = { user_id: userId };

        try {
            var readTeam = await Team.find(queryTeam);
        } catch (error) {
            console.log(error);
            return res.status(404).send({ message: "Error searching teams for user selection." });
        }

        try {

            const usersSearch = await User.find(queryUsers);

            const usersResult = [];
            usersSearch.map(user => {

                const find = readTeam[0].collegues.map(col => {
                    if (user._id.equals(col)) {
                        return true
                    }
                });

                if (!find) {
                    usersResult.push({ _id: user._id, name: user.name, surname: user.surname, email: user.email });
                }
            });

            return res.status(200).send(usersResult);
        } catch (error) {
            console.log(error);
            return res.status(404).send({ message: "Users not found." });
        }
    }
}

export default userController;