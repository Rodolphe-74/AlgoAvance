//======================= VARIABLES GLOBALES======================//

let caseVisited = [];
let caseLab;
let lab = [];
let stack = [];

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

//======================= CREATION DE CASES LABYRINTHE ======================//

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
    findNeighbours(dimension);

    //Recherche de la position d'entrée
    let entrancePosition = 0;
    for(let i=0; i<dimension*dimension ; i++) {
        if(lab[i].entrance){
            entrancePosition = i
        }
    }

    //Construction du labyrinthe
    nextNeighbour(dimension,entrancePosition);

    //Représentation du labyrinthe
    drawLab(dimension)

    return lab
}


//======================= CONSTRUCTION DU LABYRINTHE ======================//

function nextNeighbour(dimension,entrancePosition){

    let randomNeighbours = []

    // Passage de la case courante en "visited"
    lab[entrancePosition].visited = true

    //Stockage des cases visitées
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

    //Fin de la récursivité une fois toutes les cases parcourues
    if(caseVisited.length === dimension*dimension) {
        for(let i=0; i<dimension*dimension ; i++) {
            lab[i].visited = false
        }
        console.log(JSON.stringify(lab)) //Génération JSON
        return;
    }

    // Pour la case courante, choix d'un voisin aléatoire
    randomNeighbour(entrancePosition, randomNeighbours)

    // Cassage des murs
    breakWall(entrancePosition, randomNeighbours, dimension)
}


//======================= RECHERCHE DES VOISINS ======================//

function findNeighbours(dimension) {
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
}


//======================= STOCKAGE DES VOISINS NON VISITES ======================//

function randomNeighbour(entrancePosition, randomNeighbours){
    for(let i=0; i<lab[entrancePosition].neighbours.length ; i++) {
        let nbCase = lab[entrancePosition].neighbours[i]
        if(!lab[nbCase].visited){
            randomNeighbours.push(nbCase)
        }
    }
}


//======================= CASSAGE DES MURS ======================//

function breakWall(entrancePosition, randomNeighbours, dimension){

    let position;
    let tab = [[-1,3,1],[1,1,3],[-dimension,0,2],[dimension,2,0]]

    //Cassage d'un mur aléatoire dans les voisins non visités restants
    if(randomNeighbours.length>0){
        let number = Math.floor(Math.random() * randomNeighbours.length)
        position = randomNeighbours[number]
        let difference =  position - entrancePosition

        for(let i = 0 ; i<tab.length ; i++){
            if (difference === tab[i][0]){
                lab[entrancePosition].walls[tab[i][1]] = false
                lab[position].walls[tab[i][2]] = false
            }
        }
        nextNeighbour(dimension,position)

    // Si pas de voisin non visité, récupération d'une case avec au moins un voisin visité et cassage du mur entre les deux
    } else{
        for(let i=0; i<dimension*dimension ; i++) {
            if(!caseVisited.includes(i)){
                for(let j = 0 ; j<tab.length ; j++){
                    if(caseVisited.includes(i+tab[j][0]) && lab[i].neighbours.includes(i+tab[j][0])){
                        lab[i].walls[tab[j][1]] = false
                        lab[i+tab[j][0]].walls[tab[j][2]] = false
                        position = i
                        return nextNeighbour(dimension,position)
                    }
                }
            }
        }
    }
}


//======================= PARCOURS DU LABYRINTHE ======================//

async function findNextCase(startLab){
    stack.push(startLab)
    let wallX = [-1,0,1,0]
    let wallY = [0,1,0,-1]

    while(stack.length !== 0){
        let v = stack.pop()

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
                                stack.push(w)
                            }
                        }
                    }
                    await new Promise (resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 50);
                    });
                }
            }
        }
    }
}