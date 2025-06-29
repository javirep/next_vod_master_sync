'use client'
import React from "react";
import swerveLogo from '../../assets/images/SwerveLogo.png'
import { useNavigate } from 'react-router-dom'
import Image from 'next/image';

import './Navbar.scss'
import Typography from "../Typography/Typography";
import { Button } from "../Button/Button";
//import { logout } from "@/app/utils/actions";
import { useRouter } from 'next/navigation';

type NavLinkType = {
    name: string;
    route: string;
}

export default function NavBar() {

    const router = useRouter();

    const navLinks = [
        { name: 'Generate CSV', route: '/generateTemplate' },
        { name: 'EPG', route: '/EPG' },
    ] as NavLinkType[];

    const handleLogout = () => {
        //logout()
        //router.push('/login')
    }

  return <div className="navbar-container">
        
        <Image src={swerveLogo} alt="Swerve Logo" className='navbar-logo' />
        <div className="navbar-links">
            {navLinks.map((link, index) => {
                return <div className='navbar-link' onClick={() =>router.push(link.route)} key={index}>
                    <Typography type='navLink'>{link.name}</Typography>
                </div>
            })}
        </div>

        {/* <Button type='secondary' className='navbar-logout' text='Log Out' onClick={handleLogout} /> */}
  </div>;
}