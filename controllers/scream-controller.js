import Scream from '../models/screams.js';
import pkg from 'mongodb';
const { ObjectId } = pkg;

var screamController = {

    create: async function(req, res) {
        const scream = new Scream({
            projectId: req.body.projectId,
            messages: [{ authorUsername: req.body.userId, content: req.body.content, createdAt: new Date(Date.now()) }]
        });

        try {
            const screamCreated = await scream.save();
            return res.status(200).send(screamCreated);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    },
    read: async function(req, res) {

        var projectIdSearch = req.params.id;
        var query = { projectId: projectIdSearch };

        try {
            const screamSearch = await Scream.find(query).populate('messages.authorUsername');

            return res.status(200).send(screamSearch[0]);
        } catch (error) {
            return res.status(404).send({ message: "Scream not found." });
        }
    },
    update: async function(req, res) {

        var screamId = req.params.id;
        var mes = { authorUsername: req.body.userId, content: req.body.content, createdAt: new Date(Date.now()) };
        //var message = { $each: [mes] };
        var querySearch = { "_id": screamId };
        var queryInsert = {
            $push: {
                messages: { $each: [mes] }

            }
        };

        try {

            const screamSaved = await Scream.updateOne(querySearch, queryInsert, { upsert: true });

            const screamUpdate = await Scream.findById(querySearch).populate('messages.authorUsername');

            return res.status(200).send(screamUpdate);

        } catch (error) {

            return res.status(404).send({ message: error.mes });

        }
    },
    delete: async function(req, res) {

    },
}

export default screamController;