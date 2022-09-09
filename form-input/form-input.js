let form = document.querySelector('form');
let name1 = document.querySelector('#name')
let email = document.querySelector('#email')
let date = document.querySelector('#date')
let country = document.querySelector('#country')
let timezone = document.querySelector('#timezone')
let comment = document.querySelector('#comment')
let agreement = document.querySelector('#agreement')

  form.onsubmit = function(e){
  e.preventDefault(); // stop the submit from actually happening
  
  display_agreement.innerText = "You have agreed to submit this form.  Here is your submitted data!";
  display_name.innerText = name1.value;
  display_email.innerText = email.value;
  display_date.innerText = date.value;
  display_country.innerText = country.value;
  display_comment.innerText = comment.value;
  display_comment.innerText = displayRadioValue;
  
  }
  
/*Display radio button option
function displayRadioValue() {
  var ele = document.getElementsByName('timezone');
    
  for(i = 0; i < ele.length; i++) {
      if(ele[i].checked)
      document.getElementById("radtime").innerHTML
              = ele[i].value;
  }
}*/

