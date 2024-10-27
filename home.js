const education = document.getElementById("education");
const networth = document.getElementById("networth");
const caste = document.getElementById("caste");
const skills = document.getElementsByClassName("skill");
const gossips = document.getElementsByClassName("reputation");

const calculate = (event) => {
    event.preventDefault(); 

    let name = document.getElementById("userName").value;
    let startingBid = document.getElementById("startingBid").value;
    let loveLet = document.getElementById("loveLetter").value;

    if (name.trim().length > 0 && startingBid.trim().length > 0) {
        let initial = Number(startingBid);    
        let finalPrice = initial * parseFloat(education.value) * parseFloat(networth.value);
        finalPrice += parseFloat(caste.value);

        // Using loop to go through each checked item
        finalPrice = getCheckboxValuesForLoop(Array.from(skills), finalPrice);
        // Get selected age and apply its multiplier
        finalPrice = getRadioValue(document.querySelectorAll('input[name="age"]'), finalPrice);
        // Using loop to go through each checked item
        finalPrice = getCheckboxValuesForLoop(Array.from(gossips), finalPrice);

        document.getElementById('finalPrice').innerText = `Final Price: $${finalPrice.toFixed(3)}`;

        let person = {
            bride_name: name,
            bride_price: finalPrice,
            letter_to_bride: loveLet,
        }
        
        document.getElementById("finalPrice").innerHTML = `The price for your bride ${person.bride_name} is $${person.bride_price.toFixed(3)}. Your love letter is "${person.letter_to_bride}"`;
    } else {
        alert("Please enter both your name and starting price.");
    }
}

const getCheckboxValuesForLoop = (htmlCollection, price) => {
    htmlCollection.forEach(item => {
        if (item.checked) {
            price = Number.isInteger(Number(item.value)) ? price + Number(item.value) : price * Number(item.value);
        }
    });
    return price;
}

const getRadioValue = (nodeList, price) => {  
    nodeList.forEach(item => {
        if (item.checked) {
            price *= Number(item.value);
        }
    });
    return price;
}

document.getElementById("formId").addEventListener("submit", calculate);
