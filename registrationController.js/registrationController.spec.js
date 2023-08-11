import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { registerUsers } from './registrationController'

const req = {
    body: {
        full_name: "John Jesso",
        cohort: "17",
        email:"jon@gmail.com",
        password:"12345678"
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}


describe('Register an Employee', ()=>{

    it('should register a new employee successfully', async()=>{
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("kjhgsaiuytwiulkyiyui")

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await registerUsers(req, res)

        expect(mockedInput).toHaveBeenCalledWith('email', mssql.VarChar, 'jon@gmail.com');
        expect(mockedInput).toHaveBeenCalledWith('password', mssql.VarChar, 'kjhgsaiuytwiulkyiyui');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User registered successfully'
        })

        expect(mockedExecute).toHaveBeenCalledWith('registerUsersProc');
        expect(mockedInput).toHaveBeenCalledWith('id', expect.any(String))
    })

    

    it('Fails with error email already exists', async()=>{
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("kjhgsaiuytwiulkyiyui")

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [0]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool)

        await registerUsers(req, res)

        expect (res.json).toHaveBeenCalledWith({
            message: 'Registration failed'
        })
    })
})