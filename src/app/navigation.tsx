"use client";

import Link from 'next/link';
import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import './globals.css'

/*
export default function Navbar(){
    return(
        <nav className="display:'inline-block">

            <div style={{justifySelf:"left"}}>
                <Link href="/">🏠 &nbsp;</Link>
            </div>
            <div style={{justifySelf:"center"}}>
                <Link href="/categories">Categories &nbsp;</Link>
                <Link href="/about">About &nbsp;</Link>
                <Link href="/contact">Contact &nbsp;</Link>
            </div>
            <div style={{justifySelf:"right"}}>
                <Link href="/account">🗣️ &nbsp;</Link>
                <Link href="/cart">🛒 &nbsp;</Link>
            </div>
            <hr/>
            <br/>
        </nav>
    );
}
*/

export default function Navbar(){
    const pathname = usePathname();
    const [show, setShow] = useState(true);
    return(
        <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                <Link href="/"><img className="h-8 w-auto" src="/logo.jpg" alt="Your Company" style={{width: "20vw", maxWidth: "45px"}}/></Link> 
                </div>
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    <Link href="/" className={"/"==pathname?"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white":"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"} aria-current="page">🏠</Link>
                    <Link href="/categories" className={"/categories"==pathname?"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white":"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>🗃️</Link>
                    <Link href="/about" className={"/about"==pathname?"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white":"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>ℹ️</Link>
                    <Link href="/contact" className={"/contact"==pathname?"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white":"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>📞</Link>
                </div>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* notification button
                
                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                </button>
                */}
                <Link href="/cart" className={"/cart"==pathname?"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white":"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}>🛒</Link>

                <div className="relative ml-3">
                    
                    <div>
                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setShow((s) => !s)} >
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img className="size-8 rounded-full" src="https://media.tenor.com/UtA_q1IGAQQAAAAM/asian-among.gif" alt="" />
                        </button>
                    </div>
                    
                        <div id="dropdown" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1} style={{ display: show ? "none" : "block" }}>
                            <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</Link>
                            <Link href="/account/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</Link>
                            <Link href="/account/out" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</Link>
                        </div>
      
                </div>
            </div>
            </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
            </div>
        </div>
        </nav>

    );
}
