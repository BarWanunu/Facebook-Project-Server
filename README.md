## Welcome to our Facebook Server!
Welcome to our Facebook server repository! The server is designed for use with our React and Android Facebook apps, which we developed during the course.

## How to Run the Server?
To begin, clone the project from the following URL: https://github.com/shakedg1234/ex3.

### Before Running
Before running the server, please ensure the following:

1. Make sure that you have MongoDB Compass installed on your computer.
2. Ensure that the TCP server is running on your computer. You can download it from here: https://github.com/BarWanunu/Advanced-programming-project/tree/ex4_branch.
3. Open the project in VS Code. In the env.local file, you can adjust the size and the number of hash functions you want to initialize the Bloom filter with using the BLOOM_PART_INITIALIZE variable. Additionally, you can modify the list of invalid URLs using the URL_LIST variable.
4. To connect to the TCP server, adjust the IP address in the TCP_SERVER_IP variable. If you are running the TCP server on a virtual machine, you will need to use the machine's IP address, which you can find using the command ifconfig.
   ![image](https://github.com/shakedg1234/ex3/assets/132774208/3f264bb5-9fa4-4644-817a-d9d639dd6a9d)

### How to Run the Project
To run the project, follow these steps: <br>

Open a terminal and run the command:<br>
npm install<br>
Start the server by running:<br>
npm start<br>
The server is now running, and MongoDB should have the relevant collection with our database.<br>
To view the web app, navigate to http://localhost:80/ using port 80.<br>
## Our Workflow
We organized our project using the MVC (Model-View-Controller) architecture. Initially, we focused on implementing the signup, signin, and token functions to ensure everything was working properly. Then, we proceeded to work on the remaining functions. Throughout our development process, we carefully reviewed every detail we modified on the server to ensure that the React and Android behavior met our expectations. Once everything was functioning as expected, we uploaded our program.
