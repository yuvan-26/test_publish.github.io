function startAnimation() {
    // Start with the base text
    this.innerText = '0 Kilohectare';
    this.style.cursor = 'default';

    // Animate progress bar
    let progressBar = document.getElementById('k-progress-bar');
    let maxValue = 10; // Maximum value of the progress bar
    let currentValue = 0; // Starting value
    let targetValue = 8.73; // Target value
    let interval = setInterval(function () {
        currentValue += 0.0873; // Increment value
        progressBar.style.width = `${(currentValue / maxValue) * 100}%`; // Calculate width percentage
        document.getElementById('k-text-above').innerText = `${currentValue.toFixed(2)} Kilohectare`;
        // When current value reaches the target, stop the animation
        if (currentValue >= targetValue) {
            clearInterval(interval);
            document.getElementById('k-text-above').innerText = `${targetValue.toFixed(2)} Kilohectare`;
            // Reset font size if necessary
        }
    }, 20); // Adjust the time interval to match the desired animation speed

    // After animation, show text below
    setTimeout(() => {
        document.getElementById('k-text-below').innerText = 'Natural Forests lost in Victoria, Australia 2023';
        document.getElementById('k-text-below').style.opacity = 1;
    }, 2000); // Delay to match the progress bar animation

    // Remove the event listener to prevent further clicks
    document.getElementById('k-text-above').removeEventListener('click', startAnimation);
}

document.getElementById('k-text-above').addEventListener('click', startAnimation);