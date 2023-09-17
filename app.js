let gameSeq=[];
let userSeq=[];

let btns=["pink","green","orange","blue"];
let started=false;
let level=0;
let levelMax=-1;

let h2=document.querySelector("h2");
//track if any key pressed then game starts
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        console.log("game started");
        levelUp();
    }
});
function levelUp(){
    //reset userSeq because we need user neet to press all buttons from start
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random button choose
    let randomIndex=Math.floor(Math.random()*3);
    let randomColor=btns[randomIndex];
    //random color returns number & find color (i.e color is our class name)
    let randomBtn=document.querySelector(`.${randomColor}`);
    // console.log(randomIndex);
    // console.log(randomColor);
    // console.log(randomBtn);
   gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function btnPress(){
    let btn=this;
    //flash user selected button
    userFlash(btn);
    //store user selected color
    let userColor=btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);  //pass last index to check
    
}
//check user pressed same color as game color
function checkAns(lastIdx){
    // console.log("Curr level : ", level)

    // compare last value of userSeq & gameSeq 
    if(userSeq[lastIdx]==gameSeq[lastIdx]){
        // console.log("Same value");
        //middle case where remaining elements need to check  Do nothing

        //last case where all colors are matched then increase level
        if(userSeq.length==gameSeq.length){
            //delay some time
            setTimeout(levelUp,1000);
        }
    }
    else{
        levelMax=Math.max(level,levelMax);
        h2.innerHTML=`Game Over! <b><i>Your Score was ${level}</i></b>.<br>Highest Score was ${levelMax} <br> Press any key to start`;
        //once user choose wrong color change background color temporary
        document.querySelector("body").style.backgroundColor="#FF1800";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="bisque";
        }, 150);
        //once game over reset game
        reset();
    }
}


let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        //remove class after some flash
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        //remove class after some flash
        btn.classList.remove("user-flash");
    }, 250);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}


