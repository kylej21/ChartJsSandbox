import Chart from 'chart.js/auto'
(async function(){
    let userCounts = {}
    fetch("https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-200/recent.json",{
        method:"GET",
        mode: 'no-cors',
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    }).then((res)=>
    {
        res = res.json();
        console.log(res);
        for(const song in res["data"]){
            let artist = res["data"][song]["artist"];
            if(userCounts[artist]){
                userCounts[artist]=userCounts[artist]+1;
            }
            else{
                userCounts[artist]=1;
            }
        }
        new Chart(
            document.getElementById('musicians'),
            {
            type: 'doughnut',
            data: {
                labels: Object.keys(userCounts),
                datasets: [
                {
                    label: 'Billboard top 200',
                    data: Object.values(userCounts),
                    hoverOffset:4
                },
                ]
            }
            }
        );
    })
})();