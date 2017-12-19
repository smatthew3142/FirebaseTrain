// Initialize Firebase
  var config = {
    apiKey: "AIzaSyACD6JCYEizQe_vpG4GqWMOZd7jPOvvr14",
    authDomain: "trainschedule-f6619.firebaseapp.com",
    databaseURL: "https://trainschedule-f6619.firebaseio.com",
    projectId: "trainschedule-f6619",
    storageBucket: "",
    messagingSenderId: "241763334149"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding Train
  $("#submitTrain").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFrequency = moment($("#minutes").val().trim(), "m").format("X");
  var trainFirst = moment($("#firstTime").val().trim(),"hh:mm A").format("X");

  // Creates local train object
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    first: trainFirst
  };

  // Uploads train info to the database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.first);

  // Alert
  alert("Train has been added");

  $("#name").val("");
  $("#destination").val("");
  $("#minutes").val("");
  $("#firstTime").val("");
});