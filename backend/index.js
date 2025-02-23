const express= require('express');
const mongoose = require('mongoose');
const app = express();
const resturant= require('./models/restuarants.model');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb+srv://shubhamkumarreincarnate:fapjFnkWFCwuLjGT@backenddb.k1fqc.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB').then(()=>{console.log('Connected to database')})
.catch((err)=>{console.log(err)});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/register',async(req,res)=>{
    try{
        const newResturant = new resturant({
            name:req.body.name,
            address:req.body.address,
            pincode:req.body.pincode,
            phone:req.body.phone,
            email:req.body.email,
            allows:req.body.allows
        });
        await newResturant.save();
        res.status(200).json({message:'Resturant registered successfully'});
    }catch(err){
        res.send(err);
    }
})

app.get('/resturants',async(req,res)=>{
    try{
        const resturants = await resturant.find();
        res.status(200).json({message:'Resturants fetched successfully',data:resturants});
    }
    catch(err){
        res.send(err);
    }
})

app.delete('/res_remove',async(req,res)=>{
    try{
        console.log(req.body);
        resId=req.body._id;
        const resturants = await resturant.deleteOne({"_id":resId});//pass as JSON object
        console.log("Check: ",resturants);
        if(resturants.deletedCount==0){// check with deleted count sent by restuarnts
            return res.status(404).json({message:'Resturant not found'});
        }
        else{
             res.status(200).json({message:'Resturant removed successfully',data:resturants});
        }}catch(err){
        res.send(err);
        }
       
    })


