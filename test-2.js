function drawDiamond(num) {
    // check for errors
    if (typeof num !== "number") {
      return console.log("Not a number")
    }
  
    if (num % 2 === 0) {
      return console.log("Not an odd number")
    }
  
    if (num < 0) {
      return console.log("Cannot accept negative number.")
    }
  
    // if no error, run function
    let current_number_of_asterisks = 1
  
    for (var i = 0; i < Math.ceil(num / 2) - 1; i++) {
        console.log(
          " ".repeat(num - current_number_of_asterisks) +
          "* ".repeat(current_number_of_asterisks)
        )
  
        current_number_of_asterisks += 2
    }
  
    for (var i = Math.ceil(num / 2); i > 0 / 2; i--) {
        console.log(
          " ".repeat(num - current_number_of_asterisks) +
          "* ".repeat(current_number_of_asterisks)
        )
  
        current_number_of_asterisks -= 2
    }
  }
  
  drawDiamond(15)