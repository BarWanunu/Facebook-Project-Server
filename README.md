## Welcome to our Facebook Server !
welcome to our Fecebook server repository! <br>
The server is designed for use with our React and Android Facebook apps, which we developed during the course. <br>

In oreder to demonstrate all of the functions and actions you can do in our app you can check out the next video if you would like to :
https://youtu.be/930gzyHn4eQ?si=C_Vs6IKv2FLfSfyR

## how to run the server?
In order to begin this is the url link to clone the project:https://github.com/shakedg1234/ex3. <br>
Make sure that you have MongoDbCompass installed on your computer. <br>
run in terminal the command : npm install <br>
Now you can start and see our App by writing to the termianl this line: <br>
npm start  <br>
right now the server is running, and the mongoDb should have the relevnt colloction with our Data based. <br>
now in order to see the web using the port 80 in http://localhost:80/. <br>

This facebook app was developed in web envionement using HTML, css, JS, react. It's linked to the Node Js server and the TCP, so please make sure they're both running before you work on this app. <br>
The work on this app was divided to 2 parts. In the first part we worked only on the basic functions as login screen, and sign in screen of course with all of the functionality. <br>
We had hard coded users we could log in with and inside the main page you could scroll down and see hard coded feed from a json list of posts. <br>
In the second part, we developed the app to make all of the required functions with the server when we need to fetch data or to post data.
If you want to read about each part you can go to specific repositories. <br>
Use the link we gave above for the second part, and for the first part just switch to the master branch.

## Login and Sign in
The first page you'll encounter after starting the app is the Sign in page. <br>
In order to sign in to our facebook app you can take one of the users from the mongoDB or to create one for yourself. <br>
If you want to make your own profile you can press the sign up button. <br>
![image](https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/bc04ac98-55db-4440-b60c-f4cde3160009) <br>
Afterwards, you'll be transferd to the sign up page where you'll need to fill the required fields. <br>
![image](https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/be2ed245-bf67-4728-bde4-65b7b90d98a0) <br>
Be aware, you'll have to fill all of the fields in order to finish the form. <br>
For example - the email address you sign up with must be from the pattern of name@example.com. <br>
For the password choosing it must be in the length of minimum 8 characters and contain letters and numbers. Afterwards, you will have to confirm your password and the values must be identical of course. <br>
After you'll choose your display name for the application and the photo that will be shown you'll get a massage that the form was submmited successfuly and you'll find yourself back in the sign in page. <br>
After you sign in with us you'll get a spesific token that will allow you to make some of the activities we offer for our users by making sure you are indeed the person who are authorized to make the action. <br>

## Feed Page Activity
Welcome to the main center of our app ! <br>
In here, you can see the posts of your friends and also people who are not your friends. <br>
So, what you can do in this page ? Let's walkthrough all of the things we can do in this app. <br> 
![image](https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/3b91cd2b-43b1-4178-9059-2c74240ba8cf) <br>
### Top Ruler
On the top ruler we have few icons and a search box. <br>
Let's go over the ruler from right to left. When you will press where your photo is, you'll have 2 options : to edit/delete your user. <br>
Then, to the left you'll have the moon icon that switches from light mode to dark mode. <br>
<img width="950" alt="image" src="https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/fc436ced-78e3-41fa-907d-6608d7f63829"> <br>
In the middle section, you have the home button that gets you back to the feed page when your'e inside a friend's profile. <br>

### Left side
On the left side you can see there's few icons. <br>
By pressing the profile icon you'll be transferd to your own profile where you'll be able to see all of your posts and edit/delete them as you would like. <br>
<img width="948" alt="image" src="https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/c5b6b573-bc6f-4268-a3d1-35f7fe88a4ba"> <br>
Another icon, is friend request that will open you a little window where you'll be able to see all of your friends requests and approve them or decline as you wish. <br>
![image](https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/422fd643-b57a-4504-ae29-bbf8bd4216f8) <br>

### Right Side
On the top bottom of the right side you'll be able to see a log out button that will get you back to the log in page.
<img width="949" alt="image" src="https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/dddaac61-e3a3-4cad-b4e3-d477c4db50b5"> <br>
Moreover, you can see all of your friends. Whoever, is on your list you can press on their picture and decide if you want to see their friends or to remove them from your friends list. <Br>
![image](https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/85cf23e8-2f7f-4601-befc-06ba05d2050e) <br>

![image](https://github.com/BarWanunu/Advanced-programming-project/assets/139462169/c7ded9ec-fc25-441a-bd39-90bce5b01f7c) <br>

About the posts in the Feed Page, each post has its own data: author, content, number of likes and comments, you can add like by presing the like button, you can add comments by pressing the comments button and right after to enter you comment and submit it. <br>
you can also delete and edit your comment. <br>
When you add a post the home page will get updated and your post will be added at the end of the page. <br> 
You can not edit/delete post that is not your post, an appropriate message will be displayed. <br>

## Important Thing when you ran the app
In order, for the application to run successfully without sudden crushes, please make sure you don't upload any photo that has a size larger than 1023 KB either for profile image or for a post.

