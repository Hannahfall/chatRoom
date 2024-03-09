const MessageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => { 
    try{
        const{message, from, to} = req.body;
        const data = await MessageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from
        });
        if(data){
            res.json("Send message successfully!")
        }else{
            res.json("Fail to save message to database!")
        }
    }catch(err){
        next(err)
    }
 }
  
module.exports.getAllMessage = async (req, res, next) => { 
    try{
        const {from, to} = req.body;
        const data = await MessageModel.find({
            users:{ $all : [from, to]}
        }).sort({
            updatedAt: 1
        });
        const msgs = data.map((msg) => { 
            return{
                fromSelf: msg.sender.toString() === from,
                msg: msg.message.text,
            }
         });
        res.json(msgs); 
    }catch(err){
        next(err)
    }
 }