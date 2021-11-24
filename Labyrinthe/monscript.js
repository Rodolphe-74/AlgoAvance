//======================= VARIABLES GLOBALES ==========================//

let lab;
let startLab;
let stack = [];

//======================= FONCTION AFFICHAGE LABYRINTHE ======================//

function setLab(nbCase, ex){
    lab = labyrinthe[nbCase]["ex-" + ex]
    let mainLabDiv = document.getElementById("main")


    for(let i=0; i<nbCase; i++){
        let divLine = document.createElement("div")
        for(let j=0; j<lab.length; j++){
            if(i === lab[j]["posX"]){
                let newDiv = document.createElement("div")
                newDiv.setAttribute("id", lab[j]["posX"] + "/" + lab[j]["posY"])
                newDiv.className = "case"

                //Gestion des cases entrée et sortie
                if(lab[j]["entrance"])
                    newDiv.style.backgroundColor = "white"
                if(lab[j]["exit"])
                    newDiv.style.backgroundColor = "deepPink"

                // Gestion des bordures
                if(lab[j]["walls"][0])
                    newDiv.style.borderTop = "2px solid #760651"
                if(lab[j]["walls"][1])
                    newDiv.style.borderRight = "2px solid #760651"
                if(lab[j]["walls"][2])
                    newDiv.style.borderBottom = "2px solid #760651"
                if(lab[j]["walls"][3])
                    newDiv.style.borderLeft = "2px solid #760651"

                divLine.append(newDiv)
            }
        }
        divLine.className = "divLine"
        mainLabDiv.append(divLine)
    }

    console.log(labyrinthe[nbCase]["ex-"+ex]);
    return lab
}

//======================= FONCTION ENTREE LABYRINTHE ======================//

function findEntrance(){
    let currentCase;
    for(let i=0; i<lab.length ; i++) {
        if (lab[i]["entrance"]) {
            currentCase = document.getElementById(lab[i]["posX"] + "/" + lab[i]["posY"])
            currentCase.style.backgroundColor = "white"
            startLab = lab[i]
        }
    }
    return startLab
}

//============== FONCTION POUR TROUVER LA SORTIE DU LABYRINTHE ===============//

// async function findNextCase(labyrinthe,startLab){
//     stack.push(startLab)
//     let wallX = [-1,0,1,0]
//     let wallY = [0,1,0,-1]
//
//     while(stack.length !== 0){
//         let v = stack.pop()
//
//         if (!v.visited){
//             v.visited= true
//             if(v["exit"]){
//                 while(v.parent){
//                     let parent = v.parent
//                     let currentPath = document.getElementById(parent["posX"] + "/" + parent["posY"])
//                     currentPath.style.backgroundColor = "#F1B8DF"
//                     v = v.parent
//                 }
//                 return
//             }
//             for(let i=0; i<wallX.length;i++){
//                 if(!v["walls"][i]){
//                     for(let j=0; j<lab.length ; j++) {
//                         if(lab[j]["posX"] === v["posX"]+ wallX[i] && lab[j]["posY"] === v["posY"]+ wallY[i] ){
//                             let w = lab[j]
//                             if (!w.visited) {
//                                 w.parent = v;
//                                 let currentPath = document.getElementById(w["posX"] + "/" + w["posY"])
//                                 currentPath.style.backgroundColor = "#9C638A"
//                                 stack.push(w)
//                             }
//                         }
//                     }
//                     await new Promise (resolve => {
//                         setTimeout(() => {
//                             resolve();
//                         }, 100);
//                     });
//                 }
//             }
//         }
//     }
// }

//============== FONCTION POUR TROUVER LA SORTIE DU LABYRINTHE ===============//

function findNextCaseRecursive(labyrinthe,startLab){

    let wallX = [-1,0,1,0]
    let wallY = [0,1,0,-1]
    let v = startLab ;

    if (!v.visited){
        v.visited = true
        if(v["exit"]){
            return [v]
        }
        for(let i=0; i<wallX.length;i++){
            if(!v["walls"][i]){
                for(let j=0; j<lab.length ; j++) {
                    if(lab[j]["posX"] === v["posX"]+ wallX[i] && lab[j]["posY"] === v["posY"]+ wallY[i] ){
                        let w = lab[j]
                        let currentPath = findNextCaseRecursive(labyrinthe,w)
                        if(currentPath){
                            currentPath.push(v);
                            return currentPath;
                        }
                    }
                }
            }
        }
    }
}

function showPath(path){

    path.forEach((caseLab) => {
        let currentPath = document.getElementById(caseLab["posX"] + "/" + caseLab["posY"])
        currentPath.style.backgroundColor = "#F1B8DF"
    })
}

//============== FONCTION POUR TROUVER LA SORTIE DU LABYRINTHE ===============//

async function findNextCaseBFS(labyrinthe,startLab){
    let queue = [];
    queue.push(startLab)
    let wallX = [-1,0,1,0]
    let wallY = [0,1,0,-1]

    while(queue.length !== 0){
        let v = queue.shift();
        if (!v.visited){
            v.visited= true
            if(v["exit"]){
                while(v.parent){
                    let parent = v.parent
                    let currentPath = document.getElementById(parent["posX"] + "/" + parent["posY"])
                    currentPath.style.backgroundColor = "#F1B8DF"
                    v = v.parent
                }
                return
            }
            for(let i=0; i<wallX.length;i++){
                if(!v["walls"][i]){
                    for(let j=0; j<lab.length ; j++) {
                        if(lab[j]["posX"] === v["posX"]+ wallX[i] && lab[j]["posY"] === v["posY"]+ wallY[i] ){
                            let w = lab[j]
                            if (!w.visited) {
                                w.parent = v;
                                let currentPath = document.getElementById(w["posX"] + "/" + w["posY"])
                                currentPath.style.backgroundColor = "#9C638A"
                                queue.push(w)
                            }
                        }
                    }
                    await new Promise (resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 100);
                    });
                }
            }
        }
    }
}



console.log(stack);