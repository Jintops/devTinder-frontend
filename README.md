# DevTinder

Create a Vite + React application

Remove unecessary code and create a Hello World app

Install Tailwind CSS

Install Daisy UI

Add NavBar component to App.jsx

Create a NavBar.jsx separate Component file

Install react router dom

Create BrowserRouter > Routes > Route=/ Body > RouteChildren

Create an Outlet in your Body Component

Create a footer

Create a Login Page

Install axios

CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true

Whenever you're making API call so pass axios => { withCredentials: true }

install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start

configureStore => Provider => createSlice => add reducer to store

Add redux devtools in chrome

Login and see if your data is coming properly in the store

NavBar should update as soon as user logs in

Refactor our code to add constants file + create a components folder

You should not be access other routes without login

If token is not present, redirect user to login page

Logout Feature

Get the feed and add the feed in th store

build the user card on feed

Edit Profile Feature

Show Toast Message on save of profile

New Page - See all my connections

New Page - See all my Conenction REquests

Feature - Accept/Reject connection request

Send/Ignore the user card from the feed

Signup New User



deeployy  - ssh -i "devTinder-secret.pem" ubuntu@ec2-13-201-3-54.ap-south-1.compute.amazonaws.com
nginx config -     location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
