'use client'

import React, { useState, useActionState } from "react";
import { Typography } from "../components/Typography/Typography";
import { TextInput } from "../components/Inputs/TextInput/TextInput";
import { PasswordInput } from "../components/Inputs/PasswordInput/PasswordInput";
import { Button } from "../components/Button/Button";
import { login } from "../utils/actions";
import { useRouter } from "next/navigation";


const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (field, e) => {
        if (error) setError('');

        if (field === 'email') {
            setEmail(e.target.value);
        } else if (field === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async () => {

        const response = await login({email, password });
       
        if (response.success) {
            // Redirect to the profile page
            console.log('Authenticated');
            router.push('/');
        } 
        else if (response.error) {
            setError(response.error);
        }
        else {
            setError('An error occurred');
        }

        console.log({response});
    }

    return (
        <div>
            <Typography type='title'>Sign In</Typography>
            <TextInput labelText='Email' placeholder='Enter your email' onChange={(e)=> handleChange('email', e)}/>
            <PasswordInput labelText='Password' placeholder='Enter your password' onChange={(e)=> handleChange('password', e)} />
            <Button type='primary' text='Sign In' onClick={handleSubmit}/>
            {error && <Typography type='error'>{error}</Typography>}
        </div>
    );
};

export default SignInPage;