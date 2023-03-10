let board = document.getElementById("board");

// console.log(labyrinth[3]["ex-0"]);

let labAct = labyrinth[24]["ex-0"];
let size = Math.sqrt(labAct.length);
let addthing = ""; 

let counter = 0;
// posX - j
// posY - i
for(let i=0; i<size ;i++){
    let test = "";
    for(let j=0;j<size;j++){
        let posX = labAct[counter].posX;
        let posY = labAct[counter].posY;
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

        if(posX==0 && posY==0){
            test += "<div class='" + classBorder + "' id='entrance'> Entrance </div>";
        }else if(posX==size-1 && posY==size-1){
            test += "<div class='" + classBorder + "' id='exit'> Exit </div>";
        }else
            {test += "<div class='" + classBorder + "'>" + posX + ", " + posY + "</div>";
        }
        counter++;
    }
    addthing += "<div class='line'>" + test + "</div>" ;
}
board.innerHTML = addthing;
