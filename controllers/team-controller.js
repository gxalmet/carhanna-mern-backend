import Team from '../models/team.js';
import bcrypt from 'bcryptjs';

import { getToken, generateToken } from '../utils.js';

var teamController = {

    create: async function(req, res) {
        const newTeam = new Team({
            name: req.body.name,
            collegues: req.body.collegues,
            user_id: req.body.user_id
        });
        try {
            const savedTeam = await newTeam.save();
            return res.status(200).send({ team: savedTeam });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: error.message });
        }
    },
    read: async function(req, res) {
        const teamID = req.params.id;
        var query = { user_id: req.params.id };
        try {
            const readTeam = await Team.find(query).populate('collegues');
            return res.status(200).send(readTeam[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: error.message });
        }
    },
    // search: async function(req, res) {
    //     const teamID = req.params.user_id;
    //     var query = { user_id: user_id };
    //     try {
    //         const readTeam = await Team.find(query);
    //         return res.status(200).send({ team: readTeam[0] });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).send({ error: error.message });
    //     }
    // },
    update: async function(req, res) {
        const teamID = req.params.id;

        try {

            const readTeam = await Team.findById(teamID);
            if (readTeam) {
                readTeam.name = req.body.name || readTeam.name;
                readTeam.collegues = req.body.collegues || readTeam.collegues;
                const updateTeam = await readTeam.save();
                return res.status(200).send({ team: updateTeam });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: error.message });
        }
    },
    delete: async function(req, res) {

    },
}

export default teamController;