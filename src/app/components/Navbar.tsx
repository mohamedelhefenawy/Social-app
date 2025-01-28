import  Link from 'next/link'
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/src/actions/user.action'

export default async function Navbar() {
  const user = await currentUser()
  if(user) await syncUser()

    const userData = user
    ? {
        username: user.username || undefined,
        email: user.emailAddresses[0]?.emailAddress || "",
      }
    : null;

  return (
    <nav className='sticky top-0 w-full border-b bg-background/95 backdrop:blur supports-[backdrop-filter]::bg-background/60 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link href ='/' className='text-xl font-bold text-primary font-mono tracking-wider'>
            Socially
            </Link>
          </div>
          <DesktopNavbar/>
          <MobileNavbar user={userData}/>
        </div>
      </div>
    </nav>
  )
}
