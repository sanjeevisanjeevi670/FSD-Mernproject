const Users=require('../models/studentModel')
// const bcrypt =require("bcrypt");

// const loginUser=async(req,res)=>{
//     try{
//         const{email,password}=req.body;
//         const user=await Users.findOne({email:email})
        
//         if(!user){
//             return res.status(404).send({msg:"user not found"})
//             }else if(user.password == password){
//                 return res.status(200).send({msg:"login successful",user})
//             } else{
//                 return res.status(404).send ({msg:"invalid credentials"})
//             }
//         }
//     catch(err){
//         console.log(err)
//         res.status(500).send({msg:'internal server error'})
//     }
    
// }
const getUsers=async(req,res)=>{
    const user=await  Users.find()
    res.send({user})
}
const updateUser=async(req,res)=>{
    const id=req.params.id;
    let user= await Users.findByIdAndUpdate(id,req.body,{new:true})
    res.send({user})
}
const deleteUser=async(req,res)=>{

    const name=req.params.name;
    let user= await Users.findOneAndDelete({name: name})
    res.send({user})
}


const registerUser =async(req,res)=>{
    try{
        const{name,age,email,password}=req.body;
        // const hashedpassword=await bcrypt.hash(password,10)
        const user =await Users.findOne({email:email})
        if(user){
           return res.status(200).json({msg:"user found",user})
        }
        
            const details=await Users.create({name,
                age,
                email,
                password
            })
            res.json({details})
        
    }
    catch(err){
        console.log(err)
        res.status(500).send({msg:'internal server error'})
    }
}
// module.exports={registerUser}
module.exports={registerUser,getUsers,updateUser,deleteUser}



// const loginUser=async(req,res)=>{
//     try{
//         const{email,password}=req.body;
//         const user=await Users.findOne({email:email})
        
//         if(!user){
//             return res.status(404).send({msg:"user not found"})
//             }
//             const verify =await bcrypt.compare(password,user.password)
//             if(verify){
//                 return res.status(200).send({msg:"login successful",user})
//             } else{
//                 return res.status(404).send ({msg:"invalid credentials"})
//             }
//         }
//     catch(err){
//         console.log(err)
//         res.status(500).send({msg:'internal server error'})
//     }
    
// }
// module.exports={loginUser}
