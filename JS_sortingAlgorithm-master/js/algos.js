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

function recursive(i) {
    if (i > 0) {
        if (!isLess(i - 1, i)) {
            swap(i - 1, i)
            recursive(i - 1)
        }
    }
}

function insertsort() {
    for (let i = 0; i < csvData.length - 1; i++) {
        if (!isLess(i, i + 1)) {
            swap(i, i + 1)
        }
        recursive(i)
    }
    console.log("insertsort - implement me !");
}

function selectionsort() {
    for (let i = 0; i < csvData.length; i++) {
        for (let j = i + 1; j < csvData.length; j++) {
            if (isLess(j, i)) {
                swap(i, j)
            }
        }
    }
    console.log("selectionsort - implement me !");
}

function bubblesort() {
    let j = csvData.length
    let egalites = 0
    while (j > 0) {
        j = j - egalites
        for (let i = 0; i < j - 1; i++) {
            if (!isLess(i, i + 1)) {
                swap(i, i + 1)
                egalites = 0
            } else {
                egalites = egalites + 1
            }
        }
    }

    console.log("bubblesort - implement me !");
}

function recursiveShell(i, j) {
    if (i - j > 0) {
        if (!isLess(i - j, i)) {
            swap(i - j, i)
            recursiveShell(i - j, j)
        }
    }
}

function shellsort() {
    let espacements = [701, 301, 132, 57, 23, 10, 4, 1] // On définit nos espacements
    while (csvData.length > espacements[0]) { // Tant que la longueur du tableau dépasse la valeur max, on calcule une autre valeur
        espacements.unshift(espacements[0] * 2.3)
    }

    let n = csvData.length
    espacements.forEach(gap => {
        for (let debut = 0; debut < gap; debut++) {
            for (let i = debut; i < n; i = i + gap) {
                if (i + gap < n && !isLess(i, i + gap)) {
                    swap(i, i + gap)
                    recursiveShell(i, gap)
                }
            }
        }
    })

    console.log("shellsort - implement me !");
}

let tableau = [4,3,2,1]
let tableauVide = []

function mergesort(tab) {
    if(tab.length<=1){
        console.log(tab)
        return tab
    }
    else{
        let tableauA = tableauVide.concat(tab.slice(0,Math.floor(tab.length/2)))
        let tableauB = tableauVide.concat(tab.slice(Math.floor(tab.length/2),tab.length))
        merge(mergesort(tableauA), mergesort(tableauB))
    }
}

function merge(tableauA, tableauB){

    if(tableauA.length === 0){
        return tableauB
    }
    if(tableauB.length === 0){
        return tableauA
    }
    if(tableauA[0]<=tableauB[0]){
        let valeur = tableauA[0]
        tableauA.shift()
        return [valeur,merge(tableauA,tableauB)]
    }
    else{
        let valeur = tableauB[0]
        tableauB.shift()
        return [valeur,merge(tableauA,tableauB)]
    }
}

function organiser() {
    for (let i = 0; i < csvData.length; i++) {
        remonter(i)
    }
}

function remonter(index) {

    if (index === 0) return;

    if (!isLess(Math.floor(index), Math.floor((index-1) / 2))) {
        swap(Math.floor(index), Math.floor((index-1) / 2))
        remonter(Math.floor((index-1) / 2))
    }
}

function redescendre(element, index) {
    let gauche = 2 * index + 1
    let droite = 2 * index + 2

    if (gauche > element) return;

    if (gauche === element){
        if (!isLess(gauche, index)) {
            swap(gauche, index)
        }
    }
    else{
        let max

        if (csvData[gauche].dist > csvData[droite].dist) {
            max = gauche
        } else {
            max = droite
        }
        if (!isLess(max, index)) {
            swap(max, index)
            redescendre(element, max)
        }
    }
}

// let tableau = [4,2,7,3,28,27,26,25,19,23,22,18,2000,18,2000,17,16,15,14,13,12,11,10,9,8,1,6,5]

function heapsort() {
    organiser()

    for (let i = csvData.length - 1; i > 0; i--) {
        swap(0, i)
        redescendre(i-1, 0)
    }

    console.log(csvData)
}

function quicksort() {
    console.log("quicksort - implement me !");
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
            mergesort(tableau);
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
