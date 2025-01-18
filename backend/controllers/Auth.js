const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
         plan: user.plan,
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
         plan: newUser.plan,
         token,
      };

      res.status(201).json({ status: "Success", user: userInformation });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
   }
};

const checkVerified = async (req, res) => {
   try {
      const { id } = req.user;

      const user = await Auth.findById(id);

      console.log("verified", user.isVerified);

      return res.status(200).json({
         verified: user?.isVerified,
      });
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }
};

const verifyUserId = (req, res) => {
   try {
      const user = req.user;

      if (!user) {
         return res.status(401).json({ message: "User not authenticated" });
      }

      return res.status(200).json({ message: "User authenticated" });
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

const sendLink = async (req, res) => {
   console.log(req.user);
   try {
      const { email } = req.user;
      const verificationLink = `${process.env.FRONTEND_URL}me/dashboard?isVerification=true`;

      const mailOptions = {
         from: "johnossai20@gmail.com",
         to: email,
         subject: "Verify Your Email Address",
         html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h1 style="color: #000; text-align: center;">Welcome to Markely!</h1>
          
          <p>Hi ${email},</p>
          
          <p>Thank you for registering with Markely. To complete your registration and verify your email address, please click the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #000; 
                      color: #fff; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; margin-top: 30px;">This verification link will expire in 24 hours.</p>
          
          <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
          <p style="color: #666; word-break: break-all;">${verificationLink}</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              If you didn't create an account with Markely, please ignore this email.
            </p>
          </div>
        </div>
      `,
      };

      const info = await nodemailerTransport.sendMail(mailOptions);
      console.log("Verification email sent:", info.messageId);
      return info;
   } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
   }
};

const verifyUser = async (req, res) => {
   const { id } = req.user;
   try {
      const updateUser = await Auth.findByIdAndUpdate(id, { isVerified: true }, { new: true });

      res.status(200).json({
         message: "Verified",
      });
   } catch (error) {
      throw error;
   }
};

module.exports = { Login, Register, verifyUserId, checkVerified, sendLink, verifyUser };

const nodemailerTransport = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "johnossai20@gmail.com",
      pass: "ofew fxla bsua kzxo",
   },
});
