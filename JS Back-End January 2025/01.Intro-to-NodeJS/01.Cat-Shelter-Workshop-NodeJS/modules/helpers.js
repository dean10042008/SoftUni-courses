export async function getBreeds() {
    try {
        const response = await fetch("http://localhost:5001/getAllBreeds");
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}