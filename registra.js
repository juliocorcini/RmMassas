if (navigator.serviceWorker){
    navigator.serviceWorker.register('/serviceWorker.js').then(function(reg){
        console.log("OK, Sw");
    }).catch(function(err) {
        console.log("Falha, Sw");
        console.log(err)
    })
}