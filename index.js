
var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

let poblacion = function() {

}

let mutacion = function(cadena) {

}

let cruce = function(madre, padre) {

}

let fitness = function(cadena){

}

let generacion = function(pop, generacion, estadisticas){

}

let notificacion = function(pop, generacion, estadisticas, terminado) {

}

genetic.seed = poblacion;
genetic.mutate = mutacion;
genetic.crossover = cruce;
genetic.fitness = fitness;
genetic.generation = generacion;
genetic.notification = notificacion;

let configuraciones = {
    "iterations": 4000,
    "size": 100,
    "crossover": 0.8,
    "mutation": 0.8,
    "skip": 10
}

var datosUsuario = {
    "solution": document.getElementById("nombre").value
};

document.getElementById("start").addEventListener("click", () => {
    alert("inicia solución" + datosUsuario.solution);
    //genetic.evolve(configuraciones, datosUsuario);
});