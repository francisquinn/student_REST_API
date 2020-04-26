const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// GET STUDENT
router.get('/student', function(req, res, next){
    Student.find({}).then(function(students){
        res.send(students);
    });
});

// POST STUDENT
router.post('/student', function(req, res, next){
    Student.create(req.body).then(function(student){
        res.send(student);
    }).catch(next);
    
});

// GET TEACHER
router.get('/teacher', function(req, res, next){
    Teacher.find({}).then(function(teachers){
        res.send(teachers);
    });
});

// Register TEACHER

router.post('/register', async (req, res) => {

   // validate before create
   const {error} = registerValidation(req.body);
   //res.send(error.details[0].message);

   if(error){
       return res.status(400).send(error.details[0].message);
   } 
   
   // check if email exist
   const emailExist = await Teacher.findOne({email: req.body.email})
   if (emailExist){
       return res.status(400).send('"email" already exist');
   }

   // hash password
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password, salt);
   
   // create a new teacher
    const teacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try{
        const savedTeacher = await teacher.save();
        res.send({teacher: teacher._id}); 
    } catch(err){
        res.status(400).send(err);
    }

});

// login
router.post('/login', async (req, res) => {
    // validate befoe create
    const {error} = loginValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    } 

   // check if email exist
   const teacher = await Teacher.findOne({email: req.body.email})
   if (!teacher){
       return res.status(400).send('Email or Password incorrect');
   }

   // check if password is incorrect
   const validPass = await bcrypt.compare(req.body.password, teacher.password);
   if (!validPass) {
       return res.status(400).send('Email or Password incorrect');
   }

   // create and assign token
   const token = jwt.sign({_id: teacher._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
  
})

/*
router.post('/register', async (req, res) => {
     // validate befoe create
     const validation = joiSchema.validate(req.body);
     res.send(validation);
})
*/


module.exports = router;

