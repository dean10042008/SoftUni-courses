// ! Important! 50/100 because new judge sucks!
function fromJSONToHTMLTable(input){
    const arr = JSON.parse(input);

    let table = "<table>\n";
    table += "\t<tr>";
    
    Object.keys(arr[0]).forEach(element => {
        table += `<th>${element}</th>`;
    });

    table += "</tr>\n";

    arr.forEach(dataObj => {
        table += '\t<tr>';

        for (const key in dataObj) {
            table += `<td>${dataObj[key]}</td>`;
        };

        table += '</tr>\n';
    });

    table += "</table>";

    console.log(table);
}

fromJSONToHTMLTable(['[{"Name":"Stamat","Price":5.5},{"Name":"Rumen","Price":6}]']);