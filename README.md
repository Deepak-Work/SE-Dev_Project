# SE-Dev_Project - CampusConnect

## Description
CampusConnect is a Web Application for all students that allows them to keep up with the clubs they want to follow.

This innovative application is designed to streamline the communication and collaboration among university clubs and their members. This platform serves as a dynamic hub for aggregating newsletters from various clubs, facilitating efficient communication, and fostering a sense of community within the campus. 

With this application, clubs can easily share announcements, event details, and important updates, ensuring that their members stay informed about the latest happenings. This centralized approach enhances transparency and accessibility, making it simple for members to engage with club activities.

This application also provided members with the ability to respond to announcements, ask questions, and engage in discussion in real time. This fosters a more interactive and engaged community, as members can easily connect with club leaders, and fellow members, and stay actively involved in club initiatives.

## Windows Setup

### Using CMD

1) Create a virtual environment within the root directory with the following command:
```
py venv -m .\<env_name>
```
2) Activate the virtual environment within the root directory with the following command:
```
<env_name>\Scripts\activate.bat
```
3) Install the Python dependencies from the requirements.txt
```
pip install -r requirements.txt
```
4) Install frontend dependencies:
```
cd campusconnect\frontend
npm install
```
5) Build the latest version for the frontend:
```
npm run build
```
6)  Make the migrations for the SQLite3 database and Django models
```
cd ..\
py manage.py makemigrations
py manage.py migrate
```
7) Run the application
```
py manage.py runserver
```
8) Visit the website at: http://127.0.0.1:8000/


## Tech Stack 
- Django
- React
- TypeScript
- Python
- SQLite3
- Material UI
- Vite

# Development - Useful Commands
## Git Commands

### Pushing/Pulling
```
git add filename
git commit -m "message"
git push
git status // Displays the status working directory and what files are staged/unstaged
```
**ALWAYS PULL** before beginning any work. This is so you don't overwrite any changes made by someone else or yourself.**
```
git pull
```

### Branching
```
git branch // This will output the current branch you are on
git checkout branchname // This switches from your current branch to branchname
git branch branchname // Creates a new branch under branchname
```
Whenever you create a new branch and attempt to push code on that new branch, you will most likely need to run this first: ```git push --set-upstream origin branchname```

### Merging
If you want to merge branch A into branch B, push your code onto branch A and switch to branch B. Also, ensure you have the latest code by doing ```git pull``` on branch B.
```
git merge A
```
Merge conflicts can be fixed within VSCode.

## Running the server
The Django backend server can be started (as long as you are in the ```SE-Dev_Project/campusconnect``` directory) with: ```python manage.py runserver```
The React frontend server does not be started. You can just run ```npm run build```. Luckily, we don't have to keep running this command after every frontend change due to line 8 in ```package.json```.
The flag ```--watch``` watches for any new changes to the frontend and if something does change, it automatically rebuilds the file.

**IF YOU INSTALL A NPM/NODE DEPENDENCY** - anyone else attempting to run the frontend must run ```npm install``` first, otherwise your node modules will not be up to date.

## Django
### Database
Since we're using SQLite which is just file-based, anytime we insert/update/delete new records, the file is updated. Therefore, just make sure to commit and push that file as well.
Anytime we create a new model, the following commands must be run:
```
python manage.py makemigrations
python manage.py migrate
```
The migrations folder should also be included in the commit.

## Docker Runs

Make sure you have Docker installed on your machine.

To build the app using Docker, run the following commnad

```docker build -t <image_name> .```

To run the image use:

```docker run -it -p 8000:8000 <image_name>```

This should run the image and lauch the app.
