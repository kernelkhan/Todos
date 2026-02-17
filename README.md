# 📚 Stack

<p align="center">
  <img src="screenshots/dashboard.png" width="700" alt="Stack Dashboard">
</p>

<p align="center">
  <strong>Push tasks. Pop results.</strong><br>
  A high-performance, full-stack task management system built for developers.<br>
  Featuring a "Deep Glass" UI, priority queues, and real-time analytics.
</p>

<p align="center">
  <a href="#-key-features">Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Setup</a> •
  <a href="#-api-reference">API</a>
</p>

---

## ✨ Key Features

### **CORE FUNCTIONALITY**
* **⚡ Priority Queues**: Organize tasks by **High (🔴)**, **Medium (🟠)**, or **Low (🟢)** priority levels.
* **📊 Progress Metrics**: Real-time visual dashboard showing completion rates and daily velocity.
* **📅 Time Management**: Integrated `datetime-local` pickers for precise deadline tracking.

### **UX & DESIGN**
* **🎨 Deep Glass Architecture**: A modern, dark-mode interface utilizing CSS backdrop filters and gradients.
* **🔔 Reactive Feedback**: Instant toast notifications (Success/Error/Warning) using `react-hot-toast`.
* **🔍 Omni-Search**: Client-side filtering to instantly locate tasks by title or description.

### **SYSTEM**
* **💾 Persistence Layer**: Embedded **H2 Database** ensures data survives server restarts without external setup.
* **🛡️ Robust Error Handling**: Graceful degradation and user-friendly error messages.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework**: React 18 (Vite)
* **Styling**: CSS3 Modules (Flexbox, Grid, Glassmorphism)
* **State Management**: React Hooks (`useState`, `useEffect`)
* **HTTP Client**: Axios
* **Notifications**: React Hot Toast

### **Backend (Server)**
* **Framework**: Spring Boot 3
* **Language**: Java 17
* **Database**: H2 (File-Based Mode)
* **ORM**: Spring Data JPA (Hibernate)
* **Tooling**: Lombok, Maven

---

## ⚙️ Getting Started

Follow these instructions to set up the **Stack** environment locally.

## 📂 Project Structure

A clean, modular architecture separating the Client (Frontend) and Server (Backend).

```bash
root
├── 📁 todo-backend (Spring Boot API)
│   ├── 📁 src/main/java/com/example/todo_backend
│   │   ├── 📁 controller      # API Endpoints (TodoController.java)
│   │   ├── 📁 model           # Database Entities (Todo.java)
│   │   ├── 📁 repository      # JPA Data Access (TodoRepository.java)
│   │   └── 📄 TodoBackendApplication.java
│   ├── 📁 src/main/resources
│   │   └── 📄 application.properties  # Database Config
│   └── 📄 pom.xml             # Maven Dependencies
│
└── 📁 todo-frontend (React Client)
    ├── 📁 public              # Static Assets
    ├── 📁 src
    │   ├── 📁 services        # API Integration (TodoService.js)
    │   ├── 📄 App.jsx         # Main Dashboard Logic
    │   ├── 📄 App.css         # Deep Glass Styles
    │   └── 📄 main.jsx        # Entry Point
    ├── 📄 package.json        # Node Dependencies
    └── 📄 vite.config.js      # Build Configuration

### **Prerequisites**
* Java JDK 17+
* Node.js (v16+) & npm

### **1. Backend Setup**
1.  Clone the repository and open `todo-backend`.
2.  Configure the database in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:h2:file:./data/todo_db
    spring.jpa.hibernate.ddl-auto=update
    ```
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
4.  The API will launch at `http://localhost:8080`.

### **2. Frontend Setup**
1.  Navigate to the `todo-frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Access the dashboard at `http://localhost:5173`.

---

## 📸 Screenshots

### **The Stack Dashboard**
<p align="center">
  <img src="screenshots/dashboard.png" width="600" alt="Main Dashboard">
</p>

### **The Backend**
<p align="center">
  <img src="screenshots/Todo_backend.png" width="600" alt="Main Dashboard">
</p>
### **The Database**
<p align="center">
  <img src="screenshots/h2-db.png" width="600" alt="Main Dashboard">
</p>

### **Priority & Notifications**
<p align="center">
  <img src="screenshots/priority.png" width="600" alt="Toast Notifications">
</p>

---

## 🔌 API Reference

**Base URL:** `http://localhost:8080/api/todos`

| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Retrieve entire stack | - |
| `POST` | `/` | Push new task | `{ "title": "Code", "priority": "High" }` |
| `PUT` | `/{id}` | Update/Pop task | `{ "completed": true }` |
| `DELETE` | `/{id}` | Remove task | - |

---

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

---


## 🗄️ Database Access
You can view the raw data using the H2 Console while the backend is running.
URL: http://localhost:8080/h2-console
Driver Class: org.h2.Driver
JDBC URL: jdbc:h2:file:./data/todo_db
User Name: sa
Password: (Leave Empty)

## 👤 Author

Built with 💻 and ☕ by **Talmeez Ahmad Khan**.

## License
Distributed under the MIT License.
