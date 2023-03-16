let sizeOfLab = 15;                 // zmien wielkosc planszy od 3x3 do 25x25
let example = 1;                    // zmien wersje od 0 do 2
let speedInLab = 4;                // zmien szybkosc: 60 da 1 klatke na sec, 20 da 3 klatki na sec
let background1 = [255,200,150];    // zmien kolor 1 planszy
let background2 = [152,222,255];    // zmien kolor 2 planszy


let labAct = labyrinth[sizeOfLab]["ex-"+ example];
let timePass1 = 0;
let timePass2 = 0;
let baseOfRoad1 = [];
let baseOfRoad2 = [];
baseOfRoad1.push(labAct[0]);
baseOfRoad2.push(labAct[0]);
let onExit1 = false;
let onExit2 = false;
let r = 50;
let g = 50;
let b = 200;
let changer = 0;      
let changeg = 0;      
let changeb = -5;      

var l1 = function(sketch){
    sketch.setup = function(){
        let canvas1 = sketch.createCanvas(20 + sizeOfLab*50, 20 + sizeOfLab*50);
        canvas1.position(100 + sizeOfLab*50,30);
        sketch.background(background1[0],background1[1],background1[2]);

        labAct.forEach(element => {
            let positionX = element.posX * 50;
            let positionY = element.posY * 50;

            if((element.posX == 0 && element.posY == 0)||(element.posX == sizeOfLab-1 && element.posY == sizeOfLab-1)){
                let colorSE = [255,255,15];
                let posAndSize = [10 + positionX, 10 + positionY, 50 , 50];
                drawSquare(sketch, posAndSize, colorSE);
            }
            createWalls(sketch, element, positionX, positionY);
        });
    }

    sketch.draw = function(){
        if (sketch.frameCount%speedInLab==0){
            if(!onExit1){
                colors();
                let v = baseOfRoad1[timePass1];
                let positionXDFS = v.posX;
                let positionYDFS = v.posY;

                let colorSE = [r,g,b];
                let posAndSize = [20 + positionXDFS*50, 20 + positionYDFS*50, 30 , 30];
                drawSquare(sketch, posAndSize, colorSE);
                
                if (!v.visited1){
                    v.pos = positionXDFS + positionYDFS*sizeOfLab;
                    v.visited1=true;

                    onExit1 = v.exit? exitFromLab(v,sketch): false;

                    if (!v.walls[0] && !labAct[v.pos-sizeOfLab].visited1 && labAct[v.pos-sizeOfLab]){
                        labAct[v.pos-sizeOfLab].parent = v;
                        baseOfRoad1.push(labAct[v.pos-sizeOfLab]);
                    }
                    if (!v.walls[1] && !labAct[v.pos+1].visited1 && labAct[v.pos+1]){
                        labAct[v.pos+1].parent = v;
                        baseOfRoad1.push(labAct[v.pos+1]);
                    }
                    if (!v.walls[2] && !labAct[v.pos+sizeOfLab].visited1 && labAct[v.pos+sizeOfLab]){
                        labAct[v.pos+sizeOfLab].parent = v;
                        baseOfRoad1.push(labAct[v.pos+sizeOfLab]);
                    }
                    if (!v.walls[3] && !labAct[v.pos-1].visited1 && labAct[v.pos-1]){
                        labAct[v.pos-1].parent = v;
                        baseOfRoad1.push(labAct[v.pos-1]);
                    }
                }
            }
            timePass1++;
        }
    }
}

new p5(l1);

var l2 = function(sketch){
    sketch.setup = function(){
        let canvas2 = sketch.createCanvas(20 + sizeOfLab*50, 20 + sizeOfLab*50);
        canvas2.position(50,30);
        sketch.background(background2[0],background2[1],background2[2]);

        labAct.forEach(element => {
            let positionX = element.posX * 50;
            let positionY = element.posY * 50;

            if((element.posX == 0 && element.posY == 0)||(element.posX == sizeOfLab-1 && element.posY == sizeOfLab-1)){
                let colorSE = [255,255,15];
                let posAndSize = [10 + positionX, 10 + positionY, 50 , 50];
                drawSquare(sketch, posAndSize, colorSE);
            }
            createWalls(sketch, element, positionX, positionY);
        });
    }
    sketch.draw = function(){
        if (sketch.frameCount%speedInLab==0){
            if(!onExit2){
                let v = baseOfRoad2.pop();
                let positionXDFS = v.posX;
                let positionYDFS = v.posY;

                let posAndSize = [20 + positionXDFS*50, 20 + positionYDFS*50, 30 , 30];
                let colorDFS = [r,g,b];
                drawSquare(sketch,posAndSize,colorDFS);

                if (!v.visited2){
                    v.pos = positionXDFS + positionYDFS*sizeOfLab;
                    v.visited2=true;

                    onExit2 = v.exit? exitFromLab(v,sketch): false;

                    if (!v.walls[0] && !labAct[v.pos-sizeOfLab].visited2 && labAct[v.pos-sizeOfLab]){
                        labAct[v.pos-sizeOfLab].parent = v;
                        baseOfRoad2.push(labAct[v.pos-sizeOfLab]);
                    }
                    if (!v.walls[1] && !labAct[v.pos+1].visited2 && labAct[v.pos+1]){
                        labAct[v.pos+1].parent = v;
                        baseOfRoad2.push(labAct[v.pos+1]);
                    }
                    if (!v.walls[2] && !labAct[v.pos+sizeOfLab].visited2 && labAct[v.pos+sizeOfLab]){
                        labAct[v.pos+sizeOfLab].parent = v;
                        baseOfRoad2.push(labAct[v.pos+sizeOfLab]);
                    }
                    if (!v.walls[3] && !labAct[v.pos-1].visited2 && labAct[v.pos-1]){
                        labAct[v.pos-1].parent = v;
                        baseOfRoad2.push(labAct[v.pos-1]);
                    }
                }
            }
            timePass2++;
        }
    }
}

new p5(l2);

function drawSquare(sketch, posAndSize, color){
    sketch.push();
    sketch.fill(color[0],color[1],color[2]);
    sketch.noStroke();
    sketch.rect(posAndSize[0], posAndSize[1], posAndSize[2], posAndSize[3]);
    sketch.pop();
}

function createWalls(sketch, element, positionX, positionY){
    if (element.walls[0]){
        sketch.line(10 + positionX, 10 + positionY, 60 + positionX, 10 + positionY);
    }
    if (element.walls[1]){
        sketch.line(60 + positionX, 10 + positionY, 60 + positionX, 60 + positionY);
    }
    if (element.walls[2]){
        sketch.line(60 + positionX, 60 + positionY, 10 + positionX, 60 + positionY);
    }
    if (element.walls[3]){
        sketch.line(10 + positionX, 60 + positionY, 10 + positionX, 10 + positionY);
    }
}


function exitFromLab(v, sketch){
    
    sketch.push();
    sketch.fill(45,200,30);
    sketch.noStroke();
    while(v.parent){
        let drawParentX = v.posX;
        let drawParentY = v.posY;
        
        sketch.rect(20 + drawParentX*50, 20 + drawParentY*50, 30 , 30);
        v = v.parent;
    }
    sketch.rect(20, 20, 30 , 30);
    sketch.pop();
    
    return true;
}

function colors(){
    r=r+changer;
    if (r<=0){
        r=0;
        changer*=-1;
    }
    if (r>=255){
        r=255;
        changer*=-1;
    }
    
    g=g+changeg;
    if (g<=0){
        g=0;
        changeg*=-1;
    }
    if (g>=255){
        g=255;
        changeg*=-1;
    }
    
    b=b+changeb;
    if (b<=0){
        b=0;
        changeb*=-1;
    }
    if (b>=255){
        b=255;
        changeb*=-1;
    }
}


// function setup(){
//     createCanvas(20 + sizeOfLab*50, 20 + sizeOfLab*50);

