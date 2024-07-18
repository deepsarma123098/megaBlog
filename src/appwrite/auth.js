import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{

    client = new Client();

    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name}){

        //The account creation method might fail so to avoid that we use try catch block for fail safe condition

        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name)

           if(userAccount){

                return this.logIn({email, password})

           } else {
                return userAccount;
           }
            
        } catch (error) {
            console.log("Appwrite service:: createUser :: error", error);;
        }
    }

    async logIn({email, password}) {
        try {
            
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            throw error;
        }
    }

    //To check if the user is already logged in or not

    async getCurrentUser() {

        try {
            
            console.log(this.account.get());
            return await this.account.get()

        } catch (error) {
            console.log("Appwrite service:: getCurrentUser :: error", error);
        }

        return null; 

        //If we donot find any account then we return null. In the try block the output wull also be null if we don't find any account but if sometimes there may be different errors and to avoid those errors we use this statement.

        //We can also use if else block inside try block but this is easire way.
    }

//To logout appwrite has deleteSessions method. It deletes the current session.

//We can pass the curren session as its value or list of sessions, deleteSessions(currentSession/list of sessions)

// Delete all sessions from the user account and remove any sessions cookies from the end client.

async logOut () { 
    try {
        
        await this.account.deleteSessions() //deleteSession methodis also available where we can pass a single data.

    } catch (error) {
        console.log("Appwrite service:: logout :: error", error); // or we can use th throw syntax
        
    }
}



}


const authService = new AuthService();

export default authService;



// export default AuthService 

//Exporting by makin it a class then we have to create a object from the class whereever we will use this class. So it is better to export as an object and create all the methods and properties here only.

//Now wherever we use authService by using the dot notation on can access the properties and methods i.e. authService. 



// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(), 
//     'email@example.com', 
//     'password'
// );
