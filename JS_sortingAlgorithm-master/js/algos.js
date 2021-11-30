// Converts from degrees to radians.
Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city)
{
  const GrenobleLat = 45.166667;
  const GrenobleLong = 5.716667;

  const R = 6371; // metres
  const φ1 = GrenobleLat // φ, λ in radians
  const φ2 = parseFloat(city.latitude).toRadians();
  const Δφ = (city.latitude-GrenobleLat).toRadians();
  const Δλ = (city.longitude-GrenobleLong).toRadians();

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // en km

}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i,j)
{
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
  const temp = csvData[j]
  csvData[j] = csvData[i]
  csvData[i] = temp
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j)
{
  displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
  return csvData[i].dist < csvData[j].dist;
}

function recursive(i){
  if(i>0){
    if(!isLess(i-1,i)){
      swap(i-1,i)
      recursive(i-1)
    }
  }
}

function insertsort()
{
  for(let i=0; i<csvData.length-1; i++){
    if(!isLess(i,i+1)){
      swap(i,i+1)
    }
    recursive(i)
  }
  console.log("insertsort - implement me !");
}

function selectionsort()
{
  for(let i=0; i<csvData.length; i++){
    for(let j=i+1; j<csvData.length; j++){
      if(isLess(j,i)){
        swap(i,j)
      }
    }
  }
  console.log("selectionsort - implement me !");
}

function bubblesort()
{
  let j = csvData.length
  let egalites = 0
  while(j>0){
    j=j-egalites
    for(let i=0;i<j-1;i++){
      if(!isLess(i,i+1)){
        swap(i,i+1)
        egalites = 0
      }
      else{
        egalites = egalites + 1
      }
    }
  }

  console.log("bubblesort - implement me !");
}

function recursiveShell(i,j){
  if(i-j>0){
    if(!isLess(i-j,i)){
      swap(i-j,i)
      recursiveShell(i-j,j)
    }
  }
}

function shellsort()
{
  let espacements = [701,301,132,57,23,10,4,1] // On définit nos espacements
  while(csvData.length>espacements[0]){ // Tant que la longueur du tableau dépasse la valeur max, on calcule une autre valeur
    espacements.unshift(espacements[0]*2.3)
  }

  let n = csvData.length
  espacements.forEach(gap => {
    for(let debut = 0 ; debut < gap; debut++){
      for( let i = debut ; i < n ; i = i+gap) {
        if (i + gap < n && !isLess(i, i + gap)) {
          swap(i, i + gap)
          recursiveShell(i, gap)
        }
      }
    }
  })

  console.log("shellsort - implement me !");
}

function mergesort()
{
  console.log("mergesort - implement me !");
}

// function organiser(tableau){
//   for(let i=0; i<tableau.length-1;i++){
//     remonter(tableau,i)
//   }
// }
//
// function remonter(tableau, index){
//   if(Math.floor(index) !== 0){
//     swap(Math.floor(index), Math.floor(index/2))
//     remonter(tableau, Math.floor(index/2))
//   }
// }

function redescendre(tableau, index){
  let largest = index,
      left = index * 2,
      right = index * 2 + 1;

  // Compare les éléments avec les enfants directs de droite et de gauche
  if (left < tableau.length && tableau[left] > tableau[largest]) {
    largest = left;
  }
  if (right < tableau.length && tableau[left] > tableau[largest]) {
    largest = right;
  }

  // si l'index n'est pas l'élément le plus grand on l'échange avec le plus grand des enfants
  if (largest !== index) {
    swap(index, largest);

    // continue to heapify down the heap
    redescendre(tableau, largest);
  }
  return tableau;
 }

 let tab = [2,7,3,4,5,6,1]

function heapsort(tab)
{
  for (let i = Math.floor(tab.length / 2); i >= 0; i--) {
    redescendre(tab, i)
  }

  for(let i=tab.length-1; i>0; i--){
    swap(0,i)
    redescendre(tab,0,i)
  }
}

function quicksort()
{
  console.log("quicksort - implement me !");
}
function quick3sort()
{
  console.log("quick3sort - implement me !");
}


function sort(algo)
{
  switch (algo)
  {
    case 'insert': insertsort();break;
    case 'select': selectionsort();break;
    case 'bubble': bubblesort();break;
    case 'shell': shellsort();break;
    case 'merge': mergesort();break;
    case 'heap': heapsort(tab);break;
    case 'quick': quicksort();break;
    case 'quick3': quick3sort();break;
    default: throw 'Invalid algorithm ' + algo;
  }
}
