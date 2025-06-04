const fs = require("fs");
const filePath = "./tasks.json";

let tasks = []; //declaring tasks globally
if(fs.existsSync(filePath)){
    const fileData = fs.readFileSync(filePath,"utf-8");
    if(fileData.trim().length > 0){
        tasks = JSON.parse(fileData);
    };
}

const command = process.argv[2];

if(!command){
    console.log("Welcome to CLI!");
}

if(command === "add-task"){
    const title = process.argv[3];
    const dueDate = process.argv[4];

    if(!title || !dueDate){
        console.log("Error: title and due date are required");
        process.exit(1);
    }

    const newTask = {
        id: Date.now(),
        title,
        dueDate,
        status: "pending",
    };

    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));
    console.log("task added sucessfully");
}else if( command === "list-tasks" ){
    if(tasks.length === 0){
        console.log("no tasks found");
    }else{
        tasks.forEach((task,index)=>{
            console.log(
                `${index+1}.Title: ${task.title} | Due: ${task.dueDate} | Status: ${task.status}`
            );
        })
    }
}else if( command === "complete-task" ){
    const identifier = process.argv[3];

    if(!identifier){
        console.log("Error: give title/id to complete the task");
        process.exit(1);
    }
    
    let completed = false;
    tasks = tasks.map((task)=>{
        if(task.title === identifier || task.id.toString() === identifier){
            completed = true;
            return {...task, status: "completed"};
        };
        return task;
    });

    if(!completed){
        console.log("task not found");
    }else{
        fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));
        console.log("task completed sucessfully");
    }
}else if(command === "update-task"){
    const identifier = process.argv[3];
    const newTitle = process.argv[4];
    const newDueDate = process.argv[5];

    if(!identifier || !newTitle || !newDueDate){
        console.log("Error: please provide title/id, new title and new due date to update the task");
        process.exit(1);
    }
    
    let updated = true;
    tasks = tasks.map((task)=>{
        if(identifier === task.title || identifier === task.id.toString()){
            updated = true;
            return {...task, title: newTitle, dueDate: newDueDate};
        }
        return task;
    })

    if(!updated){
        console.log("task not found");
    }else{
        fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));
        console.log("task updated successfully");
    }
}