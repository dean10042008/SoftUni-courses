function generateReport() {
    const checkboxes = document.querySelectorAll('thead input[type="checkbox"]');
    const rows = document.querySelectorAll('tbody tr');
    const output = [];
    
    rows.forEach(row => {
        const obj = {};
        const cells = row.querySelectorAll('td');
        
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const columnName = checkbox.name;
                obj[columnName] = cells[index].textContent.trim();
            }
        });

        output.push(obj);
    });

    document.getElementById('output').value = JSON.stringify(output, null, 4);
}