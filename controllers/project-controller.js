import Project from '../models/project.js';
import bcrypt from 'bcryptjs';

import { getToken, generateToken, projectsTree } from '../utils.js';
import pkg from 'mongodb';
const { ObjectId } = pkg;

var projectController = {

    create: async function(req, res) {
        const project = new Project({
            //parentId: req.body.parentID ? req.body.parentID : new ObjectId(null),
            parentId: req.body.parentId,
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
            level: req.body.level,
            begin_date: req.body.begin_date,
            end_date: req.body.end_date,
            status: req.body.status,
            team: req.body.team
        });

        try {
            const createdProject = await project.save();

            return res.status(200).send({
                parentId: createdProject.parentID,
                name: createdProject.name,
                description: createdProject.description,
                user_id: createdProject.userID,
                level: createdProject.level,
                begin_date: createdProject.begin_date,
                end_date: createdProject.end_date,
                status: createdProject.status,
                team: createdProject.team
            });
        } catch (error) {

            return res.status(500).send({ message: error.message });
        }
    },
    read: async function(req, res) {

        try {
            const projectRead = await Project.findById({ _id: req.params.id });
            projectRead.populate("team");
            projectRead.populate("parentId");
            return res.status(200).send(projectRead);
        } catch (error) {
            return res.status(404).send({ message: "Project not found." });
        }
    },
    search: async function(req, res) {

        var tree = JSON.parse(req.query.tree);
        var user = req.query.user_id;

        var query = { team: user };

        try {
            const projectsSearch = await Project.find(query);

            var projectsResult = [];
            if (tree === true) {
                projectsResult = projectsTree(projectsSearch);
            } else {
                projectsResult = projectsSearch;
            }

            return res.status(200).send(projectsResult);
        } catch (error) {
            return res.status(404).send({ message: "Project not found." });
        }
    },
    update: async function(req, res) {

        const projectID = req.params.id;


        const project = await Project.findById({ _id: projectID });

        if (project) {
            project.parentId = req.body.parentID || project.parentId;
            project.name = req.body.name || project.name;
            project.description = req.body.description || project.description;
            project.user_id = req.body.userID || project.user_id;
            project.level = req.body.level || project.level;
            project.begin_date = req.body.begin_date || project.begin_date;
            project.end_date = req.body.end_date || project.end_date;
            project.status = req.body.status || project.status;
            project.team = req.body.team || project.team;

            const updatedProject = await project.save();
            return res.status(200).send({ projectUpdated: updatedProject });
        } else {
            return res.status(404).send({ message: "Project not found." });
        }
    },
    delete: async function(req, res) {
        const projectID = req.params.id;
        const project = await Project.findOneAndDelete(projectID);

        if (project) {

            return res.status(200).send({ projectDeleted: project });
        } else {
            return res.status(404).send({ message: "Project not found." });
        }
    }
}

export default projectController;