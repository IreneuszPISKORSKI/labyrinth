let exampleVersion = 1;
let sizeForTest = 6;
let variant = "ex-" + exampleVersion;
let dfsLabAct = labyrinth[sizeForTest][variant];
let dfsLabNb = (sizeForTest-3)*3 + exampleVersion;



function dfsFindExit(){
    for (let a=3; a<=25; a++){
        for (let b=0; b<3; b++){
            exampleVersion = b;
            sizeForTest = a;
            variant = "ex-" + exampleVersion;
            dfsLabAct = labyrinth[sizeForTest][variant];
            dfsLabNb = (sizeForTest-3)*3 + exampleVersion;
            dfs_iterative(dfsLabAct,dfsLabAct[0]);
        }
    }
    return "DFS has found a way out";
}

function bfsFindExit(){
    for (let a=3; a<=25; a++){
        for (let b=0; b<3; b++){
            exampleVersion = b;
            sizeForTest = a;
            variant = "ex-" + exampleVersion;
            dfsLabAct = labyrinth[sizeForTest][variant];
            dfsLabNb = (sizeForTest-3)*3 + exampleVersion;
            bfs_iterative(dfsLabAct,dfsLabAct[0]);
        }
    }
    return "BFS has found a way out";
}

function dfs_iterative(G, e){
    let stack = [];
    // let exitRoad = [];
    stack.push(e);
    let onExit = false;
    while(stack.length>0 && !onExit){
        let v = stack.pop();
        board.children[dfsLabNb].children[v.posY].children[v.posX].classList.add("roadToWin");
        if (!v.visited){
            v.pos = v.posX + v.posY*sizeForTest;
            v.visited=true;
            if (v.exit){
                while(v.parent){
                    // exitRoad.push(v);
                    board.children[dfsLabNb].children[v.posY].children[v.posX].classList.add("roadWin");
                    v = v.parent;
                }
                onExit = true;
                // return ;
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

function bfs_iterative(G, e){
    let stack = [];
    let exitRoad = [];
    stack.push(e);
    // let inQueue = 0;
    while(stack.length>0){
        // let v = stack[inQueue];
        let v = stack.shift();
        board.children[dfsLabNb].children[v.posY].children[v.posX].classList.add("roadToWin");

        if (!v.visited){
            v.pos = v.posX + v.posY*sizeForTest;
            v.visited=true;
            if (v.exit){
                while(v.parent){
                    exitRoad.push(v);
                    board.children[dfsLabNb].children[v.posY].children[v.posX].classList.add("roadWin");
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
        // inQueue++;
    }
}

