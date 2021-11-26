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
            let newDiv = document.createElement("div")
            newDiv.setAttribute("id", (i * nbCase + j).toString())
            newDiv.className = "hexagone"

            let newDivTop = document.createElement("div")
            newDivTop.className = "backgroundHexa"
            let hexa1 = document.createElement("div")
            hexa1.className = "hexa1"
            let hexa2 = document.createElement("div")
            hexa2.className = "hexa2"
            let hexa3 = document.createElement("div")
            hexa3.className = "hexa3"

            newDivTop.append(hexa1, hexa2, hexa3)

            let hexaTopLeft = document.createElement("div")
            hexaTopLeft.className = "hexaTopLeft"
            let hexa4 = document.createElement("div")
            hexa4.className = "hexa4"
            let hexa5 = document.createElement("div")
            hexa5.className = "hexa5"
            let hexa6 = document.createElement("div")
            hexa6.className = "hexa6"

            hexaTopLeft.append(hexa4, hexa5, hexa6)

            let hexaTopRight = document.createElement("div")
            hexaTopRight.className = "hexaTopRight"
            hexa4 = document.createElement("div")
            hexa4.className = "hexa4"
            hexa5 = document.createElement("div")
            hexa5.className = "hexa5"
            hexa6 = document.createElement("div")
            hexa6.className = "hexa6"

            hexaTopRight.append(hexa4, hexa5, hexa6)

            newDiv.append(newDivTop, hexaTopLeft, hexaTopRight)

            divLine.append(newDiv)
        }
        mainLabDiv.append(divLine)


            //         //Gestion des cases entrée et sortie
            //         if(lab[j]["entrance"])
            //             newDiv.style.backgroundColor = "white"
            //         if(lab[j]["exit"])
            //             newDiv.style.backgroundColor = "deepPink"
            //
            //         // Gestion des bordures
            //         if(lab[j]["walls"][0])
            //             newDiv.style.borderTop = "2px solid #760651"
            //         if(lab[j]["walls"][1])
            //             newDiv.style.borderRight = "2px solid #760651"
            //         if(lab[j]["walls"][2])
            //             newDiv.style.borderBottom = "2px solid #760651"
            //         if(lab[j]["walls"][3])
            //             newDiv.style.borderLeft = "2px solid #760651"
            //
            //         divLine.append(newDiv)
            //
            //     }
            //     divLine.className = "divLine"
            //     mainLabDiv.append(divLine)
            // }
            // return lab
        }
}
