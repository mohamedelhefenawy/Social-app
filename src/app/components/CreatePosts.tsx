'use client';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2Icon, SendIcon, SmileIcon } from 'lucide-react';
import { CreatePost } from '@/src/actions/post.action';
import toast from 'react-hot-toast';
import Picker from 'emoji-picker-react';

export default function CreatePosts() {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await CreatePost(content, imageUrl);
      if (result?.success) {
        setContent('');
        setImageUrl('');
        toast.success('Post created successfully!');
        setShowEmojiPicker(false)
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

  const onEmojiClick = (event:string) => {
    setContent((prevContent) => prevContent + event);
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
              maxLength={500}
            />
          </div>

          {/* Emoji Picker */}
          <div className="flex justify-end relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              disabled={isPosting}
              aria-label="Toggle emoji picker"
            >
              <SmileIcon className="size-4" />
            </Button>

            {showEmojiPicker && (
              <div className="absolute z-50 top-16 right-0 max-h-[400px] overflow-y-auto">
                <Picker onEmojiClick={(e)=>onEmojiClick(e.emoji)} width={250} height={350}/>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
              aria-label="Submit post"
            >
              {isPosting ? (
                <Loader2Icon className="size-4 mr-2 animate-spin" />
              ) : (
                <SendIcon className="size-4 mr-2" />
              )}
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
