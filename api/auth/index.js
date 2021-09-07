import { verify } from "jsonwebtoken";
import { findOne } from "../models/Users";

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(403);
    }
    verify(token, "mi-secreto", (err, decoded) => {
        const { _id } = decoded;
        findOne({ _id })
            .exec()
            .then((user) => {
                req.user = user;
                next();
            });
    });
};

const hasRoles = roles => (req, res, next) => {
    if (roles.indexOf(req.user.role > -1)) {
        return next();
    }
    return res.sendStatus(403);
};

module.exports = {
    isAuthenticated,
    hasRoles,
};
