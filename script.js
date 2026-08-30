const sh = "1UGM3yaIqoa0UK9bKl-nEDAE5UoNQggWKDORZ64AR8qA";

fetch(`https://opensheet.elk.sh/${sh}/product`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("Error:", err);
  });