const endpoint = "https://s3.amazonaws.com/open-to-cors/assignment.json";

const tableHead = [];
let allData = [];

fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => {
        let obj = data.products;
        for (const key in obj) {
            for (const kk in obj[key]) tableHead.push(kk);
            break;
        }

        for (const key in obj) {
            let tempObj = new Object();
            tempObj.productID = key;
            for (const k in obj[key]) tempObj[k] = obj[key][k];
            allData.push(tempObj);
        }

        for (let i = 0; i < allData.length; i++)
            allData[i].popularity = parseInt(allData[i].popularity);
        allData.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
        createTable(tableHead, allData);
        console.table(allData)
    });

const createTable = (tableHead, allData) => {
    let tableContent = document.querySelector(".tbody");
    tableContent.innerHTML = allData
        .map((elm, index) => {
            return `
            <tr class="tr-data">
                
                <td>${elm.title}</td>
                <td>${elm.price}</td>
               
            </tr>
        `;
        })
        .join("");
};
