**npm install**

**npm run dev**

## **user Auth API** <br/>

**Register** || **POST Method** http://localhost:8080/api/user/register `{name:"yourName",username:"yourusername",email:"youremail",password:"yourpassword"}` <br/>
**Login** || **POST Method** http://localhost:8080/api/user/login `{email:"youremail",password:"yourpassword"}` <br/>
**Logout** || **POST Method** http://localhost:8080/user/api/logout <br/>
**GetAllUsers** || **GET Method** http://localhost:8080/user/api/allUsers <br/>

#####

## **POST API** <br/>

**Create-Post** || **POST Method** http://localhost:8080/api/post/createPost `{title:"yourtitle",description:"youdescription"}`<br/>
**Add-Comment** || **POST Method** http://localhost:8080/api/post/addComment/:postId `{text:"text for comment"}` <br/>
**Update-Post** || **PUT Method** http://localhost:8080/api/post/updatePost/:postId `{title:"updatedtitle",description:"updateddescription"}` <br/>
**Delete-Post** || **DELETE Method** http://localhost:8080/api/post/deletePost/:postId <br/>
**Search-Post** || **GET Method** http://localhost:8080/api/post/search `{searchValue:"searching by title"}`<br/>
**All-Posts** || **GET Method** http://localhost:8080/api/post/allPosts <br/>

