console.log("------------------------------------");
console.log("utils > index.js");
console.log("------------------------------------");

// ------------------------------------------------------
//  standard function
// ------------------------------------------------------
const utilities = {
    isNumeric: (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
};

module.exports = utilities;