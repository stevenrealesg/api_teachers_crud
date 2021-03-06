const Course = require('../models/Course')
const Score = require('../models/Score')

exports.addCourse = async (req, res) => {
    try {
        const { code, name, teacher } = req.body
        const course = new Course({ code, name, teacher });
        await course.save();
        res.status(200).json({message: "Course saved."});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error when saving course data."});
    }
}

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher')
        res.status(200).json({data: courses})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error when obtaining courses."});
    }
}

exports.getCourseByStudent = async (req, res) => {
    try {
        const { id } = req.params
        const courses = await Score.find({student: id}, {course:1})
                        .populate('course')
                        .populate({
                            path: 'course',
                            populate: 'teacher'
                        })
        res.status(200).json({data: courses})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error when obtaining courses."});
    }
}

exports.getStudentsByCourse = async (req, res) => {
    try {
        const { id } = req.params
        const course = await Course.findById(id).populate('teacher')
        const students = await Score.find({course: id}, {student:1}).populate('student')
        res.status(200).json({data: {course, students}})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error when obtaining students."});
    }
}