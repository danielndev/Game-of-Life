let grid;
let squareSize = 25;

let spawnChance = 0.05;

let width;
let height;

let gridSizeX;
let gridSizeY;

let running = false
function setup() {
    frameRate(60);
    width = windowWidth;
    height = windowHeight - 100;
    createCanvas(width, height);
    
    gridSizeX = Math.floor((width - 1)/ squareSize);
    gridSizeY = Math.floor((height - 2) / squareSize);

    grid = [];
    for(let i = 0; i < gridSizeX; i ++){
        grid.push([]);
        for(let j = 0; j < gridSizeY; j ++){
            let alive = false;
            if(Math.random() < spawnChance){
                alive = true;
            }
            grid[i].push({
                alive: alive,
                neighbours: 0
            })
        }
    }
}

function draw() {
    background(220);
    let offsetX = (width - grid.length * squareSize) / 2;
    let offsetY = (height - grid[0].length * squareSize) / 2;
    for(let i = 0; i < grid.length; i ++){  
        for(let j = 0; j < grid[i].length; j ++){
            fill(grid[i][j].alive ? 0 : 255);
            rect(offsetX + i*squareSize, offsetY + j*squareSize, squareSize, squareSize);
        }
    }

    if(running){
        document.getElementById("running").innerHTML = "Running";
        frameRate(10);
        applyAllCounts();
        checkRules();
    }else{
        document.getElementById("running").innerHTML = "You can draw squares";
        frameRate(60);
        if(mouseIsPressed){
            if(mouseX / squareSize >= 0 && mouseX / squareSize < gridSizeX && mouseY / squareSize >= 0 && mouseY / squareSize < gridSizeY){
                grid[Math.floor(mouseX / squareSize)][Math.floor(mouseY / squareSize)].alive = true;
            } 
        }
    }
}

function applyAllCounts(){
    for(let i = 0; i < grid.length; i ++){  
        for(let j = 0; j < grid[i].length; j ++){
            grid[i][j].neighbours = countNeighbours(i,j);
        }
    }
   
}

function countNeighbours(x, y){
    let count = 0;
    for(let i = x - 1; i <= x + 1; i ++){
        for(let j = y - 1; j <= y + 1; j ++){
            if(i >= 0 && i < gridSizeX && j >= 0 && j < gridSizeY && !(i == x && j == y)){
                if(grid[i][j].alive == true){
                    count ++;
                }
            }
        }
    }

    return count;
}
function checkRules(){
    //Any live cell with fewer than two live neighbours dies, as if by underpopulation
    //Any live cell with two or three live neighbours lives on to the next generation.
    //Any live cell with more than three live neighbours dies, as if by overpopulation.
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    for(let i = 0; i < grid.length; i ++){  
        for(let j = 0; j < grid[i].length; j ++){
            if(grid[i][j].alive && grid[i][j].neighbours < 2){
                grid[i][j].alive = false;
            }else if(grid[i][j].alive && grid[i][j].neighbours < 4){
                grid[i][j].alive = true;
            }else if(grid[i][j].alive && grid[i][j].neighbours > 3){
                grid[i][j].alive = false;
            }else if(!grid[i][j].alive && grid[i][j].neighbours == 3){
                grid[i][j].alive = true;
            }
        }
    }
}

document.getElementById("go_button").onclick = () => {
    running = true;
}

document.getElementById("clear_button").onclick = () => {
    for(let i = 0; i < grid.length; i ++){  
        for(let j = 0; j < grid[i].length; j ++){
            grid[i][j].alive = false;
        }
    }
    running = false;
    
}

