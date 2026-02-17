import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/TodoService';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // EDITING STATES
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDate, setEditingDate] = useState('');
  const [editingPriority, setEditingPriority] = useState('Medium');

  useEffect(() => { loadTodos(); }, []);

  const loadTodos = () => {
    getTodos().then(res => setTodos(res.data)).catch(err => console.error(err));
  };

  // PROGRESS CALCULATION
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
        toast.error("Please enter a task title!");
        return;
    }
    
    const task = { 
      title: newTitle, 
      description: newDesc, 
      completed: false,
      dueDate: dueDate,
      priority: priority
    };

    createTodo(task).then(() => {
      toast.success("Task added to flow!", { icon: "🚀" });
      setNewTitle('');
      setNewDesc('');
      setDueDate('');
      setPriority('Medium');
      loadTodos();
    });
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
    setEditingDate(todo.dueDate || '');
    setEditingPriority(todo.priority || 'Medium');
  };

  const saveEdit = (id) => {
    const todoToUpdate = todos.find(t => t.id === id);
    const updatedTask = { 
        ...todoToUpdate, 
        title: editingTitle,
        dueDate: editingDate,
        priority: editingPriority
    };

    updateTodo(id, updatedTask)
      .then(() => {
        toast.success("Task updated!");
        setEditingId(null);
        loadTodos();
      });
  };

  const deleteTask = (id) => {
    deleteTodo(id).then(() => {
        toast.success("Task removed", { icon: "🗑️" });
        loadTodos();
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL tasks?")) {
      const deletePromises = todos.map(todo => deleteTodo(todo.id));
      Promise.all(deletePromises).then(() => {
          toast.success("Workspace cleared!", { icon: "🧹" });
          loadTodos();
      });
    }
  };

  const filteredTodos = todos.filter(t => {
    const matchesFilter = filter === 'all' ? true : (filter === 'active' ? !t.completed : t.completed);
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="main-wrapper">
      <Toaster 
        position="bottom-right"
        toastOptions={{
            style: {
                background: '#1e1e2f',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
            },
        }}
      />

      <div className="todo-card">
        {/* BRANDING HEADER */}
        <div className="header-container">
          <h1 className="header-title">Stack 📚</h1>
          <p className="header-subtitle">Push tasks. Pop results..</p>
        </div>

        {/* ADD TASK FORM */}
        <form onSubmit={handleAdd} className="input-group">
          <input
            type="text"
            className="main-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          <textarea
            className="desc-input"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Add details (optional)"
          />
          
          <div className="row-inputs">
            <input
              type="datetime-local"
              className="date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select 
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟠 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          <button type="submit" className="add-todo-btn">Add to List</button>
        </form>
        
        {/* CONTROLS */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search your tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-bar">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            All ({todos.length})
          </button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
            Active
          </button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
            Completed
          </button>
        </div>

        {/* PROGRESS DASHBOARD */}
        <div className="progress-container">
            <div className="progress-text">
                <span>Daily Progress</span>
                <span>{completedTasks} / {totalTasks} Completed</span>
            </div>
            <div className="progress-bar-bg">
                <div 
                    className="progress-bar-fill" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>

        {/* TASK LIST */}
        <div className="task-list">
          {filteredTodos.map(todo => (
            <div key={todo.id} className={`task-row ${todo.completed ? 'finished' : ''}`}>
              {editingId === todo.id ? (
                <div className="edit-mode">
                  <input 
                    className="edit-input"
                    value={editingTitle} 
                    onChange={(e) => setEditingTitle(e.target.value)}
                    autoFocus
                  />
                  <div className="row-inputs">
                    <input 
                        type="datetime-local"
                        className="edit-date-input"
                        value={editingDate}
                        onChange={(e) => setEditingDate(e.target.value)}
                    />
                    <select 
                        className="priority-select"
                        value={editingPriority}
                        onChange={(e) => setEditingPriority(e.target.value)}
                    >
                        <option value="High">🔴 High</option>
                        <option value="Medium">🟠 Medium</option>
                        <option value="Low">🟢 Low</option>
                    </select>
                  </div>
                  <div className="edit-actions">
                    <button className="save-btn" onClick={() => saveEdit(todo.id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-info" onClick={() => updateTodo(todo.id, {...todo, completed: !todo.completed}).then(loadTodos)}>
                    <div className="check-circle">{todo.completed && "✓"}</div>
                    <div className="text-content">
                      <div className="title-row">
                        <span className="task-text">{todo.title}</span>
                        <span className={`priority-badge ${todo.priority || 'Medium'}`}>
                            {todo.priority || 'Medium'}
                        </span>
                      </div>
                      
                      {todo.description && <p className="task-desc">{todo.description}</p>}
                      {todo.dueDate && (
                        <span className="task-date">📅 {formatDate(todo.dueDate)}</span>
                      )}
                    </div>
                  </div>
                  <div className="actions">
                    <button className="edit-btn" onClick={() => startEdit(todo)}>Edit</button>
                    <button className="del-btn-pill" onClick={() => deleteTask(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {filteredTodos.length === 0 && <p className="empty-state">No tasks found. Start by adding one!</p>}
        </div>

        {todos.length > 0 && (
          <div className="footer-actions">
            <button className="clear-btn" onClick={handleClearAll}>Clear Workspace</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;