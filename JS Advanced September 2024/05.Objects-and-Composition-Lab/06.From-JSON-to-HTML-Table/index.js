function fromJSONToHTMLTable(input){
    function escapeHTML(text) {
        return text
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/ /g, "&nbsp;");
    }

    const arr = JSON.parse(input);

    let table = "<table>\n";
    table += "\t<tr>";
    
    Object.keys(arr[0]).forEach(element => {
        table += `<th>${escapeHTML(element)}</th>`;
    });

    table += "</tr>\n";

    arr.forEach(dataObj => {
        table += '\t<tr>';

        for (const key in dataObj) {
            table += `<td>${escapeHTML(dataObj[key])}</td>`;
        };

        table += '</tr>\n';
    });

    table += "</table>";

    console.log(table);
}

fromJSONToHTMLTable(['[{"Name":"Stamat","Price":5.5},{"Name":"Rumen","Price":6}]']);