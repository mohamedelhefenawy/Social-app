'use client'

import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { Loader2Icon } from 'lucide-react'
import { toggleFollow } from '@/src/actions/user.action'
export default  function FollowButton({userId}:{userId :string}) {
    const [isloading , setIsLoading]=useState(false)

    const handlefollow=async()=>{
        try{
            setIsLoading(true)
           await toggleFollow(userId)
           toast.success('User Followed')
        }
        catch(error){
            console.log(error)
             toast.error(`Error Following User `) }

        finally{setIsLoading(false)}
    }
    return (
    <Button onClick={handlefollow} size={'sm'} disabled={isloading} variant={'secondary'} className='w-20'>
        {isloading ? <Loader2Icon className='size-4 animate-spin'/> : 'Follow'}
      
    </Button>
  )
}

