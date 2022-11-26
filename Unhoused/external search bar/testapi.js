const jobRes = document.getElementById("jobResults");

async function sheResults(){
    const URL = `https://api.211.org/search/v1/api/Search/Keyword?Keyword=Homeless%20Shelter&Location=New%20York&Top=10&OrderBy=Relevance&SearchMode=Any`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayResources(data.Search);
}

function displayResources(){
    sheList.innerHTML = "";
}