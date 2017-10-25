// Initialize Firebase
var config = {
    apiKey: "AIzaSyDox-2LEnf3R_PBhtDUZQuugyZi13_BozI",
    authDomain: "traintime-30c09.firebaseapp.com",
    databaseURL: "https://traintime-30c09.firebaseio.com",
    projectId: "traintime-30c09",
    storageBucket: "traintime-30c09.appspot.com",
    messagingSenderId: "760211434318"
};

firebase.initializeApp(config);

var database = firebase.database();

function setTable(tObj){
    var row = $("<tr></tr>");
 
    row.append($("<td>" + tObj.t_name + "</td>"));
    row.append($("<td>" + tObj.t_dest + "</td>"));
    row.append($("<td>" + tObj.t_rate + "</td>"));
    row.append($("<td>" + tObj.t_next + "</td>"));
    row.append($("<td>" + tObj.t_away + "</td>"));

    $("#trains").append(row);
    
    
};

function submitButton(ev){

    var name = $("#currTrain").val().trim();
    var dest = $("#currDest").val().trim();
    var start = moment($("#currStrt").val().trim())._i; //as an integer
    var rate = parseInt($("#currRate").val().trim());
    var nextT = moment().diff(start, "minutes");
    console.log("Train: " + name);
    console.log("Going: " + dest);
    console.log("First: " + start);
    console.log("Freq: " + rate);
    console.log("next: " + nextT);

    ev.preventDefault();

    var trainObj = {
        t_name: name,
        t_dest: role,
        t_strt: start,
        t_rate: rate,
        t_next: nextT,
        t_away: (rate * nextT),
    };
        database.ref().push(trainObj);   
};

database.ref().on("value", function(childSnapshot){
    //console.log(childSnapshot.val());
    var trains = childSnapshot.val();
    $("#employees").empty();

    for(var i in trains){
        setTable(trains[i]);
    }
});

$(document).ready(function(){
  $("#submitBtn").on("click", function(event){
      submitButton(event);
  });
});

