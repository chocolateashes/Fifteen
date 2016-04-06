//Fifteen Puzzle
//Ashwini Velchamy & Gyeongbae Jung

"use strict";

window.onload = function(){ //onload window will create tiles add design and start timer
        createTiles(); 
        design();
        myTime = setInterval(function(){timer()},1000);
    }
var myTime = null;
var seconds =0;
var minutes = 0;
var rows = 4;
var columns = 4;
var number = 1; 
var board;
var moves =0;
var original1 = [];
var original2 = [];

function design(){ //function sets up the timer and the move counter
    var timing = document.createElement("div");
    timing.id = "timerbox";
    document.getElementById("controls").appendChild(timing);

    var moving = document.createElement("div");
    moving.id = "movebox";
    document.getElementById("controls").appendChild(moving);

    var x = document.querySelectorAll(".tiles");
    for(var i =0; i<x.length; i++){ //creates array of original positions of tiles
        var tile = x[i];
        original1.push(tile.style.top);
        original2.push(tile.style.left);
    }
}

function createTiles() { //function creates tiles
    for(var i = 0; i < columns; i++){
        for(var j = 0; j < rows; j++){
            var newTile = document.createElement('div');
            newTile.id = "tile"+number;
            newTile.className = 'tiles';
            newTile.style.left = (j * 100) + "px";
            newTile.style.top = (i * 100) + "px";
            newTile.innerHTML = number;

            document.getElementById('puzzlearea').appendChild(newTile);
            newTile.onmouseenter=mouseEnter;
            newTile.onmouseout = mouseOut;
            newTile.onclick = movetile;
            number++;
            }
        }   
    }

function mouseEnter(){ //onmouseenter the function checks if tile is movable
    var tile = document.getElementById(this.id);
    var empty = document.getElementById("tile16");
    
    var emptyleft = empty.style.left; 
    var emptytop = empty.style.top;   
    var currenttop = tile.style.top;  
    var currentleft = tile.style.left;
    var ncurrenttop = parseInt(currenttop);
    var differenceleft = Math.abs(parseInt(currentleft) - parseInt(emptyleft));
    var differencetop = Math.abs(parseInt(currenttop) - parseInt(emptytop));
    if((differenceleft == 100 && differencetop == 0) || (differencetop ==100 && differenceleft == 0)){
        this.style.borderColor = "red"; //if it is movable the color will change as will the pointer
        this.style.color = "red";
        this.style.cursor = "pointer";}

}

function mouseOut(){ //once the mouse leaves a tile it reverts to its default
        this.style.borderColor = "black";
        this.style.color = "aliceblue";
        this.style.cursor = "default";
}

function movetile(){ //function again checks if tiles that are clicked are movable and then moves them if they are
    checktiles();
    var tile = document.getElementById(this.id);
    var empty = document.getElementById("tile16");
    
    var emptyleft = empty.style.left; 
    var emptytop = empty.style.top;   
    var currenttop = tile.style.top;  
    var currentleft = tile.style.left;
    var ncurrenttop = parseInt(currenttop);
    var differenceleft = Math.abs(parseInt(currentleft) - parseInt(emptyleft));
    var differencetop = Math.abs(parseInt(currenttop) - parseInt(emptytop));
    if((differenceleft == 100 && differencetop == 0) || (differencetop ==100 && differenceleft == 0)){
        this.style.top = emptytop;
        this.style.left = emptyleft;
        var blah = parseInt(this.id.replace( /[^\d.]/g, '' )-1);
        document.getElementsByClassName("tiles")[blah].classList.add("animation");
        empty.style.top = currenttop;
        empty.style.left = currentleft;
        setTimeout(function(){document.getElementsByClassName("tiles")[blah].classList.remove("animation");},2000);
        moves++;
        document.getElementById("movebox").innerHTML="Moves: " +moves; 
    }
    checktiles();
}


function checktiles(){ //function checks if player has won game
    var check = 0;
    var xtop;
    var xleft;
    var x = document.querySelectorAll(".tiles"); 
    for(var i = 0; i<x.length; i++){ //check whether the current positions are same as original
        
        xtop = window.getComputedStyle(x[i]).getPropertyValue("top");
        xleft = window.getComputedStyle(x[i]).getPropertyValue("left");


        if(original1[i]==xtop){

            if(original2[i]== xleft){

                check++;}
        }
    }

    if(check==15){ //if positions are the same then player has won
        document.getElementById("output").innerHTML='YOU WON! </br> '+timestamp+'</br> Moves: '+moves;
        clearInterval(myTime);

    }
}




function myFunction(){ //shuffle algorithm
    var count = 0;
    for(var j=0; j<1000;j++){
        var empty = document.getElementById("tile16");
        var emptyleft = empty.style.left; 
        var emptytop = empty.style.top; 

        var movable = []; 
        var x = document.querySelectorAll(".tiles");
        for(var i =0; i<x.length; i++){ //puts surrounding pieces to blank in movable array

            var tile = x[i];
            var currenttop = tile.style.top;  
            var currentleft = tile.style.left;
            
            var differenceleft = Math.abs(parseInt(currentleft) - parseInt(emptyleft));
            var differencetop = Math.abs(parseInt(currenttop) - parseInt(emptytop));
            if((differenceleft == 100 && differencetop == 0) || (differencetop ==100 && differenceleft == 0)){
                movable.push(i);
            }
          
        }
        
        var rand = movable[Math.round(Math.random()*(movable.length-1))]; //chooses one of the surrounding tiles
        var movabletile = x[rand];
        var movabletiletop = movabletile.style.top;
        var movabletileleft = movabletile.style.left;
        movabletile.style.top = emptytop; //swaps with randomly chosen tiles
        movabletile.style.left = emptyleft;
        var blah = parseInt(movabletile.id.replace( /[^\d.]/g, '' )-1);
        document.getElementsByClassName("tiles")[blah].classList.add("animation");
        empty.style.top = movabletiletop;
        empty.style.left = movabletileleft;  
       
    } 

    
}

var timestamp; //timer
function timer(){
    if(seconds==60){
        minutes++;
        seconds = 0;
    }
    seconds++;
    timestamp="Time: "+minutes+":"+seconds;
    document.getElementById("timerbox").innerHTML = timestamp;
}