const { people } = require("../data");
const {
    getPeople,
    getPerson,
    postPerson,
    updatePerson,
    deletePerson,
    searchPeople,
} = require("../utils/peopleUtils");

const getPeopleController = (req, res) => {
    const peopleNoId = getPeople();

    if (!peopleNoId) {
        return res.status(200).json({ msg: "No people found" });
    }

    const response = {
        success: true,
        data: peopleNoId,
    };
    return res.status(200).json(response);
};
const getPersonController = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ msg: "Please provide id value" });
    }

    const person = getPerson(id);

    if (!person) {
        return res.status(404).json({ msg: `No one has id ${id}` });
    }

    const response = {
        success: true,
        data: person,
    };
    return res.status(200).json(response);
};
const postPersonController = (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).json("Please provide name value");
    }

    const newPeople = postPerson(name);
    const response = {
        success: true,
        data: newPeople,
    };
    return res.status(201).json(response);
};
const updatePersonController = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    if (!id) {
        return res.status(400).json("please provide id value");
    }

    if (!name) {
        return res.status(400).json("please provide name value");
    }

    const newPeople = updatePerson(id, name);

    const response = {
        success: true,
        data: newPeople,
    };
    return res.status(200).json(response);
};
const deletePersonController = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ msg: "please provide id value" });
    }

    const newPeople = deletePerson(id);
    const response = {
        success: true,
        data: newPeople,
    };
    return res.status(200).json(response);
};
const queryPeopleController = (req, res) => {
    let { keyword, limit } = req.query;
    let newPeople = [];
    if (!keyword) {
        newPeople = getPeople();
    } else {
        if (!limit) {
            limit = people.length;
        }
        newPeople = searchPeople(keyword, limit);
    }
    const response = {
        success: true,
        data: newPeople,
    };
    return res.status(200).json(response);
};

module.exports = {
    getPeopleController,
    getPersonController,
    postPersonController,
    updatePersonController,
    deletePersonController,
    queryPeopleController,
};
