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
  var currentTime = moment();

  //Button for adding Train
  $("#submitTrain").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFrequency = $("#minutes").val().trim();
  var trainFirst = $("#firstTime").val().trim();

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


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store invariables
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainFirst = childSnapshot.val().first;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(trainFirst);

  
  var formatFirst = moment(trainFirst, "hh:mm A");

  var difference = currentTime.diff(moment(formatFirst), "minutes");

  // Calculate next train
  
  
  var remainder = difference % trainFrequency;
  var minAway = trainFrequency - remainder;
  console.log(minAway);
  var trainNext = moment().add(minAway, "minutes").format("hh:mm A");
  console.log(trainNext);
  

  // Add each train's data into the table
  $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainFirst + "</td><td>" + trainNext + "</td><td>" + minAway + "</td></tr>");
});

