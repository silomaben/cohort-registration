const {v4} = require('uuid');
const mssql = require ('mssql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const { createUsersTable } = require('../database/tables/createTables');
const { sqlConfig } = require('../config/config');


const registerUsers = async (req,res) =>{
    try {
        

        const id = v4();
        // console.log("why now");
        
        const {full_name,cohort,email,password} = req.body

        createUsersTable()

        // const {error} = registerSchema.validate(req.body)
        // if(error){
        //     return res.status(422).json(error.details)
        // }

        // console.log(full_name);

        const hashedPwd = await bcrypt.hash(password, 5);

        const pool = await mssql.connect(sqlConfig);

        
        const result = await pool.request()
        .input('id',id)
        .input('full_name',mssql.VarChar,full_name)
        .input('cohort',mssql.VarChar,cohort)
        .input('email',mssql.VarChar,email)
        .input('password',mssql.VarChar,hashedPwd)
        .execute('registerUsersProc');

       

        console.log(result);

        if(result.rowsAffected == 1){
            
            return res.status(200).json({ message: "User registered successfully"})
        }else{
            return res.status(200).json({ message: "Registration failed"})
        }

    } catch (error) {
        return res.json({Error:error.message})
    }
}


module.exports = {
    registerUsers
}