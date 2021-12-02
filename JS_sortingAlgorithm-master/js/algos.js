// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    const GrenobleLat = 45.166667;
    const GrenobleLong = 5.716667;

    const R = 6371; // metres
    const φ1 = GrenobleLat // φ, λ in radians
    const φ2 = parseFloat(city.latitude).toRadians();
    const Δφ = (city.latitude - GrenobleLat).toRadians();
    const Δλ = (city.longitude - GrenobleLong).toRadians();

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // en km

}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    const temp = csvData[j];
    csvData[j] = csvData[i];
    csvData[i] = temp;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
    return csvData[i].dist < csvData[j].dist;
}





//===================== TRI PAR INSERTION ======================//

function insertsort() {
    for (let i = 0; i < csvData.length - 1; i++) {     // Parcours de tout notre tableau
        if (!isLess(i, i + 1)) {                    // Lorsqu'une valeur est inférieure à l'index supérieur, on l'échange
            swap(i, i + 1)
        }
        recursive(i)                                  // A chaque fois on vérifie que la valeur échangée avec celle du dessous
    }
}

function recursive(i) {
    if (i > 0) {                                      // Si i n'a pas atteint la valeur min du tableau
        if (!isLess(i - 1, i)) {                   // Ou si i-1 est inférieur à i
            swap(i - 1, i)                         // On échange les valeurs
            recursive(i - 1)                       // Et comme on échange, on vérifie à nouveau avec la valeur du dessous et ainsi de suite
        }                                            // jusqu'à ce que les valeurs ne soient pas échangées ou que i = 0
    }
}





//===================== TRI PAR SELECTION ======================//

function selectionsort() {
    for (let i = 0; i < csvData.length; i++) {                  // On parcourt tout notre tableau de villes
        for (let j = i + 1; j < csvData.length; j++) {          // On compare chaque valeur de ce tableau à toutes les autres
            if (isLess(j, i)) {                                 // Si une valeur est inférieure
                swap(i, j)                                      // on l'échange avec notre valeur comparée
            }
        }
    }
}


//======================== TRI PAR BULLE =========================//

function bubblesort() {
    let j = csvData.length                               // Soit j la longueur du tableau
    let egalites = 0                                     // Variable egalité qui sert à compter le nombre de comparaisons où il n'y a pas eu d'échange
    while (j > 0) {
        j = j - egalites                                 // on retranche à j le nombre d'égalités que l'on a eu pour ne pas faire des comparaisons inutiles
        for (let i = 0; i < j - 1; i++) {
            if (!isLess(i, i + 1)) {                  // Si la valeur à l'index i+1 est plus petite que la valeur à l'index i
                swap(i, i + 1)                        // On échange les valeurs
                egalites = 0                            // Comme on vient d'échanger une valeur la variable égalités (ou status quo) redevient 0
            } else {
                egalites = egalites + 1                 // S'il n'y a pas d'échange on augmente le compteur "d'inactivité" de 1
            }
        }
    }

}


//================================= TRI SHELL ================================//

function shellsort() {
    let espacements = [701, 301, 132, 57, 23, 10, 4, 1]         // On définit nos espacements
    while (csvData.length > espacements[0]) {                   // Tant que la longueur du tableau dépasse la valeur max, on calcule une autre valeur
        espacements.unshift(espacements[0] * 2.3)         // La nouvelle valeur calculée est ajoutée au début du tableau
    }

    let n = csvData.length                                      // n est la longueur de notre tableau
    espacements.forEach(gap => {                                // On parcours chaque valeur de notre tableau d'espacement
        for (let debut = 0; debut < gap; debut++) {             // Pour chaque index du tableau allant de 0 à gap
            for (let i = debut; i < n; i = i + gap) {           // Pour chaque index de notre tableau on compare à l'index i+gap
                if (i + gap < n && !isLess(i, i + gap)) {    // Si l'index i + gap ne dépasse pas le tableau et que i+gap < i
                    swap(i, i + gap)                         // on les échange
                    recursiveShell(i, gap)                     // On appelle la récursive permettant de vérifier que les valeurs inférieures sont bien plus petites
                }
            }
        }
    })
}

function recursiveShell(i, gap) {
    if (i - gap > 0) {                                           // si i-gap ne dépasse pas l'index min de notre tableau
        if (!isLess(i - gap, i)) {                            // et si i < i-gap
            swap(i - gap, i)                                  // alors on échange les valeurs
            recursiveShell(i - gap, gap)                      // et on recommence avec un pas de i-gap jusqu'à tomber à un index inférieur à notre tableau
        }
    }
}





//================================= TRI MERGE ================================//

let tableau = [2,6,22,-8000,10000,5,3,8,8,7,4,1,0]                                 // Jeu de données perso
let tableauVide = []                                            // tableau vide à concaténer par la suite

function afficherResultat(){
    let result = mergesort(tableau)                             // On affiche le résultat au travers de cette fonction
    console.log(result)
}

