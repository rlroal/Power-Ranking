const csvURL = "https://docs.google.com/spreadsheets/d/1hmzctcRgXPTqzQYDAx0Fvp_IDsJ45KZe1uLUoJ67V8w/export?format=csv&gid=0";

Papa.parse(csvURL, {

    download: true,

    header: true,

    skipEmptyLines: true,

    complete: function(results){

        console.log(results);

        const table = document.getElementById("rankingTable");

        const thead = table.querySelector("thead");

        const tbody = table.querySelector("tbody");

        tbody.innerHTML = "";
        thead.innerHTML = "";

        if(results.errors.length){

            console.error(results.errors);

        }

        const headers = Object.keys(results.data[0]);

        const headRow = document.createElement("tr");

        headers.forEach(header=>{

            const th=document.createElement("th");

            th.textContent=header;

            headRow.appendChild(th);

        });

        thead.appendChild(headRow);

        results.data.forEach(row=>{

            const tr=document.createElement("tr");

            headers.forEach(header=>{

                const td=document.createElement("td");

                td.textContent=row[header];

                tr.appendChild(td);

            });

            tbody.appendChild(tr);

        });

    },

    error:function(err){

        console.error(err);

        document.body.innerHTML +=
        "<p style='color:red'>CSV를 불러오지 못했습니다.</p>";

    }

});
