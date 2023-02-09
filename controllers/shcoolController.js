const { User, School } = require('../models/model');

const schoolController = {



    addSchool: async (req, res) => {

        try {
            const newSchool = new School(req.body)
            const savedSchool = await newSchool.save()
            return res.status(200).json(savedSchool)
        } catch (error) {
            return res.status(500).json({ error })
        }

    },

    getAllSchools: async (req, res) => {
        try {
            const allSchools = await School.find()
            return res.status(200).json(allSchools)
        } catch (error) {
            return res.status(500).json({ error })
        }
    },

    getSchool: async (req, res) => {
        try {
            const school = await School.findById(req.params.id)
            return res.status(200).json(school)
        } catch (error) {
            return res.status(500).json({ error })
        }
    },

    updateSchool: async (req, res) => {

        try {
            const school = await School.findById(req.params.id)
            await school.updateOne({ $set: req.body })
            return res.status(200).json({ msg: "Updated Successfully", data: school })
        } catch (error) {
            return res.status(500).json({ error })
        }

    },

    deleteSchool: async (req, res) => {
        try {
            await User.updateMany({ school: req.params.id }, { school: null })
            await School.findByIdAndDelete(req.params.id)
            return res.status(200).json({ msg: "Deleted Successfully" })
        } catch (error) {
            return res.status(500).json({ error })
        }

    }
}


module.exports = schoolController