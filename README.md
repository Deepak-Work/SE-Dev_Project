# SE-Dev_Project - Campus Connect
CampusConnect is a web app. for all NYU students that allows to keep up with the clubs they want to follow.

# Useful Commands
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
Whenever you create a new branch and attempt to push code on that new branch, you will most likely need to run this first: ```git push --set-upstream origin solaris```

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