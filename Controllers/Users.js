const users = require("../Models/Users.js");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const saltRounds = 10;

class UserController {

    async login(req, res) {
        let { email, password } = req.body;
        try {
            const user = await users.findOne({ email })
            if (!user) return res.send({ok:false,message:"User does not exist."});
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.send({ok:false,message:"Incorrect Password."});
            const token = jsonwebtoken.sign(user.toJSON(), 'secret', { expiresIn: 7200 })
            let admin = user.admin
            res.send({token,admin,ok:true});
        }
        catch (e) {
            res.send({ e })
        }
    }



    async verifyToken(req, res) {
        try {
            const { token } = req.params
            const decoded = jsonwebtoken.verify(token, 'secret')
            const admin = decoded.admin
            res.send({ ok:true, admin : admin })
        } catch (error) {
            res.send({ ok: false, error })
        }
    }

    async add(req, res) {
        
        let { email, name, lastname, adress, cp, city, province, state, password, passwordConfirm } = req.body;
        try {
            let dataCheck = Object.values(req.body);
            let dataCount = 0;
            dataCheck.forEach(element => {
                element===""? dataCount++:null
            });
            if (dataCount>0) return res.send({ok:false, message: "All fields must be filled."})
            const usercheck = await users.findOne({ email })
            if (usercheck) return res.send({ok:false, message: "User already exists."})
            if (password != passwordConfirm) return res.send({ok:false, message:"Passwords dont match."});
            const hash = await bcrypt.hash(password, saltRounds)
            const user = await users.create({
                email,
                name,
                lastname,
                adress,
                cp,
                city,
                province,
                state,
                wishlist: [],
                orderHistory: [],
                password: hash,
                admin: false
            });
            const token = jsonwebtoken.sign(user.toJSON(), 'secret', { expiresIn: 7200 })
            res.send({user, message:"User successfully added.", ok: true, token});
            
        }
        catch (e) {
            res.send({ ok:false, message:"Opps something wrong," });
            ;
        }
    }

    async update(req, res) {
        let { _id, name, lastname, adress, postalcode, city, province, state, password } = req.body;
        try {
            const updatedUser = await users.update({ _id }, {
                $set: {
                    name,
                    lastname,
                    adress,
                    postalcode,
                    city,
                    province,
                    state,
                    wishlist,
                    password
                }
            }
            );
            res.send(updatedUser);
        }
        catch (e) {
            res.send({ e })
        }
    }

    async wishlist(req, res) {
        let { _id } = req.body;
        try {
            const user = await users.findOne({ _id });
            res.send( user.wishList);
        }
        catch (e) {
            res.send({ e })
        }
    }

    async wishlist(req, res) {
        let { _id } = req.body;
        try {
            const user = await users.findOne({ _id });
            res.send(user.wishList);
        }
        catch (e) {
            res.send({ e })
        }
    }

    async removeWish(req, res) {
        let userId = req.body.userId;
        let productId = req.body.productId;
        try {
            let updatedWishList = await users.findByIdAndUpdate(userId, { $pull: { wishlist: productId } })
            res.send(updatedWishList);
        }
        catch (e) {
            res.send({ e })
        }
    }

    async addWish(req, res) {
       
        let userId = req.body.userId;
        let productId = req.body.productId;
        const decoded = jsonwebtoken.verify(userId, 'secret')  
        try {
            let prueba = await users.findByIdAndUpdate(decoded._id, { $addToSet: { wishlist: productId } })
            res.send({message :"Added correctly to your wishlist."});
        }
        catch (e) {
            res.send({ e })
        }
    }
}
module.exports = new UserController;

