import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import CreatePosts from './components/CreatePosts'
import Whotofollow from './components/Whotofollow'
// import Postcard from './components/Postcard'
import { getposts } from '../actions/post.action'
import PostCard from './components/Postcard'



export default async function Home() {
  const user  = await currentUser()
  const posts  =  await getposts()
  // console.log({posts})
  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
        <div className='lg:col-span-6'>
          {user?<CreatePosts/> : null}

          <div className='space-y-6'>
            {posts.map((post) => (
              <div key={post.id}>
              <PostCard post={post} dbUserId={post.authorId} />
              </div>
            ))}

            </div>
        </div>

        <div className='lg:col-span-4 sticky hidden lg:block'>
            <Whotofollow/>
        </div>
    </div>
  )
}
