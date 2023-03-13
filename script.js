let board = document.getElementById("board");
let addAllLabs = "";

for (let a=3; a<=25; a++){
    for (let b=0; b<3; b++){
        let variant = "ex-" + b;
        let labAct = labyrinth[a][variant];
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
        
                if(labAct[counter].entrance){
                    test += "<div class='" + classBorder + "' id='entrance'> Start </div>";
                }else if(labAct[counter].exit){
                    test += "<div class='" + classBorder + "' id='exit'> Exit </div>";
                }else
                    {test += "<div class='" + classBorder + "'>" + posX + ", " + posY + "</div>";
                }
                counter++;
            }
            addthing += "<div class='line'>" + test + "</div>" ;
        }
        addAllLabs += "<div class='labyrinth'>" + addthing + "</div>";
    }
}
board.innerHTML = addAllLabs;
