// If enter is pressed, button to calculate average is pressed
$(document).ready(function () {
  $(document).on("keypress", function (e) {
    if (keyCode === 13) {
      $("#calculateBtn").click();
    }
  });
});

let result = 0; // Final display result
let totalWeight = 0; // Total of the weight values

// Function to calculate average
function findAverage() {
  let marks = []; // Array to collect list of marks
  let total = 0; // Total of all marks
  let average = 0; // Average of marks
  let inputAmount = 0; // Keep track of how many inputs there are
  let weightVals = []; // Array to collect list of weighs
  result = 0; // Final display result
  totalWeight = 0; // Total of the weight values

  // Checking how many input boxes there are
  let idName = "mark"; // Establishing id of mark inputs
  let idNum = 1;
  let find = idName.concat(idNum);

  // While weight input box is found, amount of inputs go up
  while (document.getElementById(find) != null) {
    inputAmount++;
    idNum++;
    find = idName.concat(idNum);
  }

  // Matching amount of inputs to highest input id number
  while (idNum != inputAmount) {
    idNum--;
  }

  // Calculating average of marks from inputs
  for (let x = 1; x <= inputAmount; x++) {
    let inputPrefix = "mark"; // Establishing id of mark inputs, then adding its value to array of values
    let inputID = inputPrefix.concat(x);
    marks[x] = document.getElementById(inputID).value;
    let mark = parseFloat(marks[x]);

    let weightPrefix = "weight"; // Establishing id of weight inputs, then adding its value to array of values
    let weightID = weightPrefix.concat(x);
    weightVals[x] = document.getElementById(weightID).value;
    let weight = parseFloat(weightVals[x]);

    // If there is no mark, mark is given default value of 0
    if (isNaN(mark)) {
      mark = 0;
      totalWeight--;
    }

    // If there is no weight, weight is given default value of 1
    if (isNaN(weight)) {
      weight = 1;
    }

    totalWeight += weight;
    trueMark = mark * weight;
    total += trueMark;
    average = total / totalWeight;
    result = Math.round(average * 10) / 10; // Only display one decimal place of the mark
  }

  // If mark doesn't exist, displayed result is 0
  if (isNaN(result)) {
    result = 0;
  }

  // Displaying result in HTML
  if (result == 0) {
    $(document).ready(function () {
      $("#averageText").text("0.0%");
    });
  }

  else {
    $(document).ready(function () {
      $("#averageText").text(result + "%");
    });
  }

  updateScore();
}

// Establishing button and keeping track of its clicks
let buttonClick = 0;
let button = document.querySelector("#addMark");

// Adding more inputs for more marks to be considered
function addInput() {
  buttonClick++;

  // Button clicks are tracked, and when it reaches 9, the button is disabled to limit the amount of inputs available
  if (buttonClick > 8) {
    button.disabled = true;
  }

  // Checking how many input boxes there are
  let idName = "mark"; // Establishing id of mark inputs
  let idNum = 1;
  let inputAmount = 0;
  let find = idName.concat(idNum);

  // While weight input box is found, amount of inputs go up
  while (document.getElementById(find) != null) {
    inputAmount++;
    idNum++;
    find = idName.concat(idNum);
  }

  // Matching amount of inputs to highest input id number
  while (idNum != inputAmount) {
    idNum--;
  }

  // Establishing set of inputs
  let setName = "set";
  let inputCount = 5;
  let setNum = inputAmount / inputCount + 1;
  let setID = setName.concat(setNum);

  // Adding more inputs by prepending a created input along breaklines in case more marks are needed
  $(document).ready(function () {

    // Creating div for next set
    $("#markContain").append(
      $(document.createElement("div")).prop({
        class: "child",
        id: setID,
      })
    );

    // Adding another set of 4 inputs
    for (let x = 1; x <= inputCount; x++) {

      // Establishing id of weight and mark inputs
      let inputPrefix = "mark";
      let weightPrefix = "weight";
      let suffix = idNum + x;
      let inputID = inputPrefix + suffix;
      let weightID = weightPrefix + suffix;

      // Establishing id of weight inputs, this time with hashtag in front of it
      let weightName = "#weight";
      let findWeight = weightName.concat(1);
      let input = document.querySelector(findWeight);

      // Creating mark input
      $("#" + setID).append(
        $(document.createElement("input")).prop({
          type: "text",
          class: "markInput",
          id: inputID,
          maxlength: "4",
        })
      );

      // Creating weight input that is disabled
      if (input.disabled == true) {
        $("#" + setID).append(
          $(document.createElement("input")).prop({
            type: "text",
            class: "weightInput",
            id: weightID,
            maxlength: "4",
            disabled: "true",
          })
        );
      }

      // Creating weight input that is not disabled
      else if (input.disabled == false) {
        $("#" + setID).append(
          $(document.createElement("input")).prop({
            type: "text",
            class: "weightInput",
            id: weightID,
            maxlength: "4",
          })
        );
      }

      $("#" + setID).append($(document.createElement("br")));

      $("#" + setID).append($(document.createElement("br")));
    }
  });
}

// Enabling weights for average calculator
function addWeight() {

  // Checking how many input boxes there are
  let idName = "mark";
  let idNum = 1;
  let inputAmount = 0;
  let find = idName.concat(idNum);

  // Matching amount of inputs to highest id input
  while (document.getElementById(find) != null) {
    inputAmount++;
    idNum++;
    find = idName.concat(idNum);
  }

  // Matching amount of inputs to highest input id number
  while (idNum != inputAmount) {
    idNum--;
  }

  // Establishing id of weight inputs
  let weightName = "#weight";
  let weightNum = 1;
  let findWeight = weightName.concat(weightNum);
  let input = document.querySelector(findWeight);

  // Enabling or disabling all weight inputs
  for (let x = 1; x <= idNum; x++) {
    findWeight = weightName.concat(weightNum);
    input = document.querySelector(findWeight);
    weightNum++;

    if (input.disabled == true) {
      input.disabled = false;
    } else if (input.disabled == false) {
      input.value = ""; // Erase text when input is disabled
      input.disabled = true;
    }
  }

  // Enabling Score Needed weight input
  let inputWeight = document.getElementById("weightNeeded");

  if (inputWeight.disabled == true) {
    inputWeight.disabled = false;
  }
  
  else if (inputWeight.disabled == false) {
    inputWeight.value = ""; // Erase text when input is disabled
    inputWeight.disabled = true;
  }
}

// Updates the Score Needed
function updateScore() {

  // Retrieving elements from HTML
  let desiredScore = parseInt(document.getElementById("scoreNeeded").value);
  let inputWeight = parseInt(document.getElementById("weightNeeded").value);
  let output = document.getElementById("scoreText");

  // If there is no weight, weight is given default value of 1
  if (isNaN(inputWeight)) {
    inputWeight = 1;
  }

  let combinedWeight = totalWeight + inputWeight;
  let score =
    (desiredScore * combinedWeight - result * totalWeight) / inputWeight;

  // If there is no weight, weight is given default value of 1
  if (isNaN(score)) {
    output.innerHTML = "-%";
  }
  
  // Displaying Score Needed
  else {
    let display = Math.round(score * 10) / 10 + "%";
    output.innerHTML = display;
  }
}