const userModel = require("../Models/userModel")
const validator = require("../util/validator")
const jwt = require("jsonwebtoken");

const { isValid, isValid1, isValid2, isValid3, isValid4, isValid5, isValid6 } = validator

const createUser = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length != 0) {

            const { title, name, phone, email, password, address } = data

            if (!isValid(title)) {
                return res.status(400).send({ status: false, msg: "Please fill the required field Title!" })  //required filled can't be blank
            }
            if (!isValid(name)) {
                return res.status(400).send({ status: false, msg: "Please enter the required field Name" })
            }
            if (!isValid(phone)) {
                return res.status(400).send({ status: false, msg: "Please enter the required field Phone" })
            }
            if (!isValid(email)) {
                return res.status(400).send({ status: false, msg: "Please enter the required field email" })
            }
            if (!isValid(password)) {
                return res.status(400).send({ status: false, msg: "Please enter the required field password" })
            }
            if (!isValid(address)) {
                return res.status(400).send({ status: false, msg: "Please enter the required field Address" })
            }
            //title validation
            if (!isValid1(title)) {
                return res.status(400).send({ status: false, msg: "Title should be in between ['Mr', 'Mrs', 'Miss']" })
            }
            //Name validation
            if (!isValid2(name)) {
                return res.status(400).send({ status: false, msg: "Name must be alphabetical and min length 2." })
            }
            //phone validation
            if (!isValid3(phone)) {
                return res.status(400).send({ status: false, msg: "Phone Number must be 10 digit" })
            }
            // Email Validation
            if (!isValid4(email)) {
                return res.status(400).send({ status: false, msg: "Please provide valid email" })
            }
            // Password Validation
            if (!isValid5(password)) {
                return res.status(400).send({ status: false, msg: "Your password must contain atleast one number,uppercase,lowercase and special character[ @ $ ! % * ? & ] and length should be min of 8-15 charachaters" })
            }
            if (!isValid6(address.pincode)) {
                return res.status(400).send({ status: false, message: "Pincode must be of 6 digits." })
            }
            // Unique Email
            const usedEmail = await userModel.findOne({ email: email })
            if (usedEmail) {
                return res.status(400).send({ status: false, msg: "Email Id already exists." })
            }
            //checking for duplicate phone
            const duplicatePhone = await userModel.findOne({ phone })
            if (duplicatePhone) {
                return res.status(400).send({ status: false, message: "Phone number already exists. Please use another phone number" })
            }
            const savedData = await userModel.create(data);
            return res.status(201).send({ status: true, data: savedData });
        }
        else {
            return res.status(400).send({ status: false, msg: "NO USER INPUT" })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, msg: err.message });
    }
}

const loginUser = async function (req, res) {
    try {

        let userId = req.body.email;
        let password = req.body.password;

        if (!userId) return res.status(400).send({ status: false, msg: "email is required." })
        if (!password) return res.status(400).send({ status: false, msg: "Password is required." })

        let getUser = await userModel.findOne({ email: userId })
        if (!getUser) return res.status(404).send({ status: false, msg: "user not found!" })

        const providedPassword = getUser.password
        if (password != providedPassword) return res.status(401).send({ status: false, msg: "Password is incorrect." })

        //To create token
        let token = jwt.sign({
            userId: getUser._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 20*60*60
        }, "AJpnAsrc@p3");

        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, msg: "User login sucessful", data: { token } })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
module.exports.createUser = createUser
module.exports.loginUser = loginUser