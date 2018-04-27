import {DocApi} from './doc-api.js'
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

 $(document).ready(function() {
   $("#user-input").submit(function(event) {
     event.preventDefault();
     let doctor = $("#doctor").val();
     let symptom = $("#symptom").val();
     $("#doctor").val("");
     $("#symptom").val("");
     let docApi = new DocApi();
     let promise = docApi.doctorPromise(doctor, symptom);

     promise.then(function(response) {
       let body = JSON.parse(response);
       if (body.data.length === 0) {
         alert("There are currently no doctors available for your criteria.");
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
