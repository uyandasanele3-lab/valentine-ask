// ...existing code...
let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("Picture"); // <-- fixed id
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
// ...existing code...
const png = ["assets/images/Proposal.png", "assets/images/No.png", "assets/images/No.png", "assets/images/No.png"];
const buttonMessages = ["Are you sure??", "Pookie please", "Pookie PLEASE", "You can't do this to me!"];

// no button clicked
noButton.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
        // change image (use gifElement)
        gifElement.src = png[noClicks];
    }

    noButton.textContent = buttonMessages[noClicks % buttonMessages.length];

    // Adjust button width to fit text
    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;

    // decrease the size of the no button
    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // Get current yes button width dynamically
    const baseWidth = parseFloat(getComputedStyle(yesButton).width) || 0;
    const maxYesWidth = parseFloat(getComputedStyle(yesButton).maxWidth) || 200;
    const scaledWidth = baseWidth * yesScale;

    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5;
        yesButton.style.transform = `scale(${yesScale})`;

        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        const currentGap = parseFloat(getComputedStyle(buttonContainer).gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor);
        buttonContainer.style.gap = `${newGap}px`;
    }

    noClicks++;
});