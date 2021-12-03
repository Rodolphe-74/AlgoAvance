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
            if(lab[i * nbCase + j]["entrance"])
                hexagone.classList.add("entrance")
            if(lab[i * nbCase + j]["exit"])
                hexagone.classList.add("exit")

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
                    "visited": false,
                    "position": i*dimension + j
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

    //Construction du labyrinthe
    nextHiveNeighbour(dimension,startLab);

    //Représentation du labyrinthe
    drawHive(dimension)

    return lab
}


// ======================= RECHERCHE DES VOISINS ======================//

function findHiveNeighbours(dimension) {
    let wallPair = [-(dimension + 1), -dimension, -1, 1, dimension - 1, dimension]
    let wallImpair = [-dimension, -(dimension - 1), -1, 1, dimension, dimension + 1]


    for (let i = 0; i < dimension * dimension; i++) {


        if (lab[i]["posY"] === 0 || lab[i]["posY"] === dimension-1) {
            for (let k = 0; k <= dimension; k++) { // Cas avec 3 voisins
                if (k % 2 === 0 && (k * dimension === i || k * dimension - 1 === i)) {
                    let position1 = i - dimension
                    let position2
                    let position3 = i + dimension
                    if (lab[i]["posY"] === 0) {
                        position2 = i + 1
                    } else if (lab[i]["posY"] === dimension - 1) {
                        position2 = i - 1
                    }
                    lab[i].neighbours.push(position2)
                    if (position1 >= 0) {
                        lab[i].neighbours.push(position1)
                    }
                    if (position3 < dimension * dimension) {
                        lab[i].neighbours.push(position3)
                    }
                } else if (k % 2 !== 0 && (k * dimension === i || k * dimension - 1 === i)) { // Cas avec 5 voisins
                    let position1 = i - dimension
                    let position2
                    let position3
                    let position4 = i + dimension
                    let position5
                    if (lab[i]["posY"] === 0) {
                        position2 = i + 1
                        position3 = i - dimension + 1
                        position5 = i + dimension + 1
                    } else if (lab[i]["posY"] === dimension - 1) {
                        position2 = i - 1
                        position3 = i - (dimension + 1)
                        position5 = i + dimension - 1
                    }
                    lab[i].neighbours.push(position2)
                    if (position1 >= 0) {
                        lab[i].neighbours.push(position1, position3)
                    }
                    if (position4 < dimension * dimension) {
                        lab[i].neighbours.push(position4, position5)
                    }
                }
            }
        }


        else {
            //Ligne paire
            if (lab[i]["posX"] % 2 === 0) {
                for (let j = 0; j < wallPair.length; j++) {

                    if (0 <= i + wallPair[j] && i + wallPair[j] < dimension * dimension) {
                        let position = i + wallPair[j]
                        lab[i].neighbours.push(position)
                    }
                }
            }
            //ligne impaire
            else {
                for (let j = 0; j < wallImpair.length; j++) {
                    if (0 <= i + wallImpair[j] && i + wallImpair[j] < dimension * dimension) {
                        let position = i + wallImpair[j]
                        lab[i].neighbours.push(position)
                    }
                }
            }
        }
    }
console.log(lab)
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
    let tabImpair = [[-dimension,4,1],[-(dimension-1),5,2], [-1,3,0], [1,0,3], [dimension, 2,5], [dimension+1,1,4]]
    let tabPair = [[-(dimension+1),4,1], [-dimension,5,2], [-1,3,0], [1,0,3], [dimension-1,2,5], [dimension,1,4]]

    //Cassage d'un mur aléatoire dans les voisins non visités restants
    if(randomNeighbours.length>0){
        let number = Math.floor(Math.random() * randomNeighbours.length)
        position = randomNeighbours[number]
        let difference =  position - entrancePosition

        //Ligne paire
        if(lab[entrancePosition]["posX"] % 2 === 0) {
            for (let j = 0; j < tabPair.length; j++) {
                if (difference === tabPair[j][0]) {
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

        nextHiveNeighbour(dimension,position)

        // Si pas de voisin non visité, récupération d'une case avec au moins un voisin visité et cassage du mur entre les deux
    } else {
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


//======================= PARCOURS DU LABYRINTHE ======================//

async function findNextHive(startLab, dimension){
    stack.push(lab[startLab])
    // let wallPair = [-(dimension + 1), -dimension, -1, 1, dimension - 1, dimension]
    let wallImpair = [1, dimension, dimension-1, -1, -dimension, -dimension-1]
    let wallPair = [1, dimension+1 , dimension, -1, -(dimension-1), -dimension]

    //let wallImpair = [-dimension, -(dimension - 1), -1, 1, dimension, dimension + 1]

    while(stack.length !== 0){
        let v = stack.pop()

        if (!v.visited) {
            v.visited = true
            if (v["exit"]) {
                while (v.parent) {
                    let parent = v.parent
                    let currentPath = document.getElementById(parent["posX"] * dimension + parent["posY"])
                    currentPath.classList.add("bestWay")
                    v = v.parent
                }
                return
            }
            for (let i = 0; i < wallPair.length; i++) {
                if (v["posX"] % 2 === 0) {
                    if (!v["walls"][i]) {
                        for (let j = 0; j < lab.length; j++) {
                            if (j === v.position + wallPair[i] && v.neighbours.includes(j)) { //&& j appartient à v.neighbours
                                let w = lab[j]
                                if (!w.visited) {
                                    w.parent = v;
                                    let currentPath = document.getElementById(w["position"])
                                    currentPath.classList.add("visited")
                                    stack.push(w)
                                }
                            }
                        }
                        await new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                            }, 100);
                        });
                    }
                }
                else {
                    for (let j = 0; j < lab.length; j++) {
                        if (j === v.position + wallImpair[i] && v.neighbours.includes(j)) {
                            let w = lab[j]
                            if (!w.visited) {
                                w.parent = v;
                                let currentPath = document.getElementById(w["position"])
                                currentPath.classList.add("visited")
                                stack.push(w)
                            }
                        }
                    }
                    await new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 100);
                    });
                }
            }
        }
    }
}