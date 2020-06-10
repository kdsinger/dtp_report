"use strict";

function loadDoc() {
  document.getElementById("hello_demo").innerText = test.helloName({name:'Detailed Test Procedures'}).toString();
  let restRequestConcurrentQueue = new TaskQueue(1);
  let txt = "";
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:2990/jira/rest/api/latest/search?jql=project=ZEP AND issuetype=Test",
      dataType: "json"
    }).then(function (rest_data) {
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
            if(++completed === rest_data.issues.length && !hasErrors) {
            }
            done()
          });
        });
      });

      document.getElementById("dtp_results").innerHTML = DTP.Results.IssueList(rest_data).toString();
    });
  });
}

function populate_web_item(){
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:2990/jira/rest/api/latest/search?jql=project=ZEP AND issuetype=Test",
      dataType: "json"
    }).then(function (rest_data) {
      console.log(`This is the rest data object ${rest_data}`);
      let issues = {issues: [{ id: 1, key: "one", joe: "j1"}, {id: 2, key: "two", joe: "j2"},
          { id: 3, key: "three", joe: "j3"}, {id: 4, key: "four", joe: "j4"}]};
      document.getElementById("web_item").innerHTML = DTP.Results.IssueList(rest_data).toString();
    });
  });
}

function download(url, txt, callback) {
  let restRequestConcurrentQueue = new TaskQueue(1);
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
    // Identify the number of completed rest requests
    let completed = 0, hasErrors = false;
    zapi_data.executions.forEach(execution => {
      // Put each rest request on the queue
      restRequestConcurrentQueue.pushTask(done => {
        // Download the rest data
        download_steps(execution, txt,err => {
          if(err) {
            hasErrors = true;
            console.log(err);
            return;
          }
          if(++completed === zapi_data.executions.length && !hasErrors) {
          }
          done()
        });
      });
    });
    return callback();
  });
}

function download_steps(url, txt, callback) {
  console.log(`Downloading Step Data${url.id}`);
  $.ajax({
    url: `http://localhost:2990/jira/rest/zapi/latest/stepResult?executionId=${url.id}`,
    dataType: "json",
    async: true
  }).then(function (zapi_data) {
    console.log(`Downloaded and saved: ${url}`);
    console.log(`ZAPI data ${zapi_data}`)
    zapi_data.forEach(execution => {
      console.log(`execution id = ${execution.id}`);
    });
    let steps = {executed_steps: zapi_data}
    document.getElementById("web_item").innerHTML = DTP.Step.Results.StepList(steps).toString()
    return callback();
  });
}