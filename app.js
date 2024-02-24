import { config } from "dotenv";
import bcrypt from "bcrypt"
import cors from'cors'
import {addNewUser,findUser,getallUsers,removeUser} from './db.js'
config()
let PORT=process.env._PORT
import express from 'express'
const app=express()
app.use(express.json())
app.use(cors())
app.listen(PORT,()=>{
    console.log("server connected sucessfully on port :"+ PORT)
})
let users=[]
// let newUsers=[]
app.get('/get/users',async (req,res)=>{
    let findings=await getallUsers();
    res.send(findings)

    

})
app.post('/register',async (req,res)=>{
    try {
        //find user
        let findings=await getallUsers();
        users=[...findings]
        const {email,password,username}=req.body
        const findUser=users.find((data)=>email==data.email)
        // const findUser=await findStudent(_email)
        if(findUser){
            res.status(400).send("wrong user or password!!")
        }else{
            const hashPassword=await bcrypt.hash(password,10)
            await addNewUser({email,password:hashPassword,username});
            // res.send("new student added successfully")
            // users.push({email,password:hashPassword})
            res.status(201).send("registered successfully")
        }
    } catch (error) {
        res.status(500).send({message:error.message})
    } 
})

    app.post('/login',async(req,res)=>{
       try {
        let findings=await getallUsers();
        users=[...findings]
        const {email,password}=req.body
        const findUser=users.find((data)=>email==data.email)
        // const findUser=await findStudent(email)
        if(!findUser){
            res.status(500).send("wrong email or password!!!")
        }else{
            const passwordMatch=await bcrypt.compare(password,findUser.password)
            if(passwordMatch){
                res.status(200).send("logged successfully")
            }else{
                res.status(500).send("wrong email or password!!!")
            }
        }
       } catch (error) {
        res.status(400).send({message:error.message})
       }
})
app.delete('/remove',async(req,res)=>{
    // res.send("remove")
    const passInput=req.query.password
    // console.log(passInput)
    const removeUs=await removeUser(passInput)
    res.send("user removed")
})


