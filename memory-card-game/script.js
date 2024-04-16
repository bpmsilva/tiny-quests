
// number of rows and columns
var num_rows_cols = 4;

// the current selected number and the selected element
var selectedNumber = null;
var selectedElement = null;

// sleep function to wait for a while
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSelectedNumber() {
    // first selection
    if (selectedNumber === null) {
        // first selection (can't be matched with anything yet)
        selectedElement = this;
        selectedNumber = this.getAttribute('number');
        this.innerHTML = selectedNumber;
        this.classList.add('selected');
    } else {
        // second selection (can be matched with the first one)
        const currentNumber = this.getAttribute('number');
        this.innerHTML = currentNumber;

        // wait for 1 second to show the matched cards
        this.classList.add('selected');
        await sleep(1000);

        if (selectedNumber === currentNumber) {
            // There is a match!
            // add the matched class to the selected elements
            // this class remove pointer events and
            // change the color to be the same as the background
            selectedElement.classList.add('matched');
            this.classList.add('matched');
        }
        // images are not selected anymore
        this.classList.remove('selected');
        selectedElement.classList.remove('selected');

        // restart from the first selection
        selectedNumber = null;
    }
}


function createTable(randomNumbers) {
    const mainDiv = document.getElementById('main-div');
    const tableElement = document.createElement('table');

    mainDiv.appendChild(tableElement);
    for (let i = 0; i < num_rows_cols; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < num_rows_cols; j++) {
            let td = document.createElement('td');
            td.addEventListener('click', getSelectedNumber);

            td.setAttribute('number', randomNumbers[i + j * num_rows_cols]);
            row.appendChild(td);
        }

        tableElement.appendChild(row);
    }
}


// function generateRandomNumbers() {
//     // generate pairs of random numbers
//     const randomNumbers = [];
//     for (let i = 0; i < num_rows_cols * num_rows_cols / 2; i++) {
//         randomNumbers.push(i + 1);
//         randomNumbers.push(i + 1);
//     }

//     // TODO: remove this biased algorithm
//     // shuffle the randomNumbers
//     randomNumbers.sort(() => Math.random() - 0.5);

//     return randomNumbers;
// }

/* ChatGPT */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // swap elements
    }
}

function generateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < num_rows_cols * num_rows_cols / 2; i++) {
        randomNumbers.push(i + 1);
        randomNumbers.push(i + 1);
    }

    // Use the Fisher-Yates shuffle algorithm for unbiased shuffling
    shuffleArray(randomNumbers);

    return randomNumbers;
}


createTable(generateRandomNumbers());

