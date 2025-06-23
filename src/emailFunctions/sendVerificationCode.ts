import {resend} from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmails';
import { ApiResponse } from '@/types/APIresponse';

export async function sendVerifiactionEmail(
    email:string,
    username:string,
    code:string
) : Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'sdfgh',
            to:'sdfghjk',
            subject:'Verication',
            react:VerificationEmail({username , otp:code})
        })
          return { success: true, message: 'Verification email sent successfully.' };
    }
    catch(err){
        console.error('Error sending verification email:', err);
        return { success: false, message: 'Failed to send verification email.' };
    }

    
}

/**
 * import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/VerificationEmails'

export async function sendVerificationEmail(email, username, code) {
  try {
    await resend.emails.send({
      from: 'sdfgh',
      to: 'sdfghjk',
      subject: 'Verification',
      react: VerificationEmail({ username, otp: code }),
    })
    return { success: true, message: 'Verification email sent successfully.' }
  } catch (err) {
    console.error('Error sending verification email:', err)
    return { success: false, message: 'Failed to send verification email.' }
  }
}

 */