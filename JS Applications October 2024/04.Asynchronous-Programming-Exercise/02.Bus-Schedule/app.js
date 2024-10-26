function solve() {
    const [departBtn, arriveBtn] = document.querySelectorAll("input");
    const infoEl = document.querySelector(".info");

    let stopName = "";

    let id = "depot";
    const url = "http://localhost:3030/jsonstore/bus/schedule/";
    
    async function depart() {
        arriveBtn.disabled = false;    
        departBtn.disabled = true;
        
        try {
            const res = await fetch(url + id);
            const data = await res.json();
            id = data.next;

            stopName = data.name;

            infoEl.textContent = `Next stop ${stopName}`;
        }
        catch (error) {
            infoEl.textContent = "Error";
            arriveBtn.disabled = true;
            departBtn.disabled = true;
        }
    }

    async function arrive() {
        arriveBtn.disabled = true;    
        departBtn.disabled = false;
        infoEl.textContent = `Arriving at ${stopName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();