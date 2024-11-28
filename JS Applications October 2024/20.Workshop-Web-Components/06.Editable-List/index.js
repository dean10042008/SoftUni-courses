class CustomList extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `<style>
            .container {
                max-width: 500px;
                margin: 50px auto;
                border-radius: 20px;
                border: solid 8px #2c3033;
                background: white;
                box-shadow: 0 0 0px 1px rgba(255, 255, 255, .4), 0 0 0px 3px #2c3033;
            }

            .editable-list-header {
                margin: 0;
                border-radius: 10px 10px 0 0px;
                background-image: linear-gradient(#687480 0%, #3b4755 100%);
                font: bold 18px/50px arial;
                text-align: center;
                color: white;
                box-shadow: inset 0 -2px 3px 2px rgba(0, 0, 0, .4), 0 2px 2px 2px rgba(0, 0, 0, .4);
            }

            .editable-list {
                padding-left: 0;
            }

            .editable-list>li,
            .editable-list-add-container {
                display: flex;
                align-items: center;
            }

            .editable-list>li {
                justify-content: space-between;
                padding: 0 1em;
            }

            .editable-list-add-container {
                justify-content: space-evenly;
            }

            .editable-list>li:nth-child(odd) {
                background-color: rgb(229, 229, 234);
            }

            .editable-list>li:nth-child(even) {
                background-color: rgb(255, 255, 255);
            }

            .editable-list-add-container>label {
                font-weight: bold;
                text-transform: uppercase;
            }

            .icon {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.8rem;
                outline: none;
            }
        </style>`;

        const initialItems = JSON.parse(this.getAttribute("items"));

        const containerEl = document.createElement('article');
        containerEl.classList.add('container');

        const titleEl = document.createElement('h1');
        titleEl.classList.add('editable-list-header');
        titleEl.textContent = this.getAttribute('title');

        containerEl.appendChild(titleEl);

        const listItemEl = document.createElement('ul')
        listItemEl.className = 'editable-list';

        initialItems.map(el => {
            listItemEl.appendChild(createItem(el));
        });

        containerEl.appendChild(listItemEl);

        const addContainer = document.createElement('div');
        addContainer.className = 'editable-list-add-container';

        const labelEl = document.createElement('label');
        labelEl.textContent = `add ${this.getAttribute("input-title")}`;

        const inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.className = "add-new-list-item-input";

        const addBtn = document.createElement('button');
        addBtn.className = "editable-list-add-item icon";
        addBtn.innerHTML = "&oplus;";

        addBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const valueToAdd = inputEl.value;

            if (valueToAdd === "") return;

            listItemEl.appendChild(createItem(valueToAdd));
            inputEl.value = "";
        });

        addContainer.append(labelEl, inputEl, addBtn);

        containerEl.appendChild(addContainer);

        this.shadow.innerHTML = styles;
        this.shadow.appendChild(containerEl);

        function createItem(el) {
            const li = document.createElement('li');

            const p = document.createElement('p');
            p.className = 'editable-list-item-value';
            p.textContent = el;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'editable-list-remove-item icon';
            removeBtn.innerHTML = "&ominus;";

            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                li.remove();
            });

            li.append(p, removeBtn);

            return li;
        }
    }
}

customElements.define("custom-list", CustomList);