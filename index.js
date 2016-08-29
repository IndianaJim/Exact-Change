/* ---------------------------------------------
Advanced Algorithm Challenge - Exact Change

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.

Otherwise, return change in coin and bills, sorted in highest to lowest order.
-------------------------------------------------- */

function checkCashRegister(price, cash, cid) {
  var change = 0;
  var changeRemaining = 0;
  var changeCount = 0;
  var changeArray = [];
  var count = 0; //number of coins or bills in that drawer bin
  var amt = 0; //$ value of items in that drawer bin
  var stillZeroed = 1; //test if all bins empty

  change = cash - price;
  changeRemaining = change;

  //function to round to 2 decimals
  function parseNumber(val, decimalPlaces) {
    if (decimalPlaces === null) decimalPlaces = 0;
    var ret = Number(val).toFixed(decimalPlaces);
    return Number(ret);
  }

  //function to check each drawer bin for change
  function openDrawer(label, amt) {
    count = parseNumber(cid[i][1] / amt, 0);
    if (label == "PENNY") {
      changeCount = changeRemaining / amt; //# needed for change from bin
    } else {
      changeCount = parseInt(changeRemaining / amt); //# needed for change from bin
    }
    if (changeCount >= 1 && changeCount < count) { //enough is available in bin
      changeArray.push([label, (changeCount * amt)]);
      cid[i][1] = cid[i][1] - (changeCount * amt);
      changeRemaining = parseNumber(changeRemaining - (changeCount * amt), 2);
      stillZeroed = 0;
    } else if (changeCount >= 1 && changeCount > count && count !== 0) { //some available in bin, take all
      changeArray.push([label, (count * amt)]);
      changeRemaining = parseNumber(changeRemaining - (count * amt), 2);
      cid[i][1] = 0;
    } else if (changeCount >= 1 && changeCount == count) { //enough in bin, take all
      changeArray.push([label, cid[i][1]]);
      changeRemaining = parseNumber(changeRemaining - cid[i][1], 2);
      cid[i][1] = 0;
    } //end if
  } //end function open drawer  

  for (var i = (cid.length - 1); i >= 0; i--) {

    switch (cid[i][0]) {
      case "ONE HUNDRED":
        openDrawer("ONE HUNDRED", 100);
        break;
      case "TWENTY":
        openDrawer("TWENTY", 20);
        break;
      case "TEN":
        openDrawer("TEN", 10);
        break;
      case "FIVE":
        openDrawer("FIVE", 5);
        break;
      case "ONE":
        openDrawer("ONE", 1);
        break;
      case "QUARTER":
        openDrawer("QUARTER", 0.25);
        break;
      case "DIME":
        openDrawer("DIME", 0.10);
        break;
      case "NICKEL":
        openDrawer("NICKEL", 0.05);
        break;
      case "PENNY":
        openDrawer("PENNY", 0.01);
        break;
      default:
        console.log("default - drawer error");

    } //end switch 

  } //end for loop going through change 

  if (changeRemaining >= 0.01) {
    //console.log("ins funds");
    return "Insufficient Funds";
  } else if (stillZeroed === 1) {
    //console.log("closed");
    return "Closed";
  } else {
    console.log(changeArray);
    return changeArray;
  }
}

/*checkCashRegister(19.50, 20.00, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1.00],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);*/
//checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);