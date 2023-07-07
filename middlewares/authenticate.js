const jwt = require("jsonwebtoken");

const {HttpError}  = require("../helpers");
const {User} = require("../models/user");

const  {SECRET_KEY} = process.env;


const authenticate = async(req, res, next) => {
 const {authorization = ""} = req.headers; //  Get authorization header TOKEN
 const [bearer, token] = authorization.split(" ");

 if (bearer !== "Bearer") {
    next (HttpError(401),"Not authorized");
 }

  //  Validation Check TOKEN
 try {
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
         next (HttpError(401), "Not authorized");
        }
        req.user = user; //  Add user ID to session list - req
        next(); //  Allow admission
 } catch {
    next (HttpError(401), "Not authorized");
 };
}


module.exports = authenticate;
