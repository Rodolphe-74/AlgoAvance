function factorielle(nombre){
    if (nombre === 0)
        return 1;
    else
        return nombre * factorielle(nombre-1);
}

function fibonacci(n){
    if (n>1)
        return fibonacci(n-1) + fibonacci(n-2)
    else if (n===1)
        return 1;
    else
        return 0;

}

function syracuse(n,i){
    if(i===0){
        return n;
    }
    else if (i>0)
        if(syracuse(n,i-1)%2 === 0)
            return syracuse(n,i-1)/2
        else
            return 3 * syracuse(n,i-1) + 1
}

function pgcd(a,b) {
    if(b===0)
        return a
    else
        return pgcd(b,a%b)
}


console.log(factorielle(6))
console.log(fibonacci(5))
console.log(syracuse(15,5))
console.log(pgcd(0,7))



