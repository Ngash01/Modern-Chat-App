import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
export const ourFileRouter = {
    serverImage: f({image: {maxFileSize:"4MB", maxFileCount:1}})
    .onUploadComplete(()=>console.log("Image uploaded successfully!")),
    messageFile: f(["image", "pdf"])
    .onUploadComplete(()=>console.log("messageFile uploaded successfully!"))
}
 
export type OurFileRouter = typeof ourFileRouter;