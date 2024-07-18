import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket= new Storage(this.client)
    }

    async createPost ({title, slug, content, featuredImage, status, userId}) {
        
      try {
         return await this.databases.createDocument(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
              slug, //or ID.unique() we can use
              {
                title,
                content,
                featuredImage,
                status,
                userId,
              }
              
          );
      } catch (error) {

        console.log("Appwrite service:: createPost :: error", error);
        
      }
    }


    async updatePost (slug, {title, content, featuredImage, status}){  //See 11:27

       try {
         return await this.databases.updateDocument(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
             slug, // documentId is here the documentId which will be updated
             {
                title,
                content,
                featuredImage,
                status,
             }, 
           
         );

       } catch (error) {

        console.log("Appwrite service:: updatePost :: error", error);
       }
    }


     async deletePost(slug) { 

        try {
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               slug,
            );

            return true;

        } catch (error) {
            console.log("Appwrite service:: deletePost :: error", error);
            return false;
            
        }
     }


     async getPost(slug) {

       try {
         return await this.databases.getDocument(
             conf.appwriteDatabaseId,
             conf.appwriteCollectionId,
             slug,
         );
       } catch (error) {

        console.log("Appwrite service:: getPost :: error", error);
        return false;
            
       }

}

//Using Query, so that we get only those documents whose status is active

//20:45, video number 20

//To apply Query method we have to create the indexes in appwrite database section atleast for this project as we are looking based on the key: status

//We can also use the key values of enum in the datatype for more fullproff code

    async getPosts(queries = [Query.equal('status', "active")]) { 

        try {

            return await this.databases.listDocuments(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 queries,
                //[] , We could have write the Query logic inside the [ ] here, but we defined it as the function parameter
            )
            
        } catch (error) {
            console.log("Appwrite service:: getPosts :: error", error);
            return false;
        }

    }


    //FIle upload service,  create this as a seperate file

    //While uploading a file we need to pass the blob(i.e. the actual file) of the file and not the fileName

    async uploadFile(file){


        try {

            return await this.bucket.createFile(
                 conf.appwriteBucketId,
                 ID.unique(),
                 file // We receive the array of files here
            );
            
        } catch (error) {
            console.log("Appwrite service:: uploadFile:: error", error);
            return false;
        }
    }



    //From uploadImage we will recieve the fileId and in the featuredImage variable we will pass the fileId only while creating a post


    async deleteFile(fileId) { 

        try {
            
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;

        } catch (error) {
            console.log("Appwrite service:: uploadFile:: error", error);
            return false
        }
    }


//Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image. Preview is supported only for image files smaller than 10MB. So code the codes for compression.


//getFilePreview is a very fast response method and it does not contain promises so we can use it without async function also.

 getFilePreview(fileId) { 
    return this.bucket.getFilePreview(
        conf.appwriteBucketId, 
        fileId,
        
       // ImageFormat.Jpg
    );
 }

}


//create download file

const service = new Service()

export default service;
