const sh = "1UGM3yaIqoa0UK9bKl-nEDAE5UoNQggWKDORZ64AR8qA";
var catagoriesdata = document.getElementById("catagoriesdata");
var additmes = document.getElementById("additmes")
var catagories = document.querySelector(".catagories");
var totalAmount = document.getElementById("totalAmount");
let totalAmounta = 0




fetch(`https://opensheet.elk.sh/${sh}/catagoriess`)
    .then(res => res.json())
    .then(data => {
        data.forEach(k => { 
            var span = document.createElement("span");
            span.textContent = k.catagories;
            catagories.append(span);
        })
    })
















catagories.addEventListener("click", (e) => {
    fetch(`https://opensheet.elk.sh/${sh}/product`)
        .then(res => res.json())
        .then(data => {
            var filterData = data.filter(k => {
                return k.catagories === e.target.textContent;
            });
            catagoriesdata.innerHTML = "";
            filterData.forEach(l => {
                var div = document.createElement("div");
                div.className = "itmes1";

                div.innerHTML = `
                <img src="./images/phone.png" alt="">                
                <label>${l.name}</label>                
                

                <div class="additmes">
                    <label class="plus">+</label>
                    <label class="quantity">0</label>
                    <label class="minus">-</label>
                </div>
            `;
                catagoriesdata.append(div);
                var minusdata = div.querySelector(".minus");
                var plusdata = div.querySelector(".plus");
                var quantity = div.querySelector(".quantity");


             

                // PLUS
                plusdata.addEventListener("click", () => {
                   
                    var value = Number(quantity.textContent);
                    value++;
                    quantity.textContent = value;

                    var existingRow = [...additmes.rows].find(row => {
                        return row.cells[1]?.textContent === l.name;
                    });

                    var itemRate = parseFloat(l.rate) || 0;

                    if (!existingRow) {
                        // Increment serial only for NEW items added to table
                        

                        var row = additmes.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);

                        cell1.textContent = row.rowIndex; // Serial number;
                        cell2.textContent = l.name;
                        cell3.textContent = value;
                        cell4.textContent = l.rate;
                        cell5.textContent = l.mrp;
                        cell6.textContent = itemRate * value;

                        // Add single item price to overall total
                        totalAmounta += itemRate;
                    } else {
                        // Update quantity and line item total
                        existingRow.cells[2].textContent = value;
                        existingRow.cells[5].textContent = itemRate * value;
                        
                        // Add price of ONE unit increase to overall total
                        totalAmounta += itemRate;
                    }

                    totalAmount.textContent = `Your Total Payable Amount : ${totalAmounta}`;
                });



                // MINUS
                minusdata.addEventListener("click", () => {
                    var value = Number(quantity.textContent);

                    // Do nothing if quantity is already 0
                    if (value <= 0) return;

                    value--;
                    quantity.textContent = value;

                    var existingRow = [...additmes.rows].find(row => {
                        return row.cells[1]?.textContent === l.name;
                    });

                    var itemRate = parseFloat(l.rate) || 0;

                    if (existingRow) {
                        // Subtract single unit rate from overall cart total
                        totalAmounta -= itemRate;
                        totalAmount.textContent = `Your Total Payable Amount : ${totalAmounta}`;

                        if (value === 0) {
                            // Delete row when quantity reaches zero
                            existingRow.remove();
                        } else {
                            // Update quantity and line item total
                            existingRow.cells[2].textContent = value;
                            existingRow.cells[5].textContent = itemRate * value;
                        }
                    }
                });

            });





        })
        .catch(err => {
            console.error("Error:", err);
        });
});

document.getElementById("showbill").addEventListener("click", () => {
    document.querySelector(".billdata").style.display = "block";
})