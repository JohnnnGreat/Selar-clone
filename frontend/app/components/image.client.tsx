import React from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "./ui/label";
import { Client, ID, Storage, Account } from "appwrite";
import _ from "lodash";
import { Loader, Upload } from "lucide-react";
import useProductInformation from "~/actions/products";

const client = new Client()
   .setEndpoint("https://cloud.appwrite.io/v1")
   .setProject("67408c6e0002b22feb6a");

const storage = new Storage(client);

const UploadImage = ({ url }: { url: string | undefined }) => {
   const [imageUrl, setImageUrl] = React.useState(url);

   console.log(url);
   const [imageUploading, setImageUploading] = React.useState(false);
   const { product, setProduct } = useProductInformation((state) => state);

   const onDrop = React.useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileId = ID.unique();
      const formData = new FormData();

      formData.append("file", file);

      const debouncedFunction = _.debounce(() => {
         console.log("debounced file");
         setImageUploading(true);
         storage
            .createFile("67409170002d4b8b36b4", fileId, file)
            .then((response) => {
               const fileUrl = storage.getFileView("67409170002d4b8b36b4", response.$id);
               console.log(fileUrl);

               setImageUrl(fileUrl);
            })
            .finally(() => {
               setImageUploading(false);
            });
      }, 5000);

      debouncedFunction();
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         "image/png": [],
         "image/jpeg": [],
         "image/gif": [],
      },
   });

   React.useEffect(() => {
      setProduct({ imageUrl: imageUrl });
   }, [imageUrl]);
   return (
      <div>
         <Label>Images*</Label>
         <p className=" text-[.8rem]">
            Your image needs to be at least 300×300 pixels, preferrably a square image.
         </p>

         <div
            className="border-dashed flex items-center justify-center gap-4 border p-4 cursor-pointer mt-[1rem] rounded-[10px] hover:bg-[#f7f7f7]"
            {...getRootProps()}
         >
            <input {...getInputProps()} />
            <Upload />
            {isDragActive ? (
               <p>Drop the files here ...</p>
            ) : (
               <p>Drag 'n' drop some files here, or click to select files</p>
            )}
         </div>
         {imageUploading && (
            <div className="flex gap-2 items-center">
               <Loader className="w-4 h-4 animate-spin" />
               <p className="italic text-[.8rem]">Saving Image...</p>
            </div>
         )}

         {imageUrl && (
            <img
               className="mt-[1rem] w-[100px] rounded-md"
               src={imageUrl}
               alt="Product Preview Image"
            />
         )}
      </div>
   );
};

export default UploadImage;
