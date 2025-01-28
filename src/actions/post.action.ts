'use server'

import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function CreatePost(content:string,ImageUrl:string) {

try{
    const userId = await getDBUserId();
    if(!userId) return ;
    const post = await prisma.post.create({
        data:{
            content,
            image:ImageUrl,
            authorId:userId
        }
    })
    revalidatePath('/')
    return{success:true,post}   
    }catch(error){
        console.log('Error in CreatePost',error)
        return {success:false,error}
    }
}   


export async function getposts(){
   try{
   const post = await prisma.post.findMany({
        orderBy:{
            createdAt:'desc'
        },
        include:{
            author:{
                select:{
                    name:true,
                    image:true,
                    username:true,
                }
            },
            comments:{
                include:{
                    author:{
                        select:{
                            id:true,
                            name:true,
                            username:true,
                            image:true
                        }
                    }
                }
                ,orderBy:{
                    createdAt:'asc'
                }
            },
            likes:{
               select:{
                userId:true,
                
               }
            },
            _count:{
                select:{
                    likes:true,
                    comments:true
                }
            }
           
        }
    })
    return post
   }catch(error){
       console.log('Error in getposts',error)
   } 
}


export async function togglelikes(postId:string) {
    try{
        const userId = await getDBUserId();
        if(!userId) return ;
        const existinglike = await prisma.like.findUnique({
            where:{
                userId_postId:{
                    postId,
                    userId
                }
            }

        })

        const post = await prisma.post.findUnique({
            where:{id:postId},
            select:{authorId:true}

        })
        if(!post) throw new Error('Post not found');
        
        if(existinglike){
            prisma.like.delete({
                where:{
                    userId_postId:{
                        postId,
                        userId
                    }
                }
            })
        }else{
            prisma.$transaction([
                prisma.like.create({
                    data:{
                        userId,
                        postId
                    }
                }),
                ...(post.authorId !== userId ? [
                    prisma.notification.create({
                    data:{
                        userId:post.authorId,
                        postId,
                        type:'LIKE',
                        creatorId:userId
                    }
                })]:[])
            ])
        }
   
   revalidatePath('/')
   return {success:true}
    }catch(error){
        console.log('Error in togglelikes',error)
        return {success:false,error}
    }
}


export async function togglecomment(postId:string,content:string) {
    try{
        const userId = await getDBUserId();
        if(!userId) return ;
        if(!content) return {success:false,error:'Comment cannot be empty'};

        const post = await prisma.post.findUnique({
            where:{id:postId},
            select:{authorId:true}
    })

    if(!post) throw new Error('Post not found');

     const [comment] = await prisma.$transaction(async (tx) => {
      // Create comment first
      const newComment = await tx.comment.create({
        data: {
          content,
          authorId: userId,
          postId,
        },
      });

      // Create notification if commenting on someone else's post
      if (post.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: post.authorId,
            creatorId: userId,
            postId,
            commentId: newComment.id,
          },
        });
      }

      return [newComment];
    });
 
    revalidatePath('/')
    return{success:true,comment}
}catch(error){
    console.log('Error in togglecomment', error);
    return { success: false, error:'Failed to create a comment' };
}
}


export async function DeletePost (postId:string){
   
    try{
        const userId = await getDBUserId();
        
        const post = await prisma.post.findUnique({
        where:{id:postId},
        select:{authorId:true}
    } )
    if(!post) throw new Error('Post not found');
    if(post.authorId !== userId) throw new Error('You are not authorized to delete this post');

    await prisma.post.delete({
        where:{id:postId}
    })
    
revalidatePath('/')
return {success:true}
}catch(error){
    console.log('Error in DeletePost',error)
    return {success:false,error}
}
}