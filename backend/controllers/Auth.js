const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "12RJKRGIKUEJ09E21JP;W239R";

/**
 * Logs in a user.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Responds with user information or error.
 */
const Login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await Auth.findOne({ email });
      console.log("user", user);
      if (!user) {
         return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = await generateToken(user);

      const userInformation = {
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         token,
      };

      res.status(200).json({ status: "Success", user: userInformation });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
   }
};

/**
 * Registers a new user.
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.firstName - The first name of the user.
 * @param {string} req.body.lastName - The last name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Responds with user information or error.
 */

const Register = async (req, res) => {
   console.log(req.body);
   try {
      const { firstName, lastName, email, password } = req.body;

      const userExists = await Auth.findOne({ email });

      if (userExists) {
         return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Auth({
         firstName,
         lastName,
         email,
         password: hashedPassword,
      });

      newUser.save();

      const token = await generateToken(newUser);

      const userInformation = {
         firstName: newUser.firstName,
         lastName: newUser.lastName,
         email: newUser.email,
         token,
      };

      res.status(201).json({ status: "Success", user: userInformation });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
   }
};

const generateToken = async (loggedUser) => {
   let token = "";

   token = await jwt.sign({ id: loggedUser._id, email: loggedUser.email }, SECRET_KEY, token, {
      expiresIn: "45h",
   });

   return token;
};

module.exports = { Login, Register };
