import  {z} from 'zod'

export const userNameValidation = z.string()
.min(3, "Username must be at least 3 characters")
.max(20, "Username must not be at more than 20 characters")
.regex(/^[a-zA-Z0-9_]+$/ ,"UserName must not cantains specail characters" ) 

export const signUpSchema = z.object({
    username:userNameValidation,
    email:z.string().email({message:'Invalid email address'}),
    password:z.string().min(6, {message:'Password must be atleast 6 chars'})

})
/*

const { z } = require('zod');
const userNameValidation = z.string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 chars' })
});

module.exports = { signUpSchema };

*/