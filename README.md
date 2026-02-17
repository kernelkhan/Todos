# 📝 Full-Stack Task Manager

<p align="center">
  <img src="screenshots/Todo.png" width="700" title="Task Manager Dashboard">
</p>

<p align="center">
  A modern, robust Task Manager built with a <strong>Spring Boot</strong> backend and a <strong>React (Vite)</strong> frontend.<br>
  Features a sleek "Midnight Dark" UI, persistent file-based storage, and full CRUD capabilities.
</p>

---

## 🚀 Features

* **Create Tasks**: Add new tasks with titles and optional descriptions.
* **Search**: Real-time filtering of tasks by title or description.
* **Smart Filters**: View "All", "Active", or "Completed" tasks.
* **Inline Editing**: Click any task to edit its title instantly.
* **Persistence**: Uses H2 file-based storage (`./data/todo_db`) so data survives server restarts.
* **Bulk Actions**: "Clear All" button to remove all tasks at once.
* **Responsive UI**: Fully styled with a custom "Midnight Dark" CSS theme.

---

## 🛠️ Tech Stack

### **Frontend**
* **React (Vite)**: Fast, modern frontend build tool.
* **JavaScript (ES6+)**: Component logic.
* **Axios**: HTTP client for API requests.
* **CSS3**: Flexbox & Grid for the custom dark theme.

### **Backend**
* **Spring Boot 3**: REST API development.
* **Spring Data JPA**: Database abstraction layer.
* **H2 Database**: File-based SQL database.
* **Java 17+**: Core language.

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### **Prerequisites**
* **Java JDK 17** or higher.
* **Node.js** & **npm**.
* **IntelliJ IDEA** (recommended for Backend) or VS Code.

### **1. Setup the Backend**
1.  Open the `todo-backend` folder in **IntelliJ IDEA**.
2.  Allow Maven to download dependencies.
3.  Navigate to `src/main/resources/application.properties` and verify the database setting:
    ```properties
    spring.datasource.url=jdbc:h2:file:./data/todo_db
    ```
4.  Run the `TodoBackendApplication.java` file.
5.  The server will start on **http://localhost:8080**.

### **2. Setup the Frontend**
1.  Open the `todo-frontend` folder in **VS Code**.
2.  Open the terminal (`Ctrl + ` `) and install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to **http://localhost:5173**.

---

## 📸 Screenshots

### Task Manager UI & Search
<p align="center">
  <img src="screenshots/Todo.png" width="600">
</p>

### H2 Database Console (Backend View)
<p align="center">
  <img src="screenshots/h2 db" width="600">
</p>

---

## 📂 Project Structure

```bash
root/
├── todo-backend/             # Spring Boot Application
│   ├── src/main/java/        # Controllers, Services, Repositories, Entities
│   ├── src/main/resources/   # application.properties (DB config)
│   └── data/                 # Auto-generated database file
│
└── todo-frontend/            # React Application
    ├── src/
    │   ├── services/         # API connection logic
    │   ├── App.jsx           # Main UI Logic
    │   └── App.css           # Midnight Dark Theme Styles
    └── vite.config.js        # Build configuration
```

## 🗄️ Database Access
You can view the raw data using the H2 Console while the backend is running.
URL: http://localhost:8080/h2-console
Driver Class: org.h2.Driver
JDBC URL: jdbc:h2:file:./data/todo_db
User Name: sa
Password: (Leave Empty)

## License
Distributed under the MIT License.
