
import { Message } from "@/Models/User_model"
export interface ApiResponse{
    success:boolean,
    message:string,
    messages?:Array<Message>
}