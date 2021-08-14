
var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

let poblacion = function() {
    function generarPoblacion(longitudCadena) {
        var text = ""; 
        var charset = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        //Generamos una cadena de caracteres del tamaño de la cadena objetivo
        for(var i=0;i<longitudCadena;i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }

    let cadena = this.userData["cadena"];
    return generarPoblacion(cadena.length);
}

let mutacion = function(cadena) {
    //Generar la inserción del caracter
    function replaceAt(str, index, character) {
        return str.substr(0, index) + character + str.substr(index+character.length);
    }

    // Buscar aleatoriamente un caracter a insertar
    var carDes = Math.floor(Math.random()*cadena.length)		
    return replaceAt(cadena, carDes, String.fromCharCode(cadena.charCodeAt(carDes) + (Math.floor(Math.random()*2) ? 1 : -1)));

}

let cruce = function(madre, padre) {
    //Seleccionar el punto para el cruce
    var len = madre.length;
    var punto = Math.floor(Math.random()*len);

    //Realizar el cruce apartir del punto
    var hijo = padre.substr(0,punto) + madre.substr(punto);
    var hija = madre.substr(0,punto) + padre.substr(punto);

    return [hijo, hija];
}

let fitness = function(cadena){
    var fitness = 0;
	
	//Recorrer la cadeda y verificar cuales coinciden con la cadena objetivo
	var i;
	for (i=0;i<cadena.length;++i) {

        let distanciaAbsolutaCaracteres = Math.abs(cadena.charCodeAt(i) - 
            this.userData["cadena"].charCodeAt(i));

        let distanciaExtrapolada = 127 - distanciaAbsolutaCaracteres;
        let porcentajeAptitud = distanciaExtrapolada / 127;

        let aptitud = 5 * porcentajeAptitud;

        fitness += porcentajeAptitud;
	}

	return fitness;
}

let generacion = function(pop, generation, stats){
    //Encontrar el punto donde se llega a la solución
    return pop[0].entity != this.userData["cadena"];
}

let notificacion = function(pop, generation, stats, isFinished) {
    
    function lerp(a, b, p) {
		return a + (b-a)*p;
	}
	//Se verifica la ultima cadena generada garantizando que se esta en el valor que coincide con la cadena
	var value = pop[0].entity;
	this.last = this.last||value;
	
	if (pop != 0 && value == this.last)
		return;
	
	
	var cadena = [];
	var i;
	//Recorre la cadena para marcar los caracteres que no coinciden positivo y negativamente
	for (i=0;i<value.length;++i) {
		var caraterDiferente = value.charCodeAt(i) - this.last.charCodeAt(i);
		var style = "background: transparent;";
		if (caraterDiferente > 0) {
			style = "background: rgb(0,183,200); color: #fff;";
		} else if (caraterDiferente < 0) {
			style = "background: rgb(8,255,214); color: #fff;";
		}
		//Genera los individuos de cada generación
		cadena.push("<span style=\"" + style + "\">" + value[i] + "</span>");
	}
	
	var resultado = "";
	resultado += "<tr>";
	resultado += "<td>" + generation + "</td>";
	//Muestra el valor fitnes que se genero en cada iteración
	resultado += "<td>" + pop[0].fitness.toPrecision(5) + "</td>";
	//Muestra el individuo generado en cada iteración
	resultado += "<td>" + cadena.join("") + "</td>";
	resultado += "</tr>";
	$("#resultado tbody").prepend(resultado);
	
	this.last = value;
}

genetic.seed = poblacion;
genetic.mutate = mutacion;
genetic.crossover = cruce;
genetic.fitness = fitness;
genetic.generation = generacion;
genetic.notification = notificacion;

/*let configuraciones = {
    "iterations": 4000,
    "size": 100,
    "crossover": 0.8,
    "mutation": 0.8,
    "skip": 20
}*/




document.getElementById("start").addEventListener("click", () => {
    $("#resultado tbody").html("");

    let configuraciones = {
        "iterations": $("#cantidad").val(),
        "size": 250,
        "crossover": $("#probCruc").val(),
        "mutation": $("#probMut").val(),
        "skip": $("#skip").val()
    }

    var datosUsuario = {
        "cadena": document.getElementById("nombre").value
    };

    genetic.evolve(configuraciones, datosUsuario);
});