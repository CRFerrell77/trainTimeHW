// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyDox-2LEnf3R_PBhtDUZQuugyZi13_BozI",
//     authDomain: "traintime-30c09.firebaseapp.com",
//     databaseURL: "https://traintime-30c09.firebaseio.com",
//     projectId: "traintime-30c09",
//     storageBucket: "traintime-30c09.appspot.com",
//     messagingSenderId: "760211434318"
// };

// firebase.initializeApp(config);

// Initialize Firebase ver 2.0
var config = {
    apiKey: "AIzaSyCjeKg8pnlzuNMmkFHJXWXKlqcRiFahRZQ",
    authDomain: "traintake2.firebaseapp.com",
    databaseURL: "https://traintake2.firebaseio.com",
    projectId: "traintake2",
    storageBucket: "traintake2.appspot.com",
    messagingSenderId: "207933808421"
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
    
    ev.preventDefault();

    // Train name
    var name = $("#currTrain").val().trim();
    
    //Destination
    var dest = $("#currDest").val().trim();

    //First train time
    var start = moment($("#currStrt").val().trim())._i;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(start, "hh:mm").subtract(1, "years");

    // Freq between trains
    var rate = parseInt($("#currRate").val().trim());

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % rate;
    console.log("remainder: " + tRemainder);

    // Minute Until Train
    var t_away = rate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + t_away);

    // Next Train
    var nextT = moment().add(t_away, "minutes");
    var nextTconvert = moment(nextT).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextTconvert);
 
    console.log("Train: " + name);
    console.log("Going: " + dest);
    console.log("First: " + start);
    console.log("Freq: " + rate);
  
    var trainObj = {
        t_name: name,
        t_dest: dest,
        t_strt: start,
        t_rate: rate,
        t_next: nextTconvert,
        t_away: t_away,
    };
        
    database.ref().push(trainObj);

};

database.ref().on("value", function(childSnapshot){
    var trains = childSnapshot.val();
    console.log(trains);

    $("#trains").empty();

    for(var i in trains){
        setTable(trains[i]);
    };

});

$(document).ready(function(){
  $("#submitBtn").on("click", function(event){
      submitButton(event);
  });
});

