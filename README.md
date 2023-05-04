# Algarve Workshop - Web Unity project

This repository contains a template game by Unit (2D microplatform) modified to communicate through a websocket with a Nodejs server. The Nodejs server can log Unity events (for now, only "jump" events) into a MongoDB database in the cloud.

The game is meant to be built for WebGL, but it might work out of the box on other platforms.

At the moment, it is deployed on render.com at the following address:
https://integrated-unity.onrender.com/
(if render.com takes a while to display, it is become the free instance needs to wake up)

Nothing impressive for now. It is just the base game. The interesting bits run in the background.

This README will guide you through a local installation, enabling you to edit the game or create a new one with the same socket communication and server mechanism.

### Run it on your own computer

#### Requirements
- Git ([git cli](https://cli.github.com/) is useful)
- Nodejs ([version 18](https://nodejs.org/en) will do)
- MongoDB ([Community edition](https://www.mongodb.com/try/download/community)): if you do not have a cloud URI or if you want to develop using a local MongoDB database.
- [Unity](https://unity.com/download) version 2020. It might work on other version but I only tested 2020.


#### Installation

In the command line, cd wherever you want to clone the repository and type

```
git clone https://github.com/IntegratedWebTech
cd IntegratedWebTech
npm install
```

Now you have all the files ready.


#### Configuration (local)

In order to communicate with the database, your Nodejs server (defined in app.js) must use the correct MongoDB URI. You need to create a .env file in the root folder (i.e IntegratedWebTech) and to fill it with

```
NODE_ENV='production'
MONGODB_URI='mongodb+srv://<here comes the URI provided by mongoDB cloud.';
```

Make sure you did not create a .env.txt file and note that the MONGODB_URI variable is only needed if you want to feed a cloud MongoDB database.
If you develop locally, you do not need to change this line. Instead, just define NODE_ENV='development'.
In this case, just before the next step, open another command window / terminal and type:

```
mongod --dbpath C:\whatever\path2yourlocaldatabase
```
Note that C:\whatever\path2yourlocaldatabase should point to an empty directory that you have already created.
Note also that your might need to add mongod.exe to your OS path.
On Windows, you can proceed like [this](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/) and add the following folder (if you did not alter MongoDB default installation): C:\Program Files\MongoDB\Server\6.0\bin

Now you are ready to serve the game locally. In the first terminal (not the one which is running local MongoDB, if applicable), type:
```
node app.js
```
(NB: you should still be in the IntegratedWebTech folder)

Navigate to http://localhost:3000 in your web browser.

Voilà!


#### Configuration (render.com)

If you want to run the experiment on a free [render.com](render.com) instance, you will need to:
- fork/duplicate the repository in your own Github account.
- point render.com to that repository
- configure a web service in render.com and add the 2 config variables of your .env file on render ('Advanced' tab of the deployment page)
- deploy
- wait a bit
- voilà :)


### Useful references
https://unityatscale.com/unity-meta-file-guide/faq/#should-i-choose-hidden-or-visible-meta-files-when-using-unity-with-a-version-control-system
https://github.com/romainligneul/SocketIO-Express-Unity.2020
https://github.com/KyleDulce/Unity-Socketio

