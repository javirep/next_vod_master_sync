import { NextResponse } from 'next/server';


export const GET = async ( ) => {
    try{ 
        const response = await fetch("https://prd-freq.frequency.com/api/2.1/auth/login", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "account_name": process.env.NEXT_FREQ_ACCOUNT_NAME,    
                "email": process.env.NEXT_FREQ_EMAIL,    
                "password": process.env.NEXT_FREQ_PASSWORD
            })
        });
        
        return response;
        
    } catch (error) {
      console.log(error);
      return NextResponse.json({
                success: false,
                error: error
            }, {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store',
                }
        })
    }
}