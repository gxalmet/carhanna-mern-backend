import jwt from 'jsonwebtoken';

function generateToken(user) {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        },
        process.env.JWT_SECRET, {
            expiresIn: '30d'
        }
    );
}

function getToken(user) {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            name: user.surname,
            email: user.email,
        },
        process.env.JWT_SECRET, {
            expiresIn: '48h',
        }
    );
}

function isAuth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).send({ message: 'Token is not supplied.' });
    }
}

function isAdmin(req, res, next) {

    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
}

function projectsTree(projectsList) {
    var projectTree = [];
    projectsList.forEach((project) => {
        var tmp = project;

        if (!project.parentId) {
            projectTree.push(project.toJSON());
        }
    });
    projectTree.forEach(pro => {
        pro = findProjectsChild(pro, projectsList);
        pro.child.forEach(item => { item = findProjectsChild(item, projectsList); })

    });
    return projectTree;
}

function findProjectsChild(project, ProjectSearch) {

    project.child = [];

    ProjectSearch.map(proS => {
        var tmp = proS.parentId;
        var tmp1 = project._id;
        if (tmp1.equals(tmp)) {
            project.child.push(proS.toJSON());
        }
    });

    return project;
}

export { generateToken, getToken, isAuth, isAdmin, projectsTree };