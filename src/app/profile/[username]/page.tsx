import { getProfile, getUserPosts, isFollowing, likedposts } from '@/src/actions/profile.action';
import React from 'react';
import Custom404 from '../../not-found';
import Profileclient from './Profileclient';




export async function generateMetadata({ params }: { params: { username: string } }) {
  const user = await getProfile(params.username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({ params }: { params: { username: string } }) {
  const user = await getProfile(params.username);

  if (!user) Custom404();

  const [posts, likedPost, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    likedposts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <Profileclient
      user={user}
      posts={posts}
      likedPosts={likedPost}
      isfollow={isCurrentUserFollowing}
    />
  );
}
export default ProfilePageServer;