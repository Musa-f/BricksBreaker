//------------------Style 
let bricks = document.querySelectorAll('div.cube');
let colorArray = ['#19A600', '#9892F0', '#8BF07A', '#F09762', '#A36C4B']

for(brick of bricks){
    let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    brick.style.background = randomColor;
}


//---------------------Cursor
const container = document.querySelector('.container');
const cursor = document.querySelector('#cursor');

container.addEventListener('mousemove', (e) => {
    const containerRect = container.getBoundingClientRect(); //retourne un objet DOMRect fournissant des informations sur la taille d'un élément et sa position relative par rapport à la zone d'affichage.
    const x = e.clientX - containerRect.left; // Position relative de la souris par rapport au conteneur
  
    if(x >= 0 && x <= containerRect.width){ // Si la position de la souris est supérieur ou égal à 0 et inférieur à la largeur du conteneur
        cursor.style.left = x + 'px';
    }
});


//---------------------Animation 
let win = document.getElementById("win");
let ball = document.getElementById('ball');
let positionXball = 400;
let positionYball = 330;
let directionX = 2; 
let directionY = -2;
let inputScore = document.getElementById("nbscore");
let score = 0;

function animate(){
    const containerRect = container.getBoundingClientRect();
    
    if( positionXball >= 0 
        && positionXball <= containerRect.width
    ){
        positionXball += directionX;
    }else{
        directionX *= -1;
        positionXball += directionX;
    }
    
    if( positionYball >= 0 
        && positionYball <= containerRect.bottom
    ){
        positionYball += directionY;
        collisionCursor();    
    }else{
        directionY *= -1;
        positionYball += directionY;
    }

    collisionBrick();
    inputScore.innerText = score;
    ball.style.left = positionXball + 'px';
    ball.style.top = positionYball + 'px';
    
    if(score < 40){
        requestAnimationFrame(animate);
    }else{
        showVictoryMessage();
    }
}

function collisionCursor(){
    if( positionYball + ball.clientHeight >= cursor.offsetTop 
        && positionXball + ball.clientWidth >= cursor.offsetLeft 
        && positionXball <= cursor.offsetLeft + cursor.clientWidth
    ){
        directionY *= -1;
    }
    // Si la balle ne touche pas le curseur et descend en dehors de frame vers le bas
    if(positionYball + ball.clientHeight > cursor.offsetTop + cursor.clientHeight) {
        initializeGame();
    }
}

function initializeGame(){
    positionXball = 400;
    positionYball = 330;
    score = 0;
    cursor.style.left = 380 + "px";
    for(let i = 0; i < bricks.length; i++){
        let brick = bricks[i];
        brick.style.visibility = 'visible'; 
    }
}

function collisionBrick(){
    for(let i = 0; i < bricks.length; i++){
        let brick = bricks[i];
        if(brick.style.visibility !== 'hidden'){
            if( positionYball <= brick.offsetTop + brick.clientHeight 
                && positionYball + ball.clientHeight >= brick.offsetTop 
                && positionXball + ball.clientWidth >= brick.offsetLeft 
                && positionXball <= brick.offsetLeft + brick.clientWidth
            ){
                score += 1;
                directionY *= -1;
                brick.style.visibility = 'hidden'; 
            }
        }
    }
}

function showVictoryMessage(){
    win.style.display = "block";
    let replay = document.querySelector("button");
    replay.addEventListener("click", function(){
        initializeGame();
        win.style.display = "none";
        animate();
    });
}

animate();


