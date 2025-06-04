const fs = require("fs");
const filePath = "./tasks.json";

// Declare tasks globally
let tasks = [];

// Load tasks from file or initialize empty array
if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    if (fileData.trim().length > 0) {
        tasks = JSON.parse(fileData);
    }
}
const command = process.argv[2];

if (!command) {
    console.log("👋 Welcome to the Task Manager CLI!");
    console.log('Type "node taskManager.js help" to see available commands.');
    process.exit(0); // Exit after showing welcome
}

if(command === "add-task"){
    const title = process.argv[3];
    const dueDate = process.argv[4];

    if(!title || !dueDate){
        console.log("Eroor: task and dueDate are required.");
        process.exit(1);
    }

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        dueDate,
        status: "pending",
    };

    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));
    console.log("task added successfully");
}else if( command === "list-tasks" ){
    if(tasks.length === 0){
        console.log("no tasks found.");
    }else{
        tasks.forEach((task,index)=>{
            console.log(
                `${index+1}.Title: ${task.title} | Due: ${task.dueDate} | status: ${task.status}`
            );
        });
    }
}else if( command === "complete-task" ){
    const taskIdentifier = process.argv[3];

    let found = false;
    tasks = tasks.map((task)=>{
        if(task.title === taskIdentifier || task.id.toString() === taskIdentifier ){
            found = true;
            return {...task, status: "completed"};
        }
        return task;
    });

    if(!found){
        console.log("task not found");
    }else{
        fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
        console.log("task marked as completed");
    }
}else if(command === "update-task"){
    const identifier = process.argv[3];
    const newTitle = process.argv[4];
    const newDueDate = process.argv[5];

    if(!identifier || !newTitle || !newDueDate){
        console.log("Error: task id/title, new Tile and new Due Date are required");
        process.exit(1);
    }

    let updated = false;
    tasks = tasks.map((task)=>{
        if(task.title === identifier || task.id.toString() === identifier){
            updated = true;
            return {...task, title: newTitle, dueDate: newDueDate};
        }
        return task;
    });

    if(updated === false){
        console.log("task not found");
    }else{
        fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));
        console.log("task updated successfully");
    }
}else if(command === "delete-task"){
    const identifier = process.argv[3];
    const initialLength = tasks.length;

    if(!identifier){
        console.log("Error: please provide title/id to delete task");
        process.exit(1);
    }

    tasks = tasks.filter((task)=> task.title!== identifier && task.id.toString()!==identifier);

    if(tasks.length === initialLength){
        console.log("task not found");
    }else{
        fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));
        console.log("task deleted successfully");
    }
}else if(command === "search-tasks"){
    const term = process.argv[3];

    if(!term){
        console.log("Error: please provide term to search");
        process.exit(1);
    }

    const results = tasks.filter((task)=>
        task.title.includes(term) || task.dueDate.includes(term)
    );

    if(results.length === 0){
        console.log("no tasks found");
    }else{
        results.forEach((task,index)=>{
            console.log(
                `${index+1}.Title: ${task.title} | due: ${task.dueDate} | Status: ${task.status}`
            )
        });
    }
}else if(command === "help"){
    console.log(`
        Available Commands: 
        add-task <title> <dueDate> - add a new task
        list-task - list all tasks
        complete-task <title/id> - mark task as completed
        update-task <title/id> <newTitle> <newDueDate> - update a task
        delete-task <title/id> - delete a task
        search-tasks <term> - search by title/due date
        help - show help menu
    `);
}else{
    console.log(`Invalid command, run "node taskManager.js help for the list of commands"`);
}