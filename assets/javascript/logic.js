// Document ready function
$(document).ready(function() {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA4FFiqX0MdlSJMoEAzaKl-Z5QlhGh22BQ",
        authDomain: "train-station-fa0e4.firebaseapp.com",
        databaseURL: "https://train-station-fa0e4.firebaseio.com",
        projectId: "train-station-fa0e4",
        storageBucket: "train-station-fa0e4.appspot.com",
        messagingSenderId: "163201641206",
        appId: "1:163201641206:web:207674661449d20cde1ad7",
        measurementId: "G-Y759675DRS"
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Assign the reference to the database to a variable named 'database'
    var database = firebase.database();

    // Initial variables
    var name;
    var trainDestination;
    var firstTrain;
    var trainFrequency = 0;

    // On click function to add user's input for new train to firebase
    $("#submit-button").click(function(event) {
        event.preventDefault();

        // Just a bunch of vars to grab the doms
        name = $("#name-input").val().trim();
        trainDestination = $("#destination-input").val().trim();
        firstTrain = $("#time-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();

        console.log(name);
        console.log(trainDestination);
        console.log(firstTrain);
        console.log(trainFrequency);

        database.ref().push({
            name: name,
            destination: trainDestination,
            firstTrain: firstTrain,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $('form')[0].reset();
    }); 

    database.ref().on("child_added", function(childSnapshot) {
        var currentTime = moment();
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "HH:mm");
        var frequency = childSnapshot.val().frequency;
        console.log(frequency);
       
        var nextTrain;
        var minAway;

        if (firstTrainNew.isAfter(currentTime)) {
            nextTrain = firstTrainNew;
            minAway = firstTrainNew.diff(currentTime, "minutes");
        } else {
            var minutesSinceFirst = currentTime.diff(firstTrainNew, "minutes");
            var minutesSinceLast = minutesSinceFirst % frequency;
            minAway = frequency - minutesSinceLast;
            nextTrain = currentTime.add(minAway, "minutes");
        }
        
        var tRow = $("<tr>");
        var trainName = $("<td>").text(childSnapshot.val().name);
        var trainDestination = $("<td>").text(childSnapshot.val().destination);
        var freqMin = $("<td>").text(childSnapshot.val().frequency);
        var nextTrainDisplay = $("<td>").text(nextTrain.format("HH:mm"));
        var minAwayDisplay = $("<td>").text(minAway);
        tRow.append(trainName, trainDestination, freqMin, nextTrainDisplay, minAwayDisplay);
        $("tbody").append(tRow);

        

        



























        // var firstTrainNew = moment(childSnapshot.val().firstTrain, 'hh:mm');
        // var diffTime = moment().diff(moment(firstTrainNew), 'minutes');
        // var remainder = diffTime % childSnapshot.val().frequency;
        // var minAway = childSnapshot.val().frequency - remainder;
        // var nextTrain = moment().add(minAway, 'minutes');
        // nextTrain = moment(nextTrain).format('hh:mm');
    });
}); 
