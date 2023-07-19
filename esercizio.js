//funzione che dato un array in ingresso e dato un n e una stringa
//mette in array in ingresso tante stringhe quanto n 

//funzione arrayStringhe
//ciclo for di n
//push stringhe in array

function arrayStringhe(arr, n, stringa) {

    for (let i = 0; i < n; i++) {
        arr.push(stringa)
    }
    console.log(arr);
    return arr
}

arrayStringhe([], 5, "ciao")


//funzione che data una stringa toglie tutte le consonanti

//funzione consLess
//creo array vocali
//stringa di ritorno
//ciclo dentro stringa 
//se stringa (incl) vowels =>  stringa di ritorno = stringa di ritorno + string[i]
//stringa di ritorno

function consLess(string) {
    let vowles = ["a", "e", "i", "o", "u"];
    let newString = "";

    for (let i = 0; i < string.length; i++) {
        if (vowles.includes(string[i])) {
            newString += string[i];
        }
    }

    console.log(newString);
    return newString;
}

consLess("bella");
