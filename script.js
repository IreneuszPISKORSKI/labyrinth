let board = document.getElementById("board");
const start = 0;
let nbOfLab = 0;
creationLabyrinth();




let wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

function creationLabyrinth(){
    let addAllLabs = "";
    for (let a=3; a<=25; a++){
        for (let b=0; b<3; b++){
            let variant = "ex-" + b;
            let labAct = labyrinth[a][variant];
            let size = Math.sqrt(labAct.length);
            let addthing = ""; 

            let counter = 0;
            for(let i=0; i<size ;i++){
                let test = "";
                for(let j=0;j<size;j++){
                    // let posX = labAct[counter].posX;
                    // let posY = labAct[counter].posY;
                    let classBorder = "element";
            
                    if (labAct[counter].walls[0]){
                        classBorder += " borderTop";
                    }
                    if (labAct[counter].walls[1]){
                        classBorder += " borderRight";
                    }
                    if (labAct[counter].walls[2]){
                        classBorder += " borderBottom";
                    }
                    if (labAct[counter].walls[3]){
                        classBorder += " borderLeft";
                    }
            
                    if(labAct[counter].entrance){
                        test += "<div class='" + classBorder + "' id='entrance'> Start </div>";
                    }else if(labAct[counter].exit){
                        test += "<div class='" + classBorder + "' id='exit'> Exit </div>";
                    }else
                        {test += "<div class='" + classBorder + "'>" + counter + "</div>";
                    }
                    counter++;
                }
                addthing += "<div class='line'>" + test + "</div>" ;
            }
            addAllLabs += "<div class='labyrinth'>" + addthing + "</div>";
        }
    }
    board.innerHTML = addAllLabs;
}

function testForNext(act, labAct){
    let ongoing = 0;

    for (let i=0; i<4; i++){
        if (labAct[act].walls[i]){
            ongoing ++;
        }
    }

    return ongoing;
}

function goTo(b4, pos, a, labAct, nbOfLab){
    let positionX = pos%a;
    let positionY = (pos - positionX)/a;
    
    if (labAct[pos].exit){
                board.children[nbOfLab].children[positionY].children[positionX].classList.add("roadWin");
        return true;
    }
    labAct[pos].walls[b4] = true;
    let nbWalls = testForNext(pos, labAct);
    if(nbWalls<4){
        if (!labAct[pos].walls[0]){
            nbWalls++
            labAct[pos].walls[0] = true;
            if (goTo(2, pos-a, a, labAct, nbOfLab)){
                board.children[nbOfLab].children[positionY].children[positionX].classList.add("roadWin");
                return true;
            };
        }
        if (!labAct[pos].walls[1]){
            nbWalls++
            labAct[pos].walls[1] = true;
            if (goTo(3, pos+1, a, labAct, nbOfLab)){
                board.children[nbOfLab].children[positionY].children[positionX].classList.add("roadWin");
                return true;
            };
        }
        if (!labAct[pos].walls[2]){
            nbWalls++
            labAct[pos].walls[2] = true;
            if (goTo(0, pos+a, a, labAct, nbOfLab)){
                board.children[nbOfLab].children[positionY].children[positionX].classList.add("roadWin");
                return true;
            };
        }
        if (!labAct[pos].walls[3]){
            nbWalls++
            labAct[pos].walls[3] = true;
            if (goTo(1, pos-1, a, labAct, nbOfLab)){
                board.children[nbOfLab].children[positionY].children[positionX].classList.add("roadWin");
                return true;
            }
        }
    
    }
    board.children[nbOfLab].children[positionY].children[positionX].classList.add("roadToWin");
    return false
}

function findTheExit(){
    for (let a=3; a<=25; a++){
        for (let b=0; b<3; b++){
            let variant = "ex-" + b;
            let labAct = labyrinth[a][variant];
            goTo(0,0,a,labAct, nbOfLab);
            nbOfLab++;
        }
    }
    nbOfLab = 0;
    return "That's all folks!";
}