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
       let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=f048ff73c0df48da555dbb3b47493488&skip=0&limit=10&query=${symptom}`;
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
       let display = body.data[0].practices;
       for(let i=0; i<display.length; i++) {
         $("#list").append(`<li>${display[i].name}</li>`);
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
