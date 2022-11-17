function validateZip(str)

{
  return /^\d{5}(-\d{4})?$/.test(str);
}

function validateVol()
{
 
  let zipCode = document.getElementById("volZip").value;
  let msg = "";

  if(validateZip(zipCode))
  {
    window.location.href = "volDisplay.html"; 
  }
 else
   {
     msg="Please enter a valid zip code.";
   }
  document.getElementById("volzipValidate").innerHTML = msg;
  console.log("validateVol");


document.querySelector('volZip').onsubmit = e => {
  e.target.submit();
  e.target.reset();
};
}

fetch('https://api.211.org/search/v1/api/Search/Guided?TaxonomyCode=PX-2300.3100&Location=29304', {
        method: 'GET',
        // Request headers
        headers: {
            'Cache-Control': 'no-cache',
            'Api-Key': '29c05567d5dc4f9d8908d930f4766ac0',}
    })
    .then(response => {
    return response.json();   
  }).then(data => {
      console.log(data.results);
      for (const entry of data.results) {
        console.log(entry.document.id)
        var volDisplay = document.getElementById("volunteerResults");
        var div = document.createElement("volListCard");
       
        div.innerHTML =  `<h4 id="orgName">${entry.document.nameOrganization}</h4><h4 id="orgDescription"></h4>${entry.document.descriptionOrganization}</h4><br><h5>Our Location:</h5>${entry.document.address1PhysicalAddress}<br>${entry.document.cityPhysicalAddress
        }<br>${entry.document.countryPhysicalAddress}`
        volDisplay.appendChild(div);
      }
  })
  .catch(err => console.error(err));