import {
    getProfile,
    likedposts,
    getUserPosts,
    isFollowing,
  } from "../../../actions/profile.action";
  import { notFound } from "next/navigation";
  import ProfilePageClient from "./Profileclient";



  
  export default async function ProfilePageServer({ params }: { params:  Promise<{ username: string }> }) {
    const username  = (await params).username
    const user = await getProfile(username);
    if (!user) notFound();
  
    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
      getUserPosts(user.id),
      likedposts(user.id),
      isFollowing(user.id),
    ]);
  
    return (
      <ProfilePageClient
        user={user}
        posts={posts}
        likedPosts={likedPosts}
        isFollowing={isCurrentUserFollowing}
      />
    );
  }