//     background(222,222,222);
//     for(let i=0; i< labAct.length; i++){
//         let positionX = labAct[i].posX * 50;
//         let positionY = labAct[i].posY * 50;
//         if(labAct[i].posX == 0 && labAct[i].posY == 0){
//             push();
//             fill(255,255,15);
//             noStroke();
//             rect(10 + positionX, 10 + positionY, 50 , 50);
//             pop();
//         }
//         if(labAct[i].posX == sizeOfLab-1 && labAct[i].posY == sizeOfLab-1){
//             push();
//             fill(255,255,15);
//             noStroke();
//             rect(10 + positionX, 10 + positionY, 50 , 50);
//             pop();
//         }
//         if (labAct[i].walls[0]){
//             line(10 + positionX, 10 + positionY, 60 + positionX, 10 + positionY);
//         }
//         if (labAct[i].walls[1]){
//             line(60 + positionX, 10 + positionY, 60 + positionX, 60 + positionY);
//         }
//         if (labAct[i].walls[2]){
//             line(60 + positionX, 60 + positionY, 10 + positionX, 60 + positionY);
//         }
//         if (labAct[i].walls[3]){
//             line(10 + positionX, 60 + positionY, 10 + positionX, 10 + positionY);
//         }
//     }
// }

// function draw(){
//     if (frameCount%speedInLab==0){
//         if(!onExit){
//             let v = baseOfRoad[timePass];
//             let positionXDFS = v.posX;
//             let positionYDFS = v.posY;
//             push();

//             r=r+changer;
//             if (r<=0){
//                 r=0;
//                 changer*=-1;
//             }
//             if (r>=255){
//                 r=255;
//                 changer*=-1;
//             }

//             g=g+changeg;
//             if (g<=0){
//                 g=0;
//                 changeg*=-1;
//             }
//             if (g>=255){
//                 g=255;
//                 changeg*=-1;
//             }

//             b=b+changeb;
//             if (b<=0){
//                 b=0;
//                 changeb*=-1;
//             }
//             if (b>=255){
//                 b=255;
//                 changeb*=-1;
//             }

//             fill(r,g,b);
//             noStroke();
//             rect(20 + positionXDFS*50, 20 + positionYDFS*50, 30 , 30);
//             pop();
//             if (!v.visited){
//                 v.pos = positionXDFS + positionYDFS*sizeOfLab;
//                 v.visited=true;
//                 if (v.exit){
//                     push();
//                     fill(45,200,30);
//                     noStroke();
//                     while(v.parent){
//                         let drawParentX = v.posX;
//                         let drawParentY = v.posY;
                        
//                         rect(20 + drawParentX*50, 20 + drawParentY*50, 30 , 30);
//                         v = v.parent;
//                     }
//                     rect(20, 20, 30 , 30);
//                     pop();
//                     onExit = true;
//                 }
//                 if (!v.walls[0] && !labAct[v.pos-sizeOfLab].visited && labAct[v.pos-sizeOfLab]){
//                     labAct[v.pos-sizeOfLab].parent = v;
//                     baseOfRoad.push(labAct[v.pos-sizeOfLab]);
//                 }
//                 if (!v.walls[1] && !labAct[v.pos+1].visited && labAct[v.pos+1]){
//                     labAct[v.pos+1].parent = v;
//                     baseOfRoad.push(labAct[v.pos+1]);
//                 }
//                 if (!v.walls[2] && !labAct[v.pos+sizeOfLab].visited && labAct[v.pos+sizeOfLab]){
//                     labAct[v.pos+sizeOfLab].parent = v;
//                     baseOfRoad.push(labAct[v.pos+sizeOfLab]);
//                 }
//                 if (!v.walls[3] && !labAct[v.pos-1].visited && labAct[v.pos-1]){
//                     labAct[v.pos-1].parent = v;
//                     baseOfRoad.push(labAct[v.pos-1]);
//                 }
//             }
//         }
//         timePass++;
//     }
// }