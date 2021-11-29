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


function insertsort()
{

  console.log("insertsort - implement me !");
}

function selectionsort()
{
  console.log("selectionsort - implement me !");
}

function bubblesort()
{
  console.log("bubblesort - implement me !");
}

function shellsort()
{
  console.log("shellsort - implement me !");
}

function mergesort()
{
  console.log("mergesort - implement me !");
}

function heapsort()
{
  console.log("heapsort - implement me !");
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
    case 'heap': heapsort();break;
    case 'quick': quicksort();break;
    case 'quick3': quick3sort();break;
    default: throw 'Invalid algorithm ' + algo;
  }
}
