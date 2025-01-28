
'use client'
import { getProfile, getUserPosts, isFollowing, updatedprofile,  } from '@/src/actions/profile.action'
import { SignInButton, useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogHeader } from '../../components/ui/dialog'
import { Card, CardContent } from '../../components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-separator'
import { CalendarIcon, EditIcon, FileTextIcon, HeartIcon, LinkIcon, MapPinIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import PostCard from '../../components/Postcard'
// import { DialogHeader } from './ui/dialog'
import { Label } from '@radix-ui/react-label'
import {Input} from '@/src/app/components/ui/input'
import { Textarea } from '../../components/ui/textarea'



type User = Awaited<ReturnType<typeof getProfile >>
type Posts = Awaited <ReturnType<typeof getUserPosts>>

interface Profileclientprops {
    user: NonNullable <User>,
    posts:Posts,
    likedPosts:Posts,
    isfollow:boolean
}

export default function Profileclient({user,posts,likedPosts,isfollow:initialisfollowing}:Profileclientprops) {

    const {user:currentuser} = useUser()
    const [showedit,setShowEdit] = useState(false)
    const [isfollowing,setIsFollowing] = useState(initialisfollowing)
    const [activeTab, setActiveTab] = useState('posts');

    const [isupdatingfollow , setIsUpdatingFollow] = useState(false)
    const [editform , setEditForm] = useState({
        name:user.name||'',
        bio:user.bio||'',
        location:user.location||'',
        website:user.website||'',
    })

    const handleeditsubmit = async () =>{
        const formData = new FormData()
        Object.entries(editform).forEach(([key,value])=>{
            formData.append(key,value)
        })

        const result = await updatedprofile(formData);
        if(result.success){
            setShowEdit(false)
            toast.success('Profile updated successfully')
        }
    }

    const handlefollow = async()=>{
        if(!currentuser) return;
        try{
            setIsUpdatingFollow(true)
            await isFollowing(user.id)
            setIsFollowing(!isfollowing)
        }catch(error){
            toast.error('Failed to follow user')
            console.log(error)
    }finally{
        setIsUpdatingFollow(false)
    }
}


const isownprofile = currentuser?.username === user.username ||  
currentuser?.emailAddresses[0].emailAddress.split("@")[0] === user.username;

const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");



  return (
    <div className="max-w-3xl mx-auto">
    <div className="grid grid-cols-1 gap-6">
      <div className="w-full max-w-lg mx-auto">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 rounded-full">
                <AvatarImage src={user.image ?? "../../public/avatar.png"} className='rounded-full'/>
              </Avatar>
              <h1 className="mt-4 text-2xl font-bold">{user.name ?? user.username}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
              <p className="mt-2 text-sm">{user.bio}</p>

              {/* PROFILE STATS */}
              <div className="w-full mt-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="font-semibold">{user._count.following.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <Separator orientation="vertical" />
                  <div>
                    <div className="font-semibold">{user._count.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <Separator orientation="vertical" />
                  <div>
                    <div className="font-semibold">{user._count.posts.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                </div>
              </div>

              {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
              {!currentuser ? (
                <SignInButton mode="modal">
                  <Button className="w-full mt-4">Follow</Button>
                </SignInButton>
              ) : isownprofile ? (
                <Button className="w-full mt-4" onClick={() => setShowEdit(true)}>
                  <EditIcon className="size-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="w-full mt-4"
                  onClick={handlefollow}
                  disabled={isupdatingfollow}
                  variant={isfollowing ? "outline" : "default"}
                >
                  {isfollowing ? "Unfollow" : "Follow"}
                </Button>
              )}

              {/* LOCATION & WEBSITE */}
              <div className="w-full mt-6 space-y-2 text-sm">
                {user.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPinIcon className="size-4 mr-2" />
                    {user.location}
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center text-start text-muted-foreground ">
                    <LinkIcon className="size-4 mr-2" />
                    <a
                      href={
                       user.website
                      }
                      className="hover:underline text-xs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="size-4 mr-2" />
                  Joined {formattedDate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='posts' onValueChange={(value)=>setActiveTab(value)} className="w-full">
        <TabsList className="w-full mb-4 flex justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="posts"
            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
             data-[state=active]:bg-transparent px-6 font-semibold"
          >
            <FileTextIcon className={`size-4 ${
              activeTab === 'posts' ? 'text-blue-500 ' : ''
            }`}  />
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
             data-[state=active]:bg-transparent px-6 font-semibold "
          >
            <HeartIcon className={`size-4 ${
              activeTab === 'likes' ? 'text-red-500 fill-current' : ''
            }`} />
            Likes
          </TabsTrigger>
        </TabsList>

        <TabsContent  value="posts" className="mt-6">
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} dbUserId={user.id} />)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No posts yet</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="likes" className="mt-6">
          <div className="space-y-6">
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => <PostCard key={post.id} post={post} dbUserId={user.id} />)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No liked posts to show</div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showedit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                value={editform.name}
                onChange={(e) => setEditForm({ ...editform, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                name="bio"
                value={editform.bio}
                onChange={(e) => setEditForm({ ...editform, bio: e.target.value })}
                className="min-h-[100px]"
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                name="location"
                value={editform.location}
                onChange={(e) => setEditForm({ ...editform, location: e.target.value })}
                placeholder="Where are you based?"
              />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                name="website"
                value={editform.website}
                onChange={(e) => setEditForm({ ...editform, website: e.target.value })}
                placeholder="Your personal website"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleeditsubmit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
  )
}
