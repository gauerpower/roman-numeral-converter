let arabicToRoman = true;

function convertToArabic(num) {
  let total = 0;
  while (num[0] === "M") {
    total += 1000;
    num = num.slice(1);
  }
  if (num.startsWith("CM")) {
    total += 900;
    num = num.slice(2);
  }
  if (num[0] === "D") {
    total += 500;
    num = num.slice(1);
  }
  if (num.startsWith("CD")) {
    total += 400;
    num = num.slice(2);
  }
  while (num[0] === "C") {
    total += 100;
    num = num.slice(1);
  }
  if (num.startsWith("XC")) {
    total += 90;
    num = num.slice(2);
  }
  if (num[0] === "L") {
    total += 50;
    num = num.slice(1);
  }
  if (num.startsWith("XL")) {
    total += 40;
    num = num.slice(2);
  }
  while (num[0] === "X") {
    total += 10;
    num = num.slice(1)
  }
  if (num.startsWith("IX")) {
    total += 9;
    num = num.slice(2);
  }
  if (num[0] === "V") {
    total += 5;
    num = num.slice(1);
  }
  if (num.startsWith("IV")) {
    total += 4;
    num = num.slice(2);
  }
  while (num[0] === "I") {
    total += 1;
    num = num.slice(1);
  }
  if (total > 5000) {
    return "Error: Number too large."
  }
  else if (num.length === 0) {
    return total;
  } else {
    return "Error: Enter a valid Roman numeral."
  }
}



function convertToRoman(num) {
  //   Need to convert the input number to a string to be able to use charAt on it
  let strNum = String(num);

  // Returns in case number is outside range
  if (strNum <= 0) {
    return "Error: Enter a positive number."
  }
  if (strNum > 5000) {
    return "Error: Number too large."
  }
  if (/\D/.test(num)) {
    return "Error: Enter an integer."
  }

  //   Defining objects with the Roman numeral letter for each place value
  let hundreds = {
    nineDigit: "CM",
    fiveDigit: "D",
    fourDigit: "CD",
    oneDigit: "C"
  };
  let tens = {
    nineDigit: "XC",
    fiveDigit: "L",
    fourDigit: "XL",
    oneDigit: "X"
  };
  let ones = {
    nineDigit: "IX",
    fiveDigit: "V",
    fourDigit: "IV",
    oneDigit: "I"
  };

  //   Thousands place doesn't need to be an object because it's just going to be letter M
  let thousands = Number(strNum.charAt(strNum.length - 4));

  //   Adding the place values of the input number to the relevant objects
  hundreds.placeValue = Number(strNum.charAt(strNum.length - 3));
  tens.placeValue = Number(strNum.charAt(strNum.length - 2));
  ones.placeValue = (Number(strNum.charAt(strNum.length - 1)));

  // Nested function that goes through process of converting each
  // input place value to its Roman numeral letters.
  function placeValueFormatter(placeObj) {
    if (placeObj.placeValue === 9) {
      romanNums += placeObj.nineDigit;
    }
    if (placeObj.placeValue >= 5 && placeObj.placeValue < 9) {
      romanNums += placeObj.fiveDigit;
      while (placeObj.placeValue > 5) {
        romanNums += placeObj.oneDigit;
        placeObj.placeValue--;
      }
    }
    if (placeObj.placeValue === 4) {
      romanNums += placeObj.fourDigit;
    }
    if (placeObj.placeValue < 4) {
      while (placeObj.placeValue > 0) {
        romanNums += placeObj.oneDigit;
        placeObj.placeValue--;
      }
    }
  }
  // Declaring an empty string that the Roman letters will be concatenated onto:
  let romanNums = "";

  // Adding M's for the thousands place:
  while (thousands > 0) {
    romanNums += ("M");
    thousands--;
  }

  // Calling the nested function for each place-value object,
  // which contains the predefined letters for each digit
  // as well as the place value of the passed-in number
  placeValueFormatter(hundreds);
  placeValueFormatter(tens);
  placeValueFormatter(ones);

  return romanNums;
}


const form = document.querySelector("form");
const result = document.querySelector("#result");
const togglerButton = document.querySelector("#toggler");

togglerButton.addEventListener("click", function(){
  arabicToRoman = !arabicToRoman;
  form.elements.num.value = "";
  result.style.visibility = "hidden";
  if (/5000/.test(document.querySelector("#input-label").innerHTML)){
    document.querySelector("#input-label").innerHTML = "Enter a Roman numeral:";
} else {
    document.querySelector("#input-label").innerHTML = "Enter a number between 1 and 5000:";
}}
)

form.addEventListener("submit", function(event) {
  if (arabicToRoman === true) {
  let arabicNum = form.elements.num.value;
  let resultText = convertToRoman(arabicNum);
  result.innerHTML = resultText;
  result.style.visibility = "hidden";
  setTimeout(function() {
    result.style.visibility = "visible"
  }, 100);
} else {
let romanNum = form.elements.num.value;
let resultText = convertToArabic(romanNum);
result.innerHTML = resultText;
result.style.visibility = "hidden";
setTimeout(function() {
  result.style.visibility = "visible"
}, 100);
}
  event.preventDefault();
})
