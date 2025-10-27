# 📝 To-Do List Fullstack Application

A **multi-user To-Do List management system** built with **Spring Boot (Java)** for the backend and **React.js** for the frontend.  
It allows users to create, assign, and manage tasks collaboratively in real-time using a MySQL database.

---

## 🚀 Features

✅ **User Management**
- Create and view users  
- Each user can create multiple tasks  

✅ **Task Management**
- Create, update, and delete tasks  
- View all tasks created by a user  

✅ **Task Assignment**
- Assign one or more users to a single task  
- Many-to-many relationship between Users and Tasks through `task_assignees`  

✅ **RESTful API**
- Built with Spring Boot and Spring Data JPA  
- Follows REST conventions for CRUD operations  

✅ **Frontend Dashboard**
- Built with React  
- Displays tasks dynamically  
- Fixed `tasks.filter is not a function` issue for stable rendering  

✅ **Database**
- MySQL integrated using JPA  
- Automatic table creation with `spring.jpa.hibernate.ddl-auto=update`  

---

## 🧩 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA**
- **MySQL**
- **Lombok**
- **HikariCP**

### Frontend
- **React.js (CRA)**
- **Axios** for API requests
- **Bootstrap / CSS Modules** for styling

---

## 🏗️ Project Structure

```
To-do-List-main/
│
├── backend/
│   ├── src/main/java/com/todo/backend/
│   │   ├── entity/
│   │   │   ├── User.java
│   │   │   ├── Task.java
│   │   │   └── TaskAssignee.java
│   │   ├── repository/
│   │   ├── service/
│   │   ├── controller/
│   │   └── TodoBackendApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── Dashboard.js
    │   ├── api.js
    │   └── index.js
    └── package.json
```

---

## ⚙️ Setup Instructions

### 🔹 1. Database Setup (MySQL)
Create a database and user:

```sql
CREATE DATABASE todolist_db;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'todo_user123';
GRANT ALL PRIVILEGES ON todolist_db.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
```

---

### 🔹 2. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Runs on 👉 **http://localhost:8080**

**application.properties**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todolist_db
spring.datasource.username=todo_user
spring.datasource.password=todo_user123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on 👉 **http://localhost:3000**

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/users` | Create a new user |
| `GET` | `/api/users` | Fetch all users |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/user/{userId}` | Get all tasks assigned to a user |
| `POST` | `/api/assignments/assign` | Assign user to a task |

---

## 🧠 Database Schema

**Tables:**
- `users` — Stores user info  
- `tasks` — Stores task details  
- `task_assignees` — Bridge table for many-to-many relationship between users and tasks  

**Relationships:**
- One `User` ➡ Many `Tasks`  
- One `Task` ➡ Many `TaskAssignees`  
- One `User` ↔ Many `TaskAssignees`  

---

## 💡 Example JSON Requests

### ➕ Add a User
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### ➕ Add a Task
```json
{
  "title": "Finish Project",
  "description": "Complete the Spring Boot + React integration",
  "createdBy": { "id": 1 }
}
```

### 🔁 Assign Task to User
```json
{
  "taskId": 1,
  "userId": 2
}
```

---

## 🧩 Common Issues

| Problem | Solution |
|----------|-----------|
| `tasks.filter is not a function` | Fixed — tasks are always initialized as arrays |
| `Failed to determine a suitable driver class` | Ensure MySQL connector version matches Spring Boot |
| `404 Not Found` | Check controller base URL (`/api/...`) and HTTP method |

---

## 👨‍💻 Author
**Manthan Jagtap**  
📚 College Project — *GameDevUtopia Club*  
💻 Full-Stack Developer | React + Spring Boot Enthusiast  

---

## 📜 License
This project is **open-source** under the MIT License.
