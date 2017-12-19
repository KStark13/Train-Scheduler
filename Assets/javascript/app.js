//INITIALIZE FIREBASE
  var config = {
    apiKey: "AIzaSyBdAXQyDqb5LjOFapDs2nOlILgs7lRiO1A",
    authDomain: "train-schedule-7b69b.firebaseapp.com",
    databaseURL: "https://train-schedule-7b69b.firebaseio.com",
    projectId: "train-schedule-7b69b",
    storageBucket: "",
    messagingSenderId: "1046070539091"
  };
  firebase.initializeApp(config);
//INITIALIZE VALUES
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

//CAPTURE BUTTON CLICK
$("#add-train").on("click" function(event){
    event.preventdefault();

     //GRAB VALUES FROM TEXT BOXES
     trainName = $("#train-name").val().trim();
     destination = $("#destination").val().trim();
     firstTrain = $("#first-train").val().trim();
     frequency = $("#frequency").val().trim();

     //CODE FOR HANDLING THE PUSH
     database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
});

   
//FIREBASE WATCHER & INITIAL LOADER
database.ref().on("child_added", function(childSnapshot){

        //LOG EVERYTHING THATS COMING OUT OF SNAPSHOT
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().dateAdded);

        //FULL LIST OF ITEMS TO THE WELL
        $("#new-train").append("<tr><td>" + childSnapshot.val().trainName + 
        "</td><td>" + childSnapshot.val().destination + 
         "</td><td>" + childSnapshot.val().firstTrain + 
          "</td><td>" + childSnapshot.val().frequency + "</td></tr>");
    
    //HANDLE THE ERRORS
    }, function(errorObject){
        console.log("Errors handled" + errorObject.code);
    });
    
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

        //CHANGE THE HTML TO REFLECT
        $("#train-name").text(snapshot.val().trainName);
        $("#destination").text(snapshot.val().destination);
        $("#first-train").text(snapshot.val().firstTrain);
        $("#frequency").text(snapshot.val().frequency);
    }); 
        

         

    

    


    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

   /* // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));*/