'use client';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {  Loader2Icon, SendIcon } from 'lucide-react';
import { CreatePost } from '@/src/actions/post.action';
import toast from 'react-hot-toast';
// import ImageUpload from './ImageUpload';

export default function CreatePosts() {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  // const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await CreatePost(content, imageUrl);
      if (result?.success) {
        setContent('');
        setImageUrl('');
        // setShowImageUpload(false);
        toast.success('Post created successfully!');
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error in CreatePost:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || '/avatar.png'} className="rounded-full" />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
              maxLength={500} // Add character limit
            />
          </div>

          {/* Image Upload */}
          {/* {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )} */}

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              {/* <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
                aria-label="Toggle image upload"
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button> */}
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
              aria-label="Submit post"
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}