const sh = "1UGM3yaIqoa0UK9bKl-nEDAE5UoNQggWKDORZ64AR8qA";
var catagoriesdata = document.getElementById("catagoriesdata")






var catagories = document.querySelector(".catagories");

catagories.addEventListener("click", (e) => {


    alert(e.target.textContent)
    fetch(`https://opensheet.elk.sh/${sh}/product`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error("Error:", err);
        });
});