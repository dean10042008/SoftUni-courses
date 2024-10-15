window.addEventListener('load', techTroubleShootHub);

function techTroubleShootHub() {
    const employeeEl = document.getElementById("employee");
    const categoryEl = document.getElementById("category");
    const urgencyEl = document.getElementById("urgency");
    const teamEl = document.getElementById("team");
    const descriptionEl = document.getElementById("description");
    const addBtn = document.getElementById("add-btn");

    const previewListEl = document.querySelector(".preview-list");
    const pendingListEl = document.querySelector(".pending-list");
    const resolvedListEl = document.querySelector(".resolved-list");

    addBtn.addEventListener("click", addEmployee);

    function addEmployee(e) {
        e.preventDefault();
        
        const employee = employeeEl.value;
        const category = categoryEl.value;
        const urgency = urgencyEl.value;
        const team = teamEl.value;
        const description = descriptionEl.value;

        if (employee === "" || category === "" || urgency === "" || team === "" || description === "") return;

        addBtn.disabled = true;

        employeeEl.value = "";
        categoryEl.value = "";
        urgencyEl.value = "";
        teamEl.value = "";
        descriptionEl.value = "";

        const liPreview = createTaskItem(employee, category, urgency, team, description);

        previewListEl.appendChild(liPreview);
    }

    function createTaskItem(employee, category, urgency, team, description) {
        const li = document.createElement("li");
        li.classList.add("problem-content");

        const article = document.createElement("article");
        article.appendChild(createPara("From", employee));
        article.appendChild(createPara("Category", category));
        article.appendChild(createPara("Urgency", urgency));
        article.appendChild(createPara("Assigned to", team));
        article.appendChild(createPara("Description", description));

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editTask(employee, category, urgency, team, description, li));

        const continueBtn = document.createElement("button");
        continueBtn.classList.add("continue-btn");
        continueBtn.textContent = "Continue";
        continueBtn.addEventListener("click", () => continueTask(employee, category, urgency, team, description, li));

        li.appendChild(article);
        li.appendChild(editBtn);
        li.appendChild(continueBtn);

        return li;
    }

    function editTask(employee, category, urgency, team, description, li) {
        employeeEl.value = employee;
        categoryEl.value = category;
        urgencyEl.value = urgency;
        teamEl.value = team;
        descriptionEl.value = description;

        li.remove();
        addBtn.disabled = false;
    }

    function continueTask(employee, category, urgency, team, description, li) {
        li.remove();

        const liPending = createPendingTaskItem(employee, category, urgency, team, description);

        pendingListEl.appendChild(liPending);
    }

    function createPendingTaskItem(employee, category, urgency, team, description) {
        const li = document.createElement("li");
        li.classList.add("problem-content");

        const article = document.createElement("article");
        article.appendChild(createPara("From", employee));
        article.appendChild(createPara("Category", category));
        article.appendChild(createPara("Urgency", urgency));
        article.appendChild(createPara("Assigned to", team));
        article.appendChild(createPara("Description", description));

        const resolvedBtn = document.createElement("button");
        resolvedBtn.classList.add("resolve-btn");
        resolvedBtn.textContent = "Resolved";
        resolvedBtn.addEventListener("click", () => resolveTask(employee, category, urgency, team, description, li));

        li.appendChild(article);
        li.appendChild(resolvedBtn);

        return li;
    }

    function resolveTask(employee, category, urgency, team, description, li) {
        li.remove();

        const liResolved = createResolvedTaskItem(employee, category, urgency, team, description);

        resolvedListEl.appendChild(liResolved);
    }

    function createResolvedTaskItem(employee, category, urgency, team, description) {
        const li = document.createElement("li");
        li.classList.add("problem-content");

        const article = document.createElement("article");
        article.appendChild(createPara("From", employee));
        article.appendChild(createPara("Category", category));
        article.appendChild(createPara("Urgency", urgency));
        article.appendChild(createPara("Assigned to", team));
        article.appendChild(createPara("Description", description));

        const clearBtn = document.createElement("button");
        clearBtn.classList.add("clear-btn");
        clearBtn.textContent = "Clear";
        clearBtn.addEventListener("click", () => clearTask(li));

        li.appendChild(article);
        li.appendChild(clearBtn);

        return li;
    }

    function clearTask(li) {
        li.remove();
        addBtn.disabled = false;
    }

    function createPara(role, text) {
        const para = document.createElement("p");
        para.textContent = `${role}: ${text}`;
        return para;
    }
}