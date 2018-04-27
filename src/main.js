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
       let request = new XHLHttpRequest();
       let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=10&query=${symptom}&user_key=f048ff73c0df48da555dbb3b47493488`;
       request.onload = function() {
         if (this.status === 200) {
           resolve(request.response);
         } else {
           reject(Error(request.statusText));
         }
       }
       request.open("GET", url, true);
       request.sent();
     });

     promise.then(function(response) {
       let body = JSON.parse(response);
       $("#name").text(`Name: ${body.data.practices}`);
      //  $("#address").text(`Address: ${body.main.humidity}`);
      //  $("#phone").text(`Phone: ${body.main.humidity}`);
      //  $("#website").text(`Phone: ${body.main.humidity}`);
      //  $("#accepting").text(`Accepting new patients: ${body.main.humidity}`);
     })

   });
 });
