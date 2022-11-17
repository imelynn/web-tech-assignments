fetch('https://api.211.org/search/v1/api/Search/Guided?TaxonomyCode=BH-8400.3000&Location=29304&Distance=500&Top=100&OrderBy=Relevance&SearchMode=Any HTTP/1.1', {
        method: 'GET',
        // Request headers
        headers: {
            'Cache-Control': 'no-cache',
            'Api-Key': '8681f8e51ffb4e1bb89ab9dad911397c',}
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
