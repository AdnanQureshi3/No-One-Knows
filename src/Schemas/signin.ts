import {z} from 'zod'

export const signInSchema = z.object({
    indetifier:z.string(),
    password:z.string()
   
})