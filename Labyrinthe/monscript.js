//======================= VARIABLES GLOBALES ==========================//

let lab;
let startLab;
let stack = [];

//======================= FONCTION AFFICHAGE LABYRINTHE ======================//

function setLab(nbCase, ex){
    lab = labyrinthe[nbCase]["ex-" + ex]
    let mainLabDiv = document.getElementById("main")


    lab.forEach((caseLab) => {
        let newDiv = document.createElement("div")

        //Definition des cases
        newDiv.setAttribute("id",caseLab["posX"] + "/" + caseLab["posY"])
        newDiv.style.position = "absolute"
        newDiv.style.top = caseLab["posX"]*50 + "px"
        newDiv.style.left = caseLab["posY"]*50 + "px"
        newDiv.className = "case"

        //Gestion des cases entrée et sortie
        if(caseLab["entrance"])
            newDiv.style.backgroundColor = "white"
        if(caseLab["exit"])
            newDiv.style.backgroundColor = "deepPink"

        // Gestion des bordures
        if(caseLab["walls"][0])
            newDiv.style.borderTop = "2px solid #760651"
        if(caseLab["walls"][1])
            newDiv.style.borderRight = "2px solid #760651"
        if(caseLab["walls"][2])
            newDiv.style.borderBottom = "2px solid #760651"
        if(caseLab["walls"][3])
            newDiv.style.borderLeft = "2px solid #760651"

        //Ajout de chaque Div à la fin de la div main
        mainLabDiv.append(newDiv)

        console.log(labyrinthe[nbCase]["ex-"+ex]);
    })
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
}

//============== FONCTION POUR TROUVER LA SORTIE DU LABYRINTHE ===============//

async function findNextCase(labyrinthe,startLab){
    stack.push(startLab)
    let wallX = [-1,0,1,0]
    let wallY = [0,1,0,-1]

    while(stack.length !== 0){
        let v = stack.pop()

        if (v.visited !== true){
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
                        }, 100);
                    });
                }
            }
        }
    }
}

console.log(stack);