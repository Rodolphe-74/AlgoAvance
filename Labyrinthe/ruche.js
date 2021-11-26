//======================= VARIABLES GLOBALES======================//

let caseVisited = [];
let caseLab;
let lab = [];
let stack = [];

//======================= FONCTION AFFICHAGE LABYRINTHE ======================//

function drawHive(nbCase) {

    let mainLabDiv = document.getElementById("hive")

    for (let i = 0; i < nbCase; i++) {

        let divLine = document.createElement("div")
        if (i % 2 === 0) {
            divLine.className = "hexagoneLine"
        } else {
            divLine.className = "hexagoneLine2"
        }

        for (let j = 0; j < nbCase; j++) {
            let hexagone = document.createElement("div")
            hexagone.setAttribute("id", (i * nbCase + j).toString())
            hexagone.className = "hexagone"

            let newDivTop = document.createElement("div")
            newDivTop.className = "backgroundHexa"
            let hexa1 = document.createElement("div")
            hexa1.classList.add("hexa1")
            let hexa2 = document.createElement("div")
            hexa2.classList.add("hexa2")
            if(lab[i*nbCase+j].walls[0] === true){
                hexa2.classList.add("borderRight")
            }
            if(lab[i*nbCase+j].walls[3] === true){
                hexa2.classList.add("borderLeft")
            }
            let hexa3 = document.createElement("div")
            hexa3.className = "hexa3"

            newDivTop.append(hexa1, hexa2, hexa3)

            let hexaTopLeft = document.createElement("div")
            hexaTopLeft.className = "hexaTopLeft"
            let hexa4 = document.createElement("div")
            hexa4.classList.add("hexa4")
            let hexa5 = document.createElement("div")
            hexa5.classList.add("hexa5")
            if(lab[i*nbCase+j].walls[1] === true){
                hexa5.classList.add("borderRight")
            }
            if(lab[i*nbCase+j].walls[4] === true){
                hexa5.classList.add("borderLeft")
            }
            let hexa6 = document.createElement("div")
            hexa6.className = "hexa6"

            hexaTopLeft.append(hexa4, hexa5, hexa6)

            let hexaTopRight = document.createElement("div")
            hexaTopRight.className = "hexaTopRight"
            let hexa7 = document.createElement("div")
            hexa7.classList.add("hexa4")
            let hexa8 = document.createElement("div")
            hexa8.classList.add("hexa5")
            if(lab[i*nbCase+j].walls[2] === true){
                hexa8.classList.add("borderRight")
            }
            if(lab[i*nbCase+j].walls[5] === true){
                hexa8.classList.add("borderLeft")
            }
            hexa6 = document.createElement("div")
            hexa6.className = "hexa6"

            hexaTopRight.append(hexa7, hexa8, hexa6)

            hexagone.append(newDivTop, hexaTopLeft, hexaTopRight)

            divLine.append(hexagone)
        }
        mainLabDiv.append(divLine)

    }
}

function labHiveCreation(dimension, startLab, exitLab) {

    //Construction de la grille du labyrinthe
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            caseLab =
                {
                    "posX": i,
                    "posY": j,
                    "walls": [true, true, true, true, true, true],
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
    findHiveNeighbours(dimension);

    //Recherche de la position d'entrée
    let entrancePosition = 0;
    for(let i=0; i<dimension*dimension ; i++) {
        if(lab[i].entrance){
            entrancePosition = i
        }
    }

    //Construction du labyrinthe
    nextHiveNeighbour(dimension,entrancePosition);

    //Représentation du labyrinthe
    drawHive(dimension)

    return lab
}


// ======================= RECHERCHE DES VOISINS ======================//

function findHiveNeighbours(dimension) {
    let wallPair = [-dimension, -(dimension-1), -1, 1, dimension, dimension +1]
    let wallImpair = [-(dimension+1), -dimension, -1, 1, dimension-1, dimension]

    for (let i = 0; i < dimension * dimension; i++) {
        //Ligne paire
        if(lab[i]["posX"] % 2 === 0){
            for (let j = 0; j < wallPair.length; j++) {
                if (0 <= i+wallPair[j] && i+wallPair[j]< dimension) {
                    let position = i + wallPair[j]
                    lab[i].neighbours.push(position)
                }
            }
        }
        //ligne impaire
        else{
            for (let j = 0; j < wallImpair.length; j++) {
                if (0 <= i+wallImpair[j] && i+wallImpair[j]< dimension) {
                    let position = i + wallImpair[j]
                    lab[i].neighbours.push(position)
                }
            }
        }
    }
}


//======================= CONSTRUCTION DU LABYRINTHE ======================//

function nextHiveNeighbour(dimension,entrancePosition){

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
    randomHiveNeighbour(entrancePosition, randomNeighbours)

    // Cassage des murs
    breakHiveWall(entrancePosition, randomNeighbours, dimension)
}


//======================= STOCKAGE DES VOISINS NON VISITES ======================//

function randomHiveNeighbour(entrancePosition, randomNeighbours){
    for(let i=0; i<lab[entrancePosition].neighbours.length ; i++) {
        let nbCase = lab[entrancePosition].neighbours[i]
        if(!lab[nbCase].visited){
            randomNeighbours.push(nbCase)
        }
    }
}


//======================= CASSAGE DES MURS ======================//

function breakHiveWall(entrancePosition, randomNeighbours, dimension){

    let position;
    let tabPair = [[-dimension,4,1],[-(dimension-1),5,2], [-1,3,0], [1,0,3], [dimension, 2,5], [dimension+1,1,4]]
    let tabImpair = [[-(dimension+1),4,1], [-dimension,5,2], [-1,3,0], [1,0,3], [dimension-1,2,5], [dimension,1,4]]

    //Cassage d'un mur aléatoire dans les voisins non visités restants
    if(randomNeighbours.length>0){
        let number = Math.floor(Math.random() * randomNeighbours.length)
        position = randomNeighbours[number]
        let difference =  position - entrancePosition

        for (let i = 0; i < dimension * dimension; i++) {
            //Ligne paire
            if(lab[i]["posX"] % 2 === 0){
                for(let j = 0 ; j<tabPair.length ; j++){
                    if (difference === tabPair[j][0]){
                        lab[entrancePosition].walls[tabPair[j][1]] = false
                        lab[position].walls[tabPair[j][2]] = false
                    }
                }
            }
            //ligne impaire
            else{
                for (let j = 0; j < tabImpair.length; j++) {
                    if (difference === tabImpair[j][0]){
                        lab[entrancePosition].walls[tabImpair[j][1]] = false
                        lab[position].walls[tabImpair[j][2]] = false
                    }
                }
            }
        }

        nextHiveNeighbour(dimension,position)

        // Si pas de voisin non visité, récupération d'une case avec au moins un voisin visité et cassage du mur entre les deux
    } else{
        for(let i=0; i<dimension*dimension ; i++) {
            if(!caseVisited.includes(i)){
                if(lab[i]["posX"] % 2 === 0){
                    for(let j = 0 ; j<tabPair.length ; j++){
                        if(caseVisited.includes(i+tabPair[j][0]) && lab[i].neighbours.includes(i+tabPair[j][0])){
                            lab[i].walls[tabPair[j][1]] = false
                            lab[i+tabPair[j][0]].walls[tabPair[j][2]] = false
                            position = i
                            return nextHiveNeighbour(dimension,position)
                        }
                    }
                }
                else{
                    for(let j = 0 ; j<tabImpair.length ; j++){
                        if(caseVisited.includes(i+tabImpair[j][0]) && lab[i].neighbours.includes(i+tabImpair[j][0])){
                            lab[i].walls[tabImpair[j][1]] = false
                            lab[i+tabImpair[j][0]].walls[tabImpair[j][2]] = false
                            position = i
                            return nextHiveNeighbour(dimension,position)
                        }
                    }
                }
            }
        }
    }
}
