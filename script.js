
createGrid(16);

// Button event listener
document.getElementById('grid-size-btn').addEventListener('click', function() {
    let size = prompt('Enter number of squares per side (max 100):', 16);
    size = parseInt(size);
    
    if (size > 0 && size <= 100) {
        createGrid(size);
    } else {
        alert('Please enter a number between 1 and 100');
    }
});

// Grid creation function
function createGrid(size) {
    const container = document.getElementById('container');
    
    // Clear existing grid
    container.innerHTML = '';
    
    // Calculate square size accounting for borders
    const squareSize = (960 / size) - 2; // Subtract 2px for borders (1px each side)
    
    // Create new grid
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        square.addEventListener('mouseover', function() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            // Get current opacity or set to 0.1 if none
            let opacity = parseFloat(this.style.opacity) || 0;
            opacity = Math.min(opacity + 0.6, 1);

            // Apply styles
            this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            this.style.opacity = opacity;
            });
        
        container.appendChild(square);
    }
}