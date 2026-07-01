const csvURL = "https://docs.google.com/spreadsheets/d/1hmzctcRgXPTqzQYDAx0Fvp_IDsJ45KZe1uLUoJ67V8w/export?format=csv&gid=0";

fetch(csvURL)
  .then(r => {
    console.log(r.status);
    return r.text();
  })
  .then(text => {
    console.log(text.substring(0, 300));

    const rows = text.trim().split("\n").map(row => row.split(","));

    const head = document.querySelector("thead");
    const body = document.querySelector("tbody");

    head.innerHTML =
      "<tr>" + rows[0].map(c => `<th>${c}</th>`).join("") + "</tr>";

    rows.slice(1).forEach(r => {
      body.innerHTML +=
        "<tr>" + r.map(c => `<td>${c}</td>`).join("") + "</tr>";
    });
  })
  .catch(err => {
    document.body.innerHTML += `<p style="color:red">${err}</p>`;
    console.error(err);
  });
