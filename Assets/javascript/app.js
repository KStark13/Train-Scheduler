$(document).ready(function(){
        //INITIALIZE FIREBASE
    var config = {
        apiKey: "AIzaSyBdAXQyDqb5LjOFapDs2nOlILgs7lRiO1A",
        authDomain: "train-schedule-7b69b.firebaseapp.com",
        databaseURL: "https://train-schedule-7b69b.firebaseio.com",
        projectId: "train-schedule-7b69b",
        storageBucket: "train-schedule-7b69b.appspot.com",
        messagingSenderId: "1046070539091"
      };
      firebase.initializeApp(config);
    //INITIALIZE VALUES
    var database = firebase.database();
    

    //CAPTURE BUTTON CLICK
    $("#add-train").on("click", function(event){
        event.preventDefault();

         //GRAB VALUES FROM TEXT BOXES
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var frequency = $("#frequency").val().trim();
        // FIRST TIME CONVERTED
        var firstTrain = moment($("#first-train").val().trim(), "hh:mm").subtract(1, "years").format("X");
     
/*
            console.log(trainName);
            console.log(destination);
            console.log(firstTrain);
            console.log(frequency);
            console.log(currentTime);
    */

         //CODE FOR HANDLING THE PUSH
         database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
         });

         $("#train-name").val("");
         $("#destination").val("");
         $("#first-train").val("");
         $("#frequency").val("");
        
        //PREVENT PAGE FROM REFRESHING
        return false;

    });

       
    //FIREBASE WATCHER & INITIAL LOADER
    database.ref().on("child_added", function(childSnapshot, prevChildKey){
            
            var firebaseName = childSnapshot.val().trainName;
            var firebaseDestination = childSnapshot.val().destination;
            var firebaseFirstTrain = childSnapshot.val().firstTrain;
            var firebaseFrequency = childSnapshot.val().frequency;

            //LOG EVERYTHING THATS COMING OUT OF SNAPSHOT
            console.log(childSnapshot.val().trainName);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().firstTrain);
            console.log(childSnapshot.val().frequency);
    console.log("start")
        //CURRENT TIME
        var currentTime = moment();
        //MAKE TRAIN TIME NEATER
        var trainTime = moment.unix(firebaseFirstTrain).format("hh:mm");
        console.log(trainTime);
        //TIME DIFFERENCE
        var diffTime = currentTime.diff(moment(trainTime), "minutes");
        console.log(diffTime);
        //TIME APART (REMAINDER)
        var trainRemain = diffTime % firebaseFrequency;
        console.log(trainRemain);
        //MIN UNTIL ARRIVAL
        var minUntil = firebaseFrequency - trainRemain;
        console.log(minUntil);
        //NEXT ARRIVAL TIME
        var nextArrival = currentTime.add(minUntil, "minutes").format("hh:mm A");
    console.log("end")
            //FULL LIST OF ITEMS TO THE TABLE
            $("#new-train").append("<tr><td>" + firebaseName + 
            "</td><td>" + firebaseDestination + 
             "</td><td>" + firebaseFrequency + 
              "</td><td>" + nextArrival + 
                "</td><td>" + minUntil +"</td></tr>");
        
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
/*          //LIVE CLOCK IN HEADER
    var datetime = null,
            date = null;

    var update = function () {
        date = moment(new Date())
        datetime.html(date.format('h:mm:ss a'));
    };

    $(document).ready(function(){
        datetime = $('#current-time')
        update();
        setInterval(update, 1000);
    });   */

});

         
