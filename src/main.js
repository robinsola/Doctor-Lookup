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
       let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=4&user_key=${process.env.exports.apiKey}&query=${symptom}`;
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
       if (body.data.length === 0) {
         alert("There are currently no doctors available for that symptom, try a similar symptom.");
       }
       for (let j=0; j<body.data.length; j++) {
         let docList = body.data[j].practices;
         for(let i=0; i<docList.length; i++) {
           let name = docList[i].name;
           let address = `${docList[i].visit_address.street}, ${docList[i].visit_address.city}`;
           let phone = docList[i].phones[0].number;
           let website = docList[i].website;
           if (website === undefined) {
             website = "none";
           } else {
             website = `<a href='${website}' target='blank'>${website}</a>`;
           }
           let accepting = docList[i].accepts_new_patients;
           if (accepting === true) {
             accepting = "yes";
           } else {
             accepting = "no";
           }
           let list = `<li><strong>${name}</strong><br>Address: ${address}<br>Phone: ${phone}<br>Website: ${website}<br>Accepting new patients: ${accepting}</li>`;
           $("#list").append(list);
         }
        }
      }, function(error) {
        $("#showErrors").text(`There was an error processing your request: ${error.message}`);
      });
   });
 });
