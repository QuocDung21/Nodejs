const { User, School } = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = {


    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUSer = new User({
                ...req.body,
                password: hashed
            })

            const savedUser = await newUSer.save();

            if (req.body.school) {
                const school = await School.findById(req.body.school);
                await school.updateOne({
                    $push: { users: savedUser._id }
                })
            }

            return res.status(201).json(savedUser)

        } catch (error) {
            return res.status(500).json({ error })
        }

    },

    generateAccessToken: (user) => {
        return jwt.sign({
            "user": user.id,
            "isAdmin": user.isAdmin
        },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "30d",

            }
        )
    }
    ,
    generateRefreshToken: (user) => {
        return jwt.sign({
            "user": user.id,
            "isAdmin": user.isAdmin
        },
            process.env.REFRESH_TOKEN_KEY,
            {
                expiresIn: "365d",

            }
        )
    }
    ,

    requestRefreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ error: "You're are not authenticated" })
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
                if (err) {
                    console.log(err)
                }
                const newAccessToken = userController.generateAccessToken(user)
                const newRefreshToken = userController.generateRefreshToken(user)
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                return res.status(200).json({ accessToken: newAccessToken })
            })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    ,
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                return res.status(404).json("wrong username")
            }
            const validPasswod = await bcrypt.compare(req.body.password, user.password)
            if (!validPasswod) {
                return res.status(404).json("wrong password")
            }
            if (user, validPasswod) {
                const accessToken = await userController.generateAccessToken(user)
                const refreshToken = await userController.generateRefreshToken(user)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken })
            }
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    getAllUser: async (req, res, next) => {
        try {
            const users = await User.find();
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }


}


module.exports = userController