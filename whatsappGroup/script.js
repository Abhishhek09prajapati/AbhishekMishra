var catagoriesDiv = document.getElementById("catagoriesDiv")
var joinLinks = document.getElementById("col2")

const sh = "1EuqJxpY5KCyjKtJFR4bZOn2Hdz7Ma6kGpMBZ4LEyg9U"



fetch("https://api.npoint.io/f1c1bf09eb96314477d5?t=" + Date.now())
    .then(res => res.json())
    .then(data => {
        data.catagories.forEach(t => {
            var d = document.createElement("div")
            d.className = "divdata"
            d.innerHTML = `${t}`
            catagoriesDiv.append(d)

            d.addEventListener("click", () => {
                joinLinks.innerHTML = ""
                clickmeandsearcch(t)
            })
        });
    })




function clickmeandsearcch(t) {

    fetch(`https://opensheet.elk.sh/${sh}/shop`)
        .then(res => res.json())
        .then(data => {

            var d = data.filter(j => {
                return j.whatsappcata === t
            })
        
            d.forEach(k => {
                var div = document.createElement("div")
                div.className = "joinDiv"
                div.innerHTML = `<h3>${k.WhatsappGorupName}</h3>
            <button>Join Now</button>`

                joinLinks.append(div)

                div.addEventListener("click",()=>{
                    window.open(`${k.Whatsappgrouplinks}`,"_blanks")
                })

            })

        })
        .catch(error => {
            console.log("Error:", error);
        });
}