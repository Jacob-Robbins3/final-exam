Install Node.js and MongoDB
Open the Project Folder
Go to the folder where your project is saved.
Install Dependencies
Open your terminal in that folder.
Type npm install and press Enter. This installs the tools the project needs.
Set Up the Environment File
There should be a file named .env. Make sure it includes three things:
A port number (mine was 5000)
A MongoDB connection line.
A secret key.
If it’s missing, create a .env file and add those settings.
Start the Server
In the terminal, type npm run dev to start the server in development mode.
You should see a message saying the server is running.
Using the API
Now the backend is live. You can send requests to it using something like Postman or connect it to a frontend.
It supports:
Registering and logging in users
Creating, reading, updating, and deleting posts
Adding and removing comments
Token Required
To create or delete posts or comments, you need to be logged in. After login, you’ll get a token. Use that token when sending requests that need permission.
