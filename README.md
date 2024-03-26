# Requirements

  * Node v16 or newer
  * Bash shell

## Running the application

 *If you don't want to set everything up locally, you can just browse <b>https://pablosilva.me/</b> and see the application working. (NOTE: Domain not active at the moment)*
 
 *If you want to run the Client Application locally but not the Server, skip <b>Step 2</b>*

 * <b>Step 1</b> (Running client application):
    
   - Change to *react_front* directory `cd react_front` and install all the node packages `npm i`
   - Run command `npm run dev` to compile and lauch server at *localhost:1234*
   
 * <b>Step 2</b> (Running server application):
 
   *<b>Required "ts-node" package to run this application. Skip first step if already installed.</b>*
   
   - Install ts-node globally with the following command `npm install -g ts-node`
   - Change to *node_server* directory `cd node_server` and install all the node packages `npm i`
   - Make sure you have <b>postgresql</b> service running locally at default port, with a database named 'duties' created with 'admin@admin' user/password.
   - Run command `npm run dev` to compile and lauch server at *localhost:3000*
