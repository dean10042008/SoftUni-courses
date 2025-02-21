import { useEffect, useState } from "react";
import todoService from "./assets/services/todo-service.jsx";
import TodoItem from "./assets/components/TodoItem.jsx";

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTodos = async () => {
        setLoading(true);
        const todos = Array.from(Object.values(await todoService.getAll()));
        setTodos(todos);
        setLoading(false);
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <main className="main">
                <section className="todo-list-container">
                    <h1>Todo List</h1>

                    <div className="add-btn-container">
                        <button className="btn">+ Add new Todo</button>
                    </div>

                    <div className="table-wrapper">
                        {
                            loading ?
                                <div className="loading-container">
                                    <div className="loading-spinner">
                                        <span className="loading-spinner-text">Loading</span>
                                    </div>
                                </div> :

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="table-header-task">Task</th>
                                            <th className="table-header-status">Status</th>
                                            <th className="table-header-action">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {   
                                            todos.map(todo => (
                                                <TodoItem todoData={todo} fetchTodos={fetchTodos} key={todo._id} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default App;