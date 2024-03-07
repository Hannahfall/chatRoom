const User = require("../model/userModel");
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => { 
    try{
        const {username, password, email} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck) 
            return res.json({msg: "Username already used", status: false})
        const emailCheck = await User.findOne({email});
        if(emailCheck) 
            return res.json({msg: "Email already used", status: false})
        const hashedPsw = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashedPsw
        })
        delete user.password; // ???
        return res.json({user, status: true})
    }catch(err){
        next(err)
    }
 }