
const quadro1 = document.getElementById("quadro1");
const quadro2 = document.getElementById("quadro2");
const quadro3 = document.getElementById("quadro3");
const quadro4 = document.getElementById("quadro4");
const round = document.getElementById('rodada');
const high = document.getElementById('recorde')
const body = document.body;

var jogo = [];
var input = [];
var rodada = 0;
var recorde = 0;
var vel = 1;

var tempoAceso = 0.8;
var tempoApagado = 0.3;
var primeiro = true;

async function start(){
    await delay(0.3);
    input = [];
    rodada += 1;
    round.innerHTML = "Rodada: " + rodada;
    if(rodada == 1){
        tempoAceso = 0.8;
        tempoApagado = 0.3;
    }
    jogo.push(getNumero());
    if(jogo.length % 5 == 0){
        tempoAceso -= 0.07;
        tempoApagado -= 0.03;
    }
    await displayJogo();
}

async function displayJogo(){
    vel = jogo.length / 5;
    if(jogo.length >= vel){
        tempoAceso -= 0.05;
        tempoApagado -= 0.02;
    }
    if(!primeiro){
        await acendeQuadro(jogo[0]);
        primeiro = true;
    }
    for(let i = 0; i < jogo.length; i++){
        if(jogo.length >= 10){
            await changeColor(i);
        }
        await acendeQuadro(jogo[i]);
        await delay(tempoApagado);
    }
}

async function changeColor(num){
    await fetch('https://www.colr.org/json/colors/random/' + jogo.length)
        .then(res => {
            return res.json();
        }).then(data => {
            let message = data.colors[num].hex;
            let color = '#' + message;
            body.style.backgroundColor = color;
        })
}

function delay(n){
    return new Promise(function (resolve){
        setTimeout(resolve, n * 1000);
    })
}

async function acendeQuadro(num){
    switch(num){
        case 1:
            quadro1.style.backgroundColor = "lightyellow";
            break;
        case 2:
            quadro2.style.backgroundColor = "lightblue";
            break;
        case 3:
            quadro3.style.backgroundColor = "lightgreen";
            break;
        case 4:
            quadro4.style.backgroundColor = "rgb(253, 123, 123)";
            break;
    }
    await delay(tempoAceso);
    switch(num){
        case 1:
            quadro1.style.backgroundColor = "yellow";
            break;
        case 2:
            quadro2.style.backgroundColor = "blue";
            break;
        case 3:
            quadro3.style.backgroundColor = "limegreen";
            break;
        case 4:
            quadro4.style.backgroundColor = "red";
            break;
    }
    await delay(0.2);
}

function getNumero(){
    let min = 1;
    let max = 5;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (5 - 1)) + 1;
}

async function quadroOn(num) {
    if(input.length < jogo.length){
        input.push(num);
    }

    await acendeQuadro(num);
    let aux = [];

    for(let i = 0; i < input.length; i++){
        aux[i] = jogo[i];
    }
    
    for(let i = 0; i < input.length; i++){
        if(input[i] != aux[i]){
            endGame();
            return;
        }
    }

    if(input.length == jogo.length){
        finishRodada();
    }
}

function finishRodada(){

    acendeQuadro(1);
    acendeQuadro(2);
    acendeQuadro(3);
    acendeQuadro(4);

    primeiro = false;
    start();
}

async function endGame(){
    if(recorde < rodada) recorde = rodada;
    jogo = [];
    rodada = 0;
    vel = 1;
    primeiro = true;
    round.innerHTML = "Rodada: " + rodada;
    high.innerHTML = 'Recorde: ' + recorde;
    quadro1.style.backgroundColor = 'red';
    quadro2.style.backgroundColor = 'red';
    quadro3.style.backgroundColor = 'red';
    quadro4.style.backgroundColor = 'red';
    await delay(0.5);
    quadro1.style.backgroundColor = "yellow";
    quadro2.style.backgroundColor = "blue";
    quadro3.style.backgroundColor = "limegreen";
    quadro4.style.backgroundColor = "red";
}
