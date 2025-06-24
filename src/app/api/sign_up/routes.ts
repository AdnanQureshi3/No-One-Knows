import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User_model";
import bcrypt from "bcryptjs";
import { sendVerifiactionEmail } from "@/emailFunctions/sendVerificationCode";


export async function POST(req: Request){
    await dbConnect();

    try{
        const {username , email , password} = await req.json();

        const VerifiedUserWithExistingUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(VerifiedUserWithExistingUsername){
            return Response.json({
                success:false,
                message:"Username already taken",

            } , {status:400})
        }
        const UserWithExistingEmail = await UserModel.findOne({email});
        const verifyCode= Math.floor(100000 + Math.random() * 900000).toString();
        if(UserWithExistingEmail){

            if(UserWithExistingEmail?.isVerified){
                
                return Response.json({
                    success:false,
                    message:"Already exist a account with this email",
                } ,{status:400});
            }
            else{
                const hashedPassword = await bcrypt.hash(password , 10);
                UserWithExistingEmail.password = hashedPassword;
                UserWithExistingEmail.verifyCode = verifyCode;
                UserWithExistingEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);
                await UserWithExistingEmail.save();
            }
        }
        
        else{
           
            const hashedPassword = await bcrypt.hash(password , 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const user = await UserModel.create({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isAcceptingMessage:true,
                messages:[],
                
                
            })
            //User ius created now need to send verification email

           const emailResponse = await sendVerifiactionEmail(username , email , verifyCode);
           if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message,
            } , {status:500});

           }
           

           return Response.json({
                success:true,
                message: "User registered successfully. Please verify your email",
            } , {status:201});
        }



    }
    catch(err){
        console.error("Error registering user " , err);
        return Response.json({
            success:true,
            message:"Error registering user "
        },{
            status:500
        })
    }
}

/**
 * 
 * import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User_model";
import bcrypt from "bcryptjs";
import { sendVerifiactionEmail } from "@/emailFunctions/sendVerificationCode";

export async function POST(req) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    const VerifiedUserWithExistingUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (VerifiedUserWithExistingUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 400 }
      );
    }

    const UserWithExistingEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (UserWithExistingEmail) {
      if (UserWithExistingEmail?.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Already exists an account with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        UserWithExistingEmail.password = hashedPassword;
        UserWithExistingEmail.verifyCode = verifyCode;
        UserWithExistingEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);
        await UserWithExistingEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const user = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
      });

      const emailResponse = await sendVerifiactionEmail(username, email, verifyCode);
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "User registered successfully. Please verify your email",
        },
        { status: 201 }
      );
    }
  } catch (err) {
    console.error("Error registering user", err);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}

 */