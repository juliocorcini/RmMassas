self.addEventListener('install', function(e) {
	console.log("SW Instalado")
  e.waitUntil(
    caches.open('Cliente').then(function(cache) {
      return cache.addAll([
        '/administracao.html',
        '/login.html',
        '/js/administracao.js',
        '/js/login.js'
      ]);
    })
  );
 });

self.addEventListener("fetch",function(event){
	console.log(event)	
})

 self.addEventListener("fetch",function(event){
  event.respondWith(
      fetch(event.request).then(function(response){
        if (response.status == 404){
          return new Response("NÃO Encontrado!!!");
        }
        return response;
      }).catch(function(){
        const semNet = new Request('./administracao.html');
        let promiseResposta = caches.match(semNet).then(respostaCache => {
          if(respostaCache){
              resposta = respostaCache;
              console.log('cache encontrado, resposata sem internet!');
          }else{
              resposta =  new Response("Sem Cache!!");
              console.log('Sem Cache!!');
          }
        })
        return resposta;
      })
  );
});


self.addEventListener('activate', function(e) {
	console.log("SW foi ativado")
})

/*
self.addEventListener("fetch",function(event){
  
  let pedido = event.request
  console.log(pedido)
  let promiseResposta = caches.match(pedido).then(respostaCache => {
    if(respostaCache){
        resposta = respostaCache
        console.log('cache')
    }else{
        resposta =  fetch(pedido)
        console.log('online')
    }
  })
  event.respondWith(resposta)
})
*/