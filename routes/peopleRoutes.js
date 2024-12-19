const express = require("express");
const {
    getPeopleController,
    getPersonController,
    postPersonController,
    updatePersonController,
    deletePersonController,
    queryPeopleController,
} = require("../controllers/peopleController");

const peopleRouter = express.Router();

peopleRouter.get("/", getPeopleController);
peopleRouter.get("/search", queryPeopleController);
peopleRouter.post("/add", postPersonController);
peopleRouter.get("/:id", getPersonController);
peopleRouter.put("/:id/update", updatePersonController);
peopleRouter.delete("/:id/delete", deletePersonController);

module.exports = {
    peopleRouter,
};
