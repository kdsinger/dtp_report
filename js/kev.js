// function sumRandoms(setLength) {
//   let sum = 0;
//   for (let i = 0; i < setLength; i++) {
//     sum += Math.floor((Math.random()) * 100);
//     return sum;
//   }
// }
// // console.log('From random.js:', sumRandoms(10))
// let d = new Date();
//
// document.getElementById("demo1").innerHTML = sumRandoms(10);

// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("demo2").innerHTML =
//         this.responseText;
//     }
//   };
//   let rest_api = "http://localhost:2990/jira/rest/api/latest/search?jql=project=ZEP AND issuetype=Test"
//   // let rest_api = "ajax_info.txt"
//   xhttp.open("GET",
//      rest_api,
//     true);
//   xhttp.withCredentials = true;
//   xhttp.send();
// }
