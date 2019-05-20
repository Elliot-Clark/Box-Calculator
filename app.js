const tripleStyle = document.getElementsByClassName("tripleField")[0];
const singleStyle = document.getElementsByClassName("singleField")[0];
function toggleInput() {
    if (tripleStyle.style.display === "none") {
      tripleStyle.style.display = "block";
      singleStyle.style.display = "none";
    } else {
      singleStyle.style.display = "block";
      tripleStyle.style.display = "none";
    }
}

const doc = document.getElementsByTagName("input");
for (let w = 0; w < doc.length; w++) {
  doc[w].addEventListener("keyup", function(event) {
    event.preventDefault();
      if (event.keyCode === 13) {
          init();
      } if (event.keyCode === 110) {
        for (y = 0; y < doc.length - 1; y++) {
          doc[y].value = "";
          document.getElementsByClassName("answer")[0].innerHTML = "";
          reset();
        }
      }                                                           
  });
}

function init() {
  reset();
  let dimensions = [];
  let extra = parseFloat(document.getElementById('pad').value);
  if (tripleStyle.style.display !== "none") {
    let inputs = document.getElementsByClassName("tripleInput");
    let measurements  = [].map.call(inputs, function(input) {
      dimensions.push(parseFloat(input.value) + extra);
      });
  } else {
    let inputs = document.getElementsByClassName("singleInput")[0].value.split('');
    if (inputs.length == 6) {
      for (let t = 0; t < 6; t+=2) {
        dimensions.push(parseFloat(inputs[t] + inputs[t+1]) + extra);
      }
    } else {
      return
    }
  }
  dimensions.sort(function(a, b){return b-a});
  compare(dimensions);
}

function compare(dimensions) {
  let answer = [];
  for (i = 0; i < Boxes.length; i++) {
    let remainder = 0;
    for (j = 1; j < Boxes[i].length; j++) {
      if (dimensions[j-1] <= Boxes[i][j]) {
        remainder += Boxes[i][j] - dimensions[j-1];
      } else {
        document.getElementById(Boxes[i][0]).style.display = "none";
        remainder = false;
        break;
      }
    }
    if (remainder || remainder === 0) {
      let temp = [];
      temp.push(Boxes[i][0]);
      temp.push(remainder);
      answer.push(temp);
      if (answer.length > 1) {
        if (answer[0][1] > answer[1][1]) {
          answer.splice(0, 1);
        } else {
          answer.splice(1, 1);
        }
      }
    } else {
      document.getElementsByClassName("answer")[0].innerHTML = "Error";
    }
  }
  document.getElementsByClassName("answer")[0].innerHTML = answer[0][0];
}

function reset() {
  for (y = 0; y < Boxes.length; y++) {
    document.getElementById(Boxes[y][0]).style.display = "";
  }
}

const Boxes = [
  [2, 15, 11, 2],
  [3, 10, 6, 4],
  [4, 18, 4, 4],
  [5, 13, 13, 7],
  [6, 10, 9, 7],
  [8, 24, 19, 4],
  [9, 12, 12, 11],
  [10, 20, 20, 12],
  [11, 16, 16, 4],
  [12, 20, 10, 7],
  [14, 15, 15, 15],
  [15, 23, 15, 8],
  [16, 20, 14, 3],
  [17, 17, 17, 7],
  [31, 31, 12, 8],
  [34, 22, 16, 14],
  [37, 28, 20, 8]
]
