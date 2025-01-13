const jwt = require("jsonwebtoken");

// Middleware function to verify a token
function authenticateToken(req, res, next) {
   // Get the token from the Authorization header
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1]; // Bearer token

   if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
   }

   // Verify the token
   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
         return res.status(403).json({ message: "Invalid token." });
      }
      req.user = user; // Attach the user payload to the request object
      next();
   });
}

module.exports = authenticateToken;
