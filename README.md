# Requirements

  * Node v16 or newer
  * Bash shell

## Running the application

The current *node_server* application is running on a remote server. Skip <b>Step 2</b> if you don't want to run your server locally.

 * <b>Step 1</b> (Running client application):
    
   - Change to *react_front* directory `cd react_front` and install all the node packages `npm i`
   - Run command `npm run dev` to compile and lauch server at *localhost:1234*
   
 * <b>Step 2</b> (Running server application):
 
   *<b>Required ts-node to run this application. Skip first step if already installed.</b>*
   
   - Install ts-node globally with the following command `npm install -g ts-node`
   - Change to *node_server* directory `cd node_server` and install all the node packages `npm i`
   - Make sure you have <b>postgresql</b> service running at default port, with a database named 'duties' created with 'admin@admin' user/password.
   - Go to *react_front/src/services* directory and set <b>isDev</b> on 'service_config.js' to `true`
   - Run command `npm run server` to compile and lauch server at *localhost:3000*
