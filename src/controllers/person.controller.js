const Person = require('../models/Person')
const bcrypt = require("bcrypt")

exports.addPerson = async (req, res) => {
    try {
        const { ID, name, lastName, dateBirth, type, user, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(password, salt);
        console.log(passwordEncrypted)
        const person = new Person({ ID, name, lastName, dateBirth, type, user, password: passwordEncrypted });
        await person.save();

        res.status(200).json({message: "Person saved."});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error when saving person data."});
    }
}

exports.getPersons = async (req, res) => {
    try {
        const { type } = req.params
        const students = type && type == "all" ? await Person.find() : await Person.find({type})
        res.status(200).json({data: students})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error when obtaining students."});
    }
}