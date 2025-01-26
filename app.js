// Select elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const sadEmoji = document.querySelector("#sad-emoji");

let turnO = true; // Track whose turn it is
let gameActive = true; // Game is active or not

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle box clicks
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameActive && box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.disabled = true; // Disable the box
            turnO = !turnO; // Switch turns
            checkWinner(); // Check for winner
        }
    });
});

// Show winner message and trigger blast animation
const showWinner = (winner, pattern) => {
    msg.innerText = winner === "Tie" ? "It's a Tie!" : `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show the message container

    if (winner !== "Tie") {
        pattern.forEach((index) => {
            boxes[index].classList.add("blast"); // Add blast animation
        });
    } else {
        sadEmoji.classList.remove("hide"); // Show sad emoji for tie
    }

    gameActive = false; // Disable the game
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1, pattern); // Show the winner
            return;
        }
    }

    // Check for tie
    const isTie = Array.from(boxes).every((box) => box.innerText !== "");
    if (isTie) {
        showWinner("Tie", []);
    }
};

// Reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear all box content
        box.disabled = false; // Enable all boxes
        box.classList.remove("blast"); // Remove blast animation
    });
    turnO = true; // Reset to O's turn
    gameActive = true; // Re-activate the game
    msgContainer.classList.add("hide"); // Hide the message container
    sadEmoji.classList.add("hide"); // Hide sad emoji
};

// Add event listeners for buttons
resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
    resetGame(); // Reuse reset functionality
});


