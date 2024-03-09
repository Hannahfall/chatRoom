const User = require("../model/userModel");
const bcrypt = require("bcrypt") // 密码加密

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
        delete user.password; // 
        return res.json({user, status: true})
    }catch(err){
        next(err)
    }
 }

 module.exports.login = async(req, res, next) => { 
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPswValid = await bcrypt.compare(password, user.password);
        if(!user || !isPswValid) 
            return res.json({msg:"Invalid username or password", status: false});
        delete user.password;
        return res.json({user, status: true});
    }catch(err){
        next(err)
    }
 }

 module.exports.setAvatar = async(req, res, next) => { 
    try{
        const id = req.params.id;
        const avatarImage = req.body.image;
        const user = await User.findByIdAndUpdate(
            id, // userId 和 _id都可以，就是不能用id？？？
            {avatarImage, isAvatarImageSet: true }
        );
        return res.json({
            isSet: user.isAvatarImageSet,
            image: user.avatarImage
        })
    }catch(ex){
        next(ex)
    }
 }

 module.exports.getUsers = async(req, res, next) => { 
    try{
        const allUsers = await User.find({_id: {$ne: req.params.id }}).select([
            "username",
            "email",
            "avatarImage",
            "_id"
        ])
        return res.json(allUsers);
    }catch(ex){
        next(ex)
    }
 }