const baseUrl = "http://localhost:3030/jsonstore";

export default {
    getAll: async function() {
        try {
            const response = await fetch(`${baseUrl}/todos`);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.error(e);
        }
    },
    updateOne: async function(todoId, isCompleted) {
        try {
            const response = await fetch(`${baseUrl}/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isCompleted: isCompleted
                })
            });
        }
        catch (e) {
            console.error(e);
        }
    }
};