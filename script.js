const sh = "1UGM3yaIqoa0UK9bKl-nEDAE5UoNQggWKDORZ64AR8qA";
var catagoriesdata = document.getElementById("catagoriesdata");
var additmes = document.getElementById("additmes")
var catagories = document.querySelector(".catagories");
var totalAmount = document.getElementById("totalAmount");
let totalAmounta = 0

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
                <span>${l.description}</span>

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
                    if (!existingRow) {
                        var row = additmes.insertRow(-1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        var cell6 = row.insertCell(5);
                        cell1.textContent = "a8";
                        cell2.textContent = l.name;
                        cell3.textContent = value;
                        // rate × quantity
                        cell4.textContent = l.rate;
                        cell5.textContent = l.mrp;
                        cell6.textContent = parseInt(l.rate) * value;
                        totalAmounta += parseInt(l.rate) * value
                        totalAmount.innerHTML = `${totalAmounta}`
                    } else {
                        existingRow.cells[2].textContent = value;
                        // rate × updated quantity
                        existingRow.cells[5].textContent =
                            parseInt(l.rate) * value;
                        totalAmounta = parseInt(l.rate) * value
                        totalAmount.innerHTML = `${totalAmounta}`
                    }

                });
                // MINUS
                minusdata.addEventListener("click", () => {
                    var value = Number(quantity.textContent);
                    if (value > 0) {
                        value--;
                    }
                    quantity.textContent = value;
                    // Table me product ki row find karo
                    var existingRow = [...additmes.rows].find(row => {
                        return row.cells[1]?.textContent === l.name;
                    });
                    if (existingRow) {
                        if (value === 0) {
                            // Quantity 0 ho gayi to row delete
                            existingRow.remove();
                        } else {
                            // Quantity update
                            existingRow.cells[2].textContent = value;
                            existingRow.cells[5].textContent =
                                parseInt(l.rate) * value;
                            totalAmounta = parseInt(l.rate) * value
                            totalAmount.innerHTML = `${totalAmounta}`

                        }

                    }

                });

            });

        })
        .catch(err => {
            console.error("Error:", err);
        });
});