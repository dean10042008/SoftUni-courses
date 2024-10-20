window.addEventListener("load", activeMinutes);

function activeMinutes() {
    const previewListEl = document.querySelector("#preview-activity");
    const activityTableEl = document.querySelector("#activities-table");

    const [typeEl, intensityEl, caloriesEl, durationEl, dateEl] = document.querySelectorAll("input, select");
    const addBtn = document.getElementById("add-activity");
    
    addBtn.addEventListener("click", addTask);

    function addTask() {
        const type = typeEl.value;
        const intensity = intensityEl.value;
        const calories = caloriesEl.value;
        const duration = durationEl.value;
        const date = dateEl.value;

        if (type === "" || intensity === "" || calories === "" || duration === "" || date === "") return;

        addBtn.disabled = true;

        typeEl.value = "";
        intensityEl.value = "";
        caloriesEl.value = "";
        durationEl.value = "";
        dateEl.value = "";

        const item = document.createElement("li");

        const articleEl = document.createElement("article");
        articleEl.appendChild(createPara("Activity", type));
        articleEl.appendChild(createPara("Intensity", intensity));
        articleEl.appendChild(createPara("Duration", duration));
        articleEl.appendChild(createPara("Date", date));
        articleEl.appendChild(createPara("Calories", calories));
        
        const buttonWrapperEl = document.createElement("div");
        buttonWrapperEl.classList.add("btn-container");
        
        const editBtnEl = document.createElement("button");
        editBtnEl.textContent = "Edit";
        editBtnEl.classList.add("edit-btn");

        editBtnEl.addEventListener("click", () => editTask(type, intensity, duration, date, calories));

        const nextBtnEl = document.createElement("button");
        nextBtnEl.textContent = "Next";
        nextBtnEl.classList.add("next-btn");

        nextBtnEl.addEventListener("click", () => continueTask(type, intensity, duration, date, calories));
        
        buttonWrapperEl.appendChild(editBtnEl);
        buttonWrapperEl.appendChild(nextBtnEl);
        
        item.appendChild(articleEl);
        item.appendChild(buttonWrapperEl);
        previewListEl.appendChild(item);
    }

    function editTask(type, intensity, duration, date, calories) {
        previewListEl.innerHTML = "";
        addBtn.disabled = false;

        typeEl.value = type;
        intensityEl.value = intensity;
        caloriesEl.value = calories;
        durationEl.value = duration;
        dateEl.value = date;
    }

    function continueTask(type, intensity, duration, date, calories) {
        previewListEl.innerHTML = "";
        addBtn.disabled = false;

        const tableRowEl = document.createElement("tr");

        tableRowEl.appendChild(createTableData("type", type));
        tableRowEl.appendChild(createTableData("duration", duration));
        tableRowEl.appendChild(createTableData("calories", calories));
        tableRowEl.appendChild(createTableData("date", date));
        tableRowEl.appendChild(createTableData("intensity", intensity));

        const tableDataButtonRowEl = document.createElement("td");
        tableDataButtonRowEl.classList.add("btn-cell");

        const deleteBtnEl = document.createElement("button");
        deleteBtnEl.textContent = "Delete";
        deleteBtnEl.classList.add("delete-btn");

        deleteBtnEl.addEventListener("click", () => deleteTask(tableRowEl));

        tableDataButtonRowEl.appendChild(deleteBtnEl);
        tableRowEl.appendChild(tableDataButtonRowEl);

        activityTableEl.appendChild(tableRowEl);
    }

    function deleteTask(row) {
        row.parentNode.removeChild(row);
    }

    function createTableData(table, text) {
        const td = document.createElement("td");
        td.className = `${table}-cell`;
        td.textContent = text;

        return td;
    }
    
    function createPara(header, text) {
        const paraEl = document.createElement("p");
        paraEl.textContent = `${header}: ${text}`;
        return paraEl;
    }
}