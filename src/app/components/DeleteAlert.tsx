"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

interface DeleteAlertProps {
    onDelete: () => void;
    isDeleting: boolean;
    title?:string
    description?:string
}
export default function DeleteAlert({onDelete,isDeleting,title='Delete The Post',description ='Are you confirm to delete the post?'}:DeleteAlertProps) {


  return (
    <AlertDialog>
  <AlertDialogTrigger asChild><Button  
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-red-500 -mr-2">
        {isDeleting ? <Loader2Icon className="size-4 animate-spin" /> : <Trash2Icon  className="size-4"/>}
    </Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
        {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick ={onDelete} disabled ={isDeleting}
       className="bg-red-500 hover:bg-red-600">
        {isDeleting ? "Deleting..." : "Delete"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
