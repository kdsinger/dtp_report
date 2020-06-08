function loadDoc() {
  let txt = "";
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:2990/jira/rest/api/latest/search?jql=project=ZEP AND issuetype=Test",
      dataType: "json",
      complete: function (rest_data) {
        txt = "<table>" +
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
        txt += "</tbody></table>"
        document.getElementById("demo").innerHTML = txt;
      }
    }).then(function (rest_data) {

    });
  });
}


