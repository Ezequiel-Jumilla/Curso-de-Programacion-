// 0 a 1000 metros = pie
// 1000 a 10000 metros = bicicleta
// 10000 a 30000 metros = colectivo
// 30000 a 100000 metros = auto
//  +100000 = avión
var metros,num1,num2,num3,num4;

metros=prompt("ingrese cantidad de metros a recorrer:"," ");
num1=parseInt(1000);
num2=parseInt(10000);
num3=parseInt(30000);
num4=parseInt(100000);

    if (metros<num1){
    alert("El medio de transporte indicado es a pie");
}else{
    if (metros>num1 && metros<num2)
    alert("El medio de transporte indicado es la bicicleta");
    }
    if (metros>num2 && metros<num3)
    alert("El medio de transporte indicado es el colectivo");
else{
    if (metros>num3 && metros<num4)
    alert("El medio de transporte indicado es el auto")
    if (metros>num4)
    alert("El medio de transporte indicado es el avion")
}

// HASTA ACA LA PRIMER TAREA DE LA UNIDAD 4 

var numeros = [89, 952, 22, 7, 471, 137];
var mayor = 0;
    for (var i = 0; i < numeros.length; i++) {
        if (numeros [i] > mayor) {
            mayor = numeros [i]
        }
    }
    console.log( "el mayor de " + numeros + " es " + mayor);
    