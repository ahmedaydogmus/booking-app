import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req,res,next) => {
    try{


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });

        await newUser.save();
        res.status(200).json(newUser)

    }catch(err) {
        next(err);
    }
}

export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user) return next('User not found');

        const isPasswordCorect = await bcrypt.compare(req.body.password, user.password) 
        if(!isPasswordCorect) return next('User not found');

        res.status(200).json(user)
    }catch(err) {
        next(err);
    }
}
