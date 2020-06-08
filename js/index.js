"use strict";

function loadDoc() {
  let restRequestConcurrentQueue = new TaskQueue(1);
  let rest_urls = ["http://www.google.com",
    "https://www.google.com/calendar?tab=wc",
    "https://www.google.com",
    "http://www.google.com/finance?tab=we",
    "https://www.google.com/intl/en/about/products?tab=wh"];
  let txt = "";
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:2990/jira/rest/api/latest/search?jql=project=ZEP AND issuetype=Test",
      dataType: "json"
    }).then(function (rest_data) {
      txt = "<table border='1'>" +
          "<thead><tr>" +
          "<th id=\"basic-fname\">Capability</th>" +
          "<th id=\"basic-lname\">Prodcedure</th>" +
          "<th id=\"basic-cname\">Total Steps</th>" +
          "<th id=\"basic-aname\">Steps Executed</th>" +
          "<th id=\"basic-bname\">Steps Passed</th>" +
          "<th id=\"basic-ename\">Percent Executed</th>" +
          "<th id=\"basic-gname\">Percent Passed Of Executed</th>" +
          "</tr></thead><tbody>"
      txt += "<tr>";
      for (let i = 0; i < rest_data.issues.length; i++) {
        let component = ""
        for (let j = 0; j < rest_data.issues[i].fields.components.length; j++) {
          if (j > 0 && j < rest_data.issues[i].fields.components.length)
            component += ", "
          component += rest_data.issues[i].fields.components[j].name
        }
        txt += "<td>" + component + "</td>" +
            "<td>" + rest_data.issues[i].id + "</td>" +
            "<td>" + rest_data.issues[i].key + "</td>";
        txt += "</tr>";
      }

      // Identify the number of completed rest requests
      let completed = 0, hasErrors = false;
      rest_data.issues.forEach(link => {
        // Put each rest request on the queue
        restRequestConcurrentQueue.pushTask(done => {
          // Download the rest data
          download(link, txt,err => {
            if(err) {
              hasErrors = true;
              console.log(err);
              return;
            }
            if(++completed === rest_urls.length && !hasErrors) {
            }
            done()
          });
        });
      });
      txt += "</tbody></table>"
      document.getElementById("demo").innerHTML = txt;
    });
  });
}

function download(url, txt, callback) {
  console.log(`Downloading ${url.id}`);
  $.ajax({
    url: `http://localhost:2990/jira/rest/zapi/latest/execution?issueId=${url.id}`,
    dataType: "json",
    async: true
  }).then(function (zapi_data) {
    console.log(`Downloaded and saved: ${url}`);
    console.log(`ZAPI data ${zapi_data}`)
    zapi_data.executions.forEach(execution => {
      console.log(`Top level execution status is ${zapi_data.status[execution.executionStatus].name} for test ${execution.issueKey}`);

    });
    // txt += "<tr>" +
    //     "<td>" + zapi_data.issues[i].id + "</td>" +
    //     "<td>" + zapi_data.issues[i].key + "</td>";
    // txt += "</tr>";
    return callback();
  });
}

function download_steps(url, txt, callback) {
  console.log(`Downloading Step Data${url.id}`);
  $.ajax({
    url: `http://localhost:2990/jira/rest/zapi/latest/execution?issueId=${url.id}`,
    dataType: "json",
    async: true
  }).then(function (zapi_data) {
    console.log(`Downloaded and saved: ${url}`);
    console.log(`ZAPI data ${zapi_data}`)
    zapi_data.executions.forEach(execution => {
      console.log(execution.id);
    });
    return callback();
  });
}