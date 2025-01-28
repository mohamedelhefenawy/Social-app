import type { OurFileRouter } from "@/src/app/Uploading/core";
import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();