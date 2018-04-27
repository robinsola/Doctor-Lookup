// import { title } from './title';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

 $(document).ready(function() {
   $("#user-input").submit(function(event) {
     event.preventDefault();

     let symptom = $("#symptom").val();
     $("#symptom").val("");

     let promise = new Promise(function(resolve, reject) {
       let request = new XMLHttpRequest();
       let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=f048ff73c0df48da555dbb3b47493488&skip=0&limit=4&query=${symptom}`;
       request.onload = function() {
         if (this.status === 200) {
           resolve(request.response);
         } else {
           reject(Error(request.statusText));
         }
       }
       request.open("GET", url, true);
       request.send();
     });

     promise.then(function(response) {
       let body = JSON.parse(response);
       for (let j=0; j<body.data.length; j++) {
         let docList = body.data[j].practices;
         for(let i=0; i<docList.length; i++) {
           let name = docList[i].name;
           let address = `${docList[i].visit_address.street}, ${docList[i].visit_address.city}`;
           let phone = docList[i].phones[0].number;
           let website = docList[i].website;
           let accepting = docList[i].accepts_new_patients;
           if (website === undefined) {
             website = "none";
           } else {
             website = `<a href='${website}'>${website}</a>`;
           }
           let list = `<li>Name: ${name}<br>Address: ${address}<br>Phone: ${phone}<br>Website: ${website}<br>Accepting new patients: ${accepting}</li>`;
           $("#list").append(list);
         }
       }
      //  $("#name").text(`Name: ${display.name}`);
      //  $("#address").text(`Address: ${body.data[0].practices[0].visit_address.street}`);
      //  $("#phone").text(`Phone: ${body.data[0].practices[0].phones[0].number}`);
      //  $("#website").text(`Website: ${body.data[0].practices[0].website}`);
      //  $("#accepting").text(`Accepting new patients: ${body.data[0].practices[0].accepts_new_patients}`);
      }, function(error) {
        $("#showErrors").text(`There was an error processing your request: ${error.message}`);
      });
   });
 });
