let exampleVersion = 1;
let sizeForTest = 6;
let variant = "ex-" + exampleVersion;
let dsfLabAct = labyrinth[sizeForTest][variant];
let dsfLabNb = (sizeForTest-3)*3 + exampleVersion;

function dsfFindExit(){
    for (let a=3; a<=25; a++){
        for (let b=0; b<3; b++){
            exampleVersion = b;
            sizeForTest = a;
            variant = "ex-" + exampleVersion;
            dsfLabAct = labyrinth[sizeForTest][variant];
            dsfLabNb = (sizeForTest-3)*3 + exampleVersion;
            dsf_iterative(dsfLabAct,dsfLabAct[0]);
        }
    }
    return "DSF has found a way out";
}


function dsf_iterative(G, e){
    let stack = [];
    let exitRoad = [];
    stack.push(e);

    while(stack.length>0){
        let v = stack.pop();
        board.children[dsfLabNb].children[v.posY].children[v.posX].classList.add("roadToWin");
        if (!v.visited){
            v.pos = v.posX + v.posY*sizeForTest;
            v.visited=true;
            if (v.exit){
                while(v.parent){
                    exitRoad.push(v);
                    board.children[dsfLabNb].children[v.posY].children[v.posX].classList.add("roadWin");
                    v = v.parent;
                }
                return ;
            }
            if (!v.walls[0] && !G[v.pos-sizeForTest].visited && G[v.pos-sizeForTest]){
                G[v.pos-sizeForTest].parent = v;
                stack.push(G[v.pos-sizeForTest]);
            }
            if (!v.walls[1] && !G[v.pos+1].visited && G[v.pos+1]){
                G[v.pos+1].parent = v;
                stack.push(G[v.pos+1]);
            }
            if (!v.walls[2] && !G[v.pos+sizeForTest].visited && G[v.pos+sizeForTest]){
                G[v.pos+sizeForTest].parent = v;
                stack.push(G[v.pos+sizeForTest]);
            }
            if (!v.walls[3] && !G[v.pos-1].visited && G[v.pos-1]){
                G[v.pos-1].parent = v;
                stack.push(G[v.pos-1]);
            }
        }
    }
}

