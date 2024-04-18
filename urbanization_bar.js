function startAnimation() {
    // Remove click text and start animation
    this.innerText = '0%';
    this.style.cursor = 'default';

    // Animate progress bar
    let progressBar = document.getElementById('u-progress-bar');
    progressBar.style.width = '78.1%';

    // Animate percentage increase and change font size
    let percentage = 0;
    let interval = setInterval(function () {
        percentage += 0.781; // Increment value
        document.getElementById('u-text-above').innerText = `${percentage.toFixed(1)}%`;
        if (percentage >= 78.1) {
            clearInterval(interval);
            document.getElementById('u-text-above').innerText = `78.1%`;
            //  document.getElementById('text-above').style.fontSize = 'initial'; // Reset font size
        }
    }, 20); // Time interval to match the 2 seconds of the progress bar animation

    // Show the text below after the progress bar animation
    setTimeout(() => {
        document.getElementById('u-text-below').innerText = 'Level of Australian Urbanization in 2023';
        document.getElementById('u-text-below').style.opacity = 1;
    }, 1500); // Time delay to match the progress bar animation

    document.getElementById('u-text-above').removeEventListener('click', startAnimation);
}

document.getElementById('u-text-above').addEventListener('click', startAnimation);
