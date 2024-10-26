async function getInfo() {
    const stopId = document.getElementById("stopId").value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const stopNameElement = document.getElementById("stopName");
    const busesListEl = document.getElementById("buses");

    try {
        busesListEl.replaceChildren();
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            
            stopNameElement.textContent = data.name;

            for (const busNumber in data.buses) {
                const li = document.createElement("li");
                li.textContent = `Bus ${busNumber} arrives in ${data.buses[busNumber]} minutes`;

                busesListEl.appendChild(li);
            }
        }
    }
    catch (error) {
        stopNameElement.textContent = "Error";
    }
}