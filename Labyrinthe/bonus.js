let caseVisited = [];
let caseLab;
let lab = [];

//======================= FONCTION AFFICHAGE LABYRINTHE ======================//

function drawLab(nbCase){

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
    return lab
}

function labCreation(dimension, startLab, exitLab) {

    //Construction de la grille du labyrinthe
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            caseLab =
                {
                    "posX": i,
                    "posY": j,
                    "walls": [true, true, true, true],
                    "neighbours": [],
                    "visited": false
                }
            if (caseLab["posX"] * dimension + caseLab["posY"] === startLab) {
                caseLab.entrance = true
            }
            if (caseLab["posX"] * dimension + caseLab["posY"] === exitLab) {
                caseLab.exit = true
            }
            lab.push(caseLab)
        }
    }

    //Recherche des voisins
    let wallX = [-1, 0, 1, 0]
    let wallY = [0, 1, 0, -1]
    for (let i = 0; i < dimension * dimension; i++) {
        for (let j = 0; j < wallX.length; j++) {
            if (0 <= lab[i]["posX"] + wallX[j] && lab[i]["posX"] + wallX[j] < dimension && 0 <= lab[i]["posY"] + wallY[j] && lab[i]["posY"] + wallY[j] < dimension) {
                let x = lab[i]["posX"] + wallX[j]
                let y = lab[i]["posY"] + wallY[j]
                let position = x * dimension + y
                lab[i].neighbours.push(position)
            }
        }
    }
    let entrancePosition = 0;
    for(let i=0; i<dimension*dimension ; i++) {
        if(lab[i].entrance){
            entrancePosition = i
        }
    }
    nextNeighbour(dimension,entrancePosition);
    drawLab(dimension)
    return lab
}

function nextNeighbour(dimension,entrancePosition){

    let randomNeighbours = []
    let position = 0;

    lab[entrancePosition].visited = true
    let isEqual = false

    if(caseVisited.length===0) {
        caseVisited.push(entrancePosition)
    }
    for(let i=0; i<caseVisited.length ; i++) {
        if(caseVisited[i] === entrancePosition) {
            isEqual = true
        }
    }
    if(!isEqual){
        caseVisited.push(entrancePosition)
    }


    //Parcours des cases
    if(caseVisited.length===dimension*dimension) {
        return;
    }
    for(let i=0; i<lab[entrancePosition].neighbours.length ; i++) {
        let nbCase = lab[entrancePosition].neighbours[i]
        if(!lab[nbCase].visited){
            randomNeighbours.push(nbCase)
        }
    }
    if(randomNeighbours.length>0){
        let number = Math.floor(Math.random() * randomNeighbours.length)
        position = randomNeighbours[number]
        let difference =  position - entrancePosition

        if(difference === -1){
            lab[entrancePosition].walls[3] = false
            lab[position].walls[1] = false
        }
        else if(difference === 1){
            lab[entrancePosition].walls[1] = false
            lab[position].walls[3] = false
        }
        else if(difference === -dimension){
            lab[entrancePosition].walls[0] = false
            lab[position].walls[2] = false
        }
        else if(difference === dimension){
            lab[entrancePosition].walls[2] = false
            lab[position].walls[0] = false
        }
        nextNeighbour(dimension,position)
    } else{
        for(let i=0; i<dimension*dimension ; i++) {
            if(!caseVisited.includes(i)){
                if(caseVisited.includes(i-1) && lab[i].neighbours.includes(i-1)){
                    lab[i].walls[3] = false
                    lab[i-1].walls[1] = false
                    position = i
                    nextNeighbour(dimension,position)
                }
                else if(caseVisited.includes(i+1) && lab[i].neighbours.includes(i+1)){
                    lab[i].walls[1] = false
                    lab[i+1].walls[3] = false
                    position = i
                    nextNeighbour(dimension,position)
                }
                else if(caseVisited.includes(i-dimension) && lab[i].neighbours.includes(i-dimension)) {
                    lab[i].walls[0] = false
                    lab[i-dimension].walls[2] = false
                    position = i
                    nextNeighbour(dimension, position)
                }
                else if(caseVisited.includes(i+dimension) && lab[i].neighbours.includes(i+dimension)) {
                    lab[i].walls[2] = false
                    lab[i+dimension].walls[0] = false
                    position = i
                    nextNeighbour(dimension, position)
                }
            }
        }
    }

}


// stack.push(startLab)
// let wallX = [-1,0,1,0]
// let wallY = [0,1,0,-1]
//
// while(stack.length !== 0){
//     let v = stack.pop()
//
//     if (!v.visited){
//         v.visited= true
//         if(v["exit"]){
//             while(v.parent){
//                 let parent = v.parent
//                 let currentPath = document.getElementById(parent["posX"] + "/" + parent["posY"])
//                 currentPath.style.backgroundColor = "#F1B8DF"
//                 v = v.parent
//             }
//             return
//         }
//         for(let i=0; i<wallX.length;i++){
//             if(!v["walls"][i]){
//                 for(let j=0; j<lab.length ; j++) {
//                     if(lab[j]["posX"] === v["posX"]+ wallX[i] && lab[j]["posY"] === v["posY"]+ wallY[i] ){
//                         let w = lab[j]
//                         if (!w.visited) {
//                             w.parent = v;
//                             let currentPath = document.getElementById(w["posX"] + "/" + w["posY"])
//                             currentPath.style.backgroundColor = "#9C638A"
//                             stack.push(w)
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
