//------------------Couleur random des cubes
let cubes = [...document.querySelectorAll('div.cube')];
let colorArray = ['#19A600', '#9892F0', '#8BF07A', '#F09762', '#A36C4B']

let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)]

for(let i=0;i<cubes.length;i++){
    cubes[i].style.background = randomColor;
}

//---------------------Curseur de la barre
let cursor = document.getElementById('cursor');
let container = document.getElementById('container');
container.addEventListener('mousemove', function(e){
    cursor.style.left = e.clientX + "px";
});


//---------------------Ball qui suit
let ball = document.getElementById('ball');