function mergesort(tab) {
    if(tab.length === 1){                                       // Si la longueur de notre tableau n'est plus que d'1 élément on retourne le tableau
        return tab
    }
    let tableauA = tableauVide.concat(tab.slice(0,Math.floor(tab.length/2)))            // On crée la première partie de notre tableau divisée en 2
    let tableauB = tableauVide.concat(tab.slice(Math.floor(tab.length/2),tab.length))   // On crée le complément

    tableauA = mergesort(tableauA)                              // Notre tableau A est divisé jusqu'à ne compter qu'un élément
    tableauB = mergesort(tableauB)                              // idem pour tableau B

    return merge(tableauA, tableauB)                            // On retourne le merge du tableau A et du tableau B
}

function merge(tableauA, tableauB) {

    let tableauC = []                                           // On crée un tableau vide

    while (tableauA.length !== 0 && tableauB.length !== 0) {    // Tant que le tableau A et le tableau B comptent encore des éléments
        if (tableauA[0] > tableauB[0]) {                        // Si la valeur de l'index 0 du tableau A est supérieur à celui de B
            tableauC.push(tableauB[0])                          // On pousse la valeur de B qui est la plus petite dans le tableau C
            tableauB.shift()                                    // On enlève la valeur du tableau B
        } else {
            tableauC.push(tableauA[0])                          // Sinon on pousse la valeur de A dans le tableau C
            tableauA.shift()                                    // On enlève la valeur du tableau A
        }
    }

    while(tableauA.length !== 0) {                              // Tant que le tableau A n'est pas vide
        tableauC.push(tableauA[0])                              // On pousse les valeurs de l'index 0 les unes après les autres
        tableauA.shift()                                        // On les supprime en même temps du tableau A
    }

    while(tableauB.length !== 0) {                              // Même principe avec B
        tableauC.push(tableauB[0])
        tableauB.shift()
    }

    return tableauC                                             // On retourne notre tableau C constitué
}


//================================= TRI PAR TAS ================================//

// let tableau = [4,2,7,3,28,27,26,25,19,23,22,18,2000,18,2000,17,16,15,14,13,12,11,10,9,8,1,6,5]

function heapsort() {
    organiser()                                                 // On organise nos données
    for (let i = csvData.length - 1; i > 0; i--) {              // Pour chaque valeur allant de l'index max -1 de notre tableau à 1
        swap(0, i)                                           // On échange notre dernière valeur du tableau avec celle de la branche du haut (qui est la plus grande)
        redescendre(i-1, 0)                       // On appelle la fonction de descente car l'élément échangé doit potentiellement redescendre (on ne prend plus en compte la dernière valeur du tableau qui est triée)
    }
    console.log(csvData)
}

function organiser() {                                          // On organise notre tableau
    for (let i = 0; i < csvData.length; i++) {                  // On parcourt tout notre tableau de villes
        remonter(i)                                             // On remonte notre valeur courante
    }
}

function remonter(index) {
    if (index === 0) return;                                            // Si notre index est à 0 on arrete tout
    if (!isLess(Math.floor(index), Math.floor((index-1) / 2))) {    // On compare les valeurs de notre branche fille à notre branche parente
        swap(Math.floor(index), Math.floor((index-1) / 2))          // Si besoin on les échange
        remonter(Math.floor((index-1) / 2))                         // On utilise cette récursive tant que la valeur max n'a pas été remontée à l'index 0
    }
}

function redescendre(element, index) {
    let gauche = 2 * index + 1                                         // On définit la branche à gauche
    let droite = 2 * index + 2                                         // Puis celle de droite

    if (gauche > element) return;                                      // si celle de gauche est supérieure au nombre d'éléments on retourne

    if (gauche === element){                                            // Si elle est égale
        if (!isLess(gauche, index)) {                                   // On échange avec la branche de gauche si elle est supérieure à l'index
            swap(gauche, index)
        }
    }
    else{
        let max

        if (csvData[gauche].dist > csvData[droite].dist) {              // Sinon la branche gauche n'est pas égale ni supérieure à la taille du tableau
            max = gauche                                                // et que la valeur de gauche est supérieure à celle de droite, la valeur max est à gauche
        } else {
            max = droite                                                // Sinon à droite
        }
        if (!isLess(max, index)) {                                      // On regarde si notre index est bien supérieur à notre max, sinon on le swap
            swap(max, index)
            redescendre(element, max)                                   // Et ainsi de suite avec la récursive on parcourt toutes nos branches
        }
    }
}


//================================= TRI RAPIDE ================================//

function quicksort(low, high) {
    if(low<high){
        let pivotLocation = partition(low,high)      // On définit un pivot au début de notre tableau
        quicksort(low,pivotLocation-1)
        quicksort(pivotLocation+1,high)
    }
}

function partition(low, high){
    // let pivot = tableau[low]
    let leftwall = low                              //

    for( let i=low+1 ; i<=high; i++){
        if(isLess(i,low)){
            leftwall++
            swap(i,leftwall)
        }
    }
    swap(low,leftwall)

    return leftwall
}

function quick3sort() {
    console.log("quick3sort - implement me !");
}


function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            afficherResultat(tableau);
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort(0,csvData.length-1);
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
