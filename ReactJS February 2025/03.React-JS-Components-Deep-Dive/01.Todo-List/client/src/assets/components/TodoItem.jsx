import todoService from "../services/todo-service";

const TodoItem = ({ todoData, fetchTodos }) => {
    async function changeStatus() {
        try {
            await todoService.updateOne(todoData._id, !todoData.isCompleted);
            await fetchTodos();
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <tr className={`todo ${todoData.isCompleted && "is-completed"}`}>
            <td>{todoData.text}</td>
            <td>{todoData.isCompleted ? "Complete" : "Incomplete"}</td>
            <td className="todo-action">
                <button onClick={changeStatus} className="btn todo-btn">Change status</button>
            </td>
        </tr>
    );
}

export default TodoItem;