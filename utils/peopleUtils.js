const { people, products } = require("../data");

const getPeople = () => {
    const peopleNoId = people.map((person) => {
        const { name } = person;
        return { name };
    });
    return peopleNoId;
};

const getPerson = (id) => {
    const person = people.find((person) => person.id === Number(id));
    return person;
};
const postPerson = (name) => {
    const person = {
        name,
    };
    const newPeople = [...people, person];
    return newPeople;
};
const updatePerson = (id, name) => {
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });

    return newPeople;
};
const deletePerson = (id) => {
    const newPeople = people.filter((person) => person.id !== Number(id));
    return newPeople;
};
const searchPeople = (keyword, limit) => {
    let newPeople = people.filter((person) => person.name.startsWith(keyword));
    newPeople = newPeople.slice(0, Number(limit));
    return newPeople;
};

module.exports = {
    getPeople,
    getPerson,
    postPerson,
    updatePerson,
    deletePerson,
    searchPeople,
};
