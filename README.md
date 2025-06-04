📋 Smart Task CLI – A Sleek Node.js Task Manager for Your Terminal

Smart Task CLI is a lightweight yet powerful command-line task manager built entirely with Node.js. Designed for developers and productivity lovers who prefer managing their to-do list without leaving the terminal, this tool brings all essential task operations to your fingertips – no fancy UI, just pure functionality.

Whether you’re tracking personal to-dos or coding assignments, Smart Task CLI helps you add, list, complete, update, delete, and search tasks effortlessly from your command line.

⸻

✨ Features
	•	➕ Add Task – Create new tasks with a title and due date

	•	📃 List Tasks – View all pending and completed tasks in a neat format
 
	•	✅ Mark as Complete – Easily mark tasks done by title or ID
 
	•	📝 Update Task – Edit task title or due date quickly
 
	•	❌ Delete Task – Remove tasks using title or ID
 
	•	🔍 Search Tasks – Filter tasks by keyword or due date
 
	•	🆘 Help Menu – Get a list of available commands

⸻

🛠️ Tech Stack
	•	Node.js
 
	•	File System Module (fs) – for reading/writing task data to a JSON file
 
	•	Terminal/CLI – your playground
 
⸻

🚀 Getting Started
	1.	Clone the repo: git clone https://github.com/your-username/command_line_task_manager_using_Node_js.git
 
  	2. 	Run the Script: node taskManager.js at CLI

⸻

📌 Example Commands
node taskManager.js help

node taskManager.js add-task "Buy groceries" "2025-06-10"

node taskManager.js add-task "Homework" "2025-06-10"

node taskManager.js list-tasks

node taskManager.js complete-task Buy groceries

node taskManager.js update-task "Buy groceries" "Buy fruits" "2025-06-12"

node taskManager.js delete-task Homework

node taskManager.js search-tasks groceries

⸻

💡 Ideal For
	•	Developers who love terminal productivity
 
	•	Students learning Node.js file handling
 
	•	Anyone who wants a minimalist task tracker without the overhead of GUIs
