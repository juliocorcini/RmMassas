function iniciaEstoque(){

    $("#DivProdutos").children().remove()
    db.collection("TipoProdutos").get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            quadroProdutos =  $('<div class="row">'+
                                    '<div class="col s12">'+
                                        '<div class="card-panel grey" style="padding-top: 0%">'+
                                            '<div id="row'+doc.data()["Descricao"]+'" class="row">'+
                                                '<div class="col s12 center-align grey-text text-lighten-4">'+
                                                    '<h5>'+doc.data()["Descricao"]+'</h5>'+
                                                    '<div class="divider" style="margin-bottom:30px"></div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>')
                        $("#DivProdutos").append(quadroProdutos)

                        db.collection("Estoque").where("Tipo","==",doc.data()["Descricao"]).where("Quantidade",">=",0).orderBy("Quantidade","desc").get().then((querySnapshot) => {
                            querySnapshot.docs.forEach((doc2) => {

                                itensProdutos = $(
                                '<div class="col s12 l3 center-align">'+
                                    '<div class="card-panel grey-text text-darken-3" style="background-color: #ffcc76 !important;">'+
                                        '<h5>'+doc2.data()['Produto']+'</h5>'+
                                        '<div class="row">'+
                                            '<div class="col s12">'+
                                                '<div class="col s6 right-align">'+
                                                    '<h6 style="margin-top: 40px">Qtd: '+doc2.data()['Quantidade']+' \n('+doc2.data()['Peso']+'g/ml)</h6>'+
                                                '</div>'+
                                                '<div class="col s6 left-align">'+
                                                    '<h6 style="margin-top: 40px">Preço: '+formataEmReais(doc2.data()['Preco'])+'</h6>'+
                                                '</div>'+
                                                '<div class="col s12 center-align">'+
                                                    '<h6 style="margin-top: 20px">'+doc2.data()['Descricao']+'</h6>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>')

                                //console.log("#row"+doc.data()['Descricao'])
                                $("#row"+doc.data()['Descricao']).append(itensProdutos)
                                
                                itensProdutos = ""

                               //console.log(doc2.data());
                            });
                        });
        });
    });
    //tirado
    /*setTimeout(function(){
        M.Tabs.getInstance($("#tabsPedidos")[0]).updateTabIndicator()
    },3000)*/
    

}

iniciaEstoque()

function iniciaAdministracao(){

    while($("#tabelasAdministracao")[0].childElementCount != 0){
        $("#tabelasAdministracao")[0].childNodes.forEach(function(filhos){
        
        filhos.remove()
        
        })
    }

    while($("#divtabsProdutos")[0].childElementCount != 0){
        $("#divtabsProdutos")[0].childNodes.forEach(function(filhos){
        
        filhos.remove()
        
        })
    }

    while($("#divProdutos")[0].childElementCount != 0){
        $("#divProdutos")[0].childNodes.forEach(function(filhos){
        
        filhos.remove()
        
        })
    }

    while($("#TipoProdutoNovo")[0].childElementCount != 0){
        $("#TipoProdutoNovo")[0].childNodes.forEach(function(filhos){
        
        filhos.remove()
        
        })
    }

     
    

    db.collection("TipoProdutos").orderBy("OrdemExibicao","asc").get().then((querySnapshot) => {
        a =  '<div class="row">'+
                    '<div class="col s12">'+
                        '<div class="card-panel" style="padding-top: 0%">'+
                            '<div class="row" style="margin-bottom: 0px;">'+
                                '<div class="col s12 center-align">'+
                                    '<h5>Tipos de Produto</h5>'+
                                    '<div class="divider" style=""></div>'+
                                '</div>'+
                            '</div>'+
                           '<div class="row">'+
                                '<div class="input-field col s7 m12" style="margin-top: 15px;margin-bottom: 0px;">'+
                                    '<input id="descricaoTipo" type="text">'+
                                    '<label for="descricaoTipo">Descrição Tipo de Produto</label>'+
                                '</div>'+
                                '<div class="input-field col s5 m12 center-align" style="margin-top: 15px;margin-bottom: 0px;">'+
                                    '<a class="btn orange" onclick="adicionaTipoProduto()">Adicionar</a>'+
                                '</div>'+
                            '</div>'

                
        b = '<div class="row">'+
                '<div class="col s12">'+
                    "<table class='responsive-table center-align'>"+
                        "<thead>"+
                            "<tr>"+
                                "<th class='center-align'>Ordem</th>"+    
                                "<th class='center-align'>Descrição</th>"+
                                "<th class='center-align'>Excluir</th>"+
                            "</tr>"+
                        "</thead>"+
                        "<tbody>"
        resultado = a+b

                    querySnapshot.docs.forEach((doc) => {
                        c='<tr style="border-style: solid; border-width: thin; border-color: lightgray;">'+
                                '<td class="center-align"><input class="InputOrdenacao" produto="'+doc.data()["Descricao"]+'" onchange="alteraOrdenacao(this)" id="InputOrdenacao'+doc.data()["Descricao"]+'" style="width: 40px;" value="'+doc.data()["OrdemExibicao"]+'" type="text" min="1"></input></td>'+
                                '<td class="center-align">'+doc.data()["Descricao"]+'</td>'+
                                '<td class="center-align"><span class="material-icons red-text" style="cursor:pointer" onclick="excluirTipoProduto(\''+doc.id+'\')">delete</span></td>'+
                            '</tr>'
                        
                        resultado = resultado+c
                    });

                        d="</tbody>"+
                        "</table>"+
                    "</div>"+
                "</div>"+
            '</div>'+
        '</div>'+
    '</div>'

            resultado = resultado+d
            $("#tabelasAdministracao").append(resultado)

    });


        
    $("#TipoProdutoNovo").append($('<option value="" disabled selected>Escolha o Tipo </option>'))
    $("#divtabsProdutos").append($('<ul id="tabsProdutos" class="tabs"></ul>')) 
        db.collection("TipoProdutos").get().then((querySnapshot) => {


            querySnapshot.docs.forEach((doc) => {
                $("#TipoProdutoNovo").append($('<option value="'+doc.data()["Descricao"]+'">'+doc.data()["Descricao"]+'</div>'))
                $("#tabsProdutos").append($('<li class="tab"><a href="#'+doc.data()["Descricao"]+'produtoDiv">'+doc.data()["Descricao"]+'</a></li>'))
                var divtabsProdutos = $('<div id="'+doc.data()["Descricao"]+'produtoDiv" class=""></div>')
                
                var tableProduto = $("<table>").append(
                                        $("<thead>").append(
                                            $("<tr>").append(
                                                $("<th class='center-align'>Nome</th>"),
                                                $("<th class='center-align'>Peso</th>"),
                                                $("<th class='center-align'>Quantidade</th>"),
                                                $("<th class='center-align'>Preço</th>"),
                                                $("<th class='center-align'>Editar</th>")
                                            )
                                        ),
                                    )
                
                var bodyTableProduto = $("<tbody>")
                
                db.collection("Estoque").where("Tipo","==",doc.data()["Descricao"]).get().then((EstoqueSnapshot) => {


                    EstoqueSnapshot.docs.forEach((estoque) => {

                        bodyTableProduto.append(
                            $("<tr>").append(
                                $("<td class='center-align'>"+rmvUndef(estoque.data()['Produto'])+"</td>"),
                                $("<td class='center-align'>"+rmvUndef(estoque.data()['Peso'])+"</td>"),
                                $("<td class='center-align'>"+rmvUndef(estoque.data()['Quantidade'])+"</td>"),
                                $("<td class='center-align'>"+formataEmReais(rmvUndef(estoque.data()['Preco']))+"</td>"),
                                $("<td class='center-align'><span idproduto='"+estoque.id+"' onclick='editarProdutos(this)' class='material-icons orange-text' style='cursor:pointer' >edit</span></td>")
                            )
                        )
                        
                    })

                })
                tableProduto.append(bodyTableProduto)

                divtabsProdutos.append(tableProduto)

                $("#divProdutos").append(divtabsProdutos)

                $('#tabsProdutos').tabs();
            });
        $('#TipoProdutoNovo').formSelect()
/*
        
            resultado = resultado+d
                    console.log(resultado)
            $("#tabelasAdministracao").append(resultado)
*/
    });

    

}
/*
function salvaOrdenacao(){

    .attributes["produto"].value

}*/

function alteraOrdenacao(input){
    $(".InputOrdenacao[value='"+input.value+"']")[0].value=""

    a = input
}

function iniciaVendas(){
    populaPedidosJaFeitos()
    populaPedidosEncomenda()

    $('#tabsPedidos').tabs();  
    
    setTimeout(function(){
        M.Tabs.getInstance($("#tabsPedidos")[0]).updateTabIndicator()
    },2500)

    
}

function iniciaClientes(){

    $("#divClientesCadastrados").children().remove()

    $("#divClientesCadastrados").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Numero Cliente</th>"),
                    $("<th class='center-align'>Nome</th>"),
                    $("<th class='center-align'>Telefone</th>"),
                    $("<th class='center-align'>Endereço</th>"),
                    $("<th class='center-align'>Num. End.</th>"),
                    $("<th class='center-align'>Complemento</th>")
                )
            ),
            $("<tbody id='tbodyClienteCadastrado'>")
        ) 
    )

    db.collection("Clientes").orderBy("NumeroCliente","asc").get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {

            $("#tbodyClienteCadastrado").prepend($("<tr style='cursor:pointer' onclick='editaCliente(\""+estoque.data()["NumeroCliente"]+"\")'><td class='center-align'>"+estoque.data()["NumeroCliente"]+"</td><td class='center-align'>"+estoque.data()["Nome"]+"</td><td class='center-align'>"+estoque.data()["Telefone"]+"</td><td class='center-align'>"+estoque.data()["Endereco"]+"</td><td class='center-align'>"+estoque.data()["NumeroEndereco"]+"</td><td class='center-align'>"+estoque.data()["Complemento"]+"</td></tr>"))

        })

    })

    

}

//iniciaClientes()

function iniciaCompras(){


    $("#divCriaPedidoCompra").children().remove()

    $("#divCriaPedidoCompra").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Produto</th>"),
                    $("<th class='center-align'>Qtd. Produtos</th>")
                )
            ),
            $("<tbody id='tbodyConfirmaPedidoCompra'>")
        ) 
    )
    var objPedidosParaCompra = {}
    db.collection("ItensPedido").where("TipoPedido","==","Encomenda").where("CompraRequisitada","==",false).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            if(objPedidosParaCompra.hasOwnProperty(estoque.data()["Produto"])){
                var quantidadeAntes = zeraNulo(objPedidosParaCompra[estoque.data()["Produto"]])
                var quantidadeNova = zeraNulo(estoque.data()["Quantidade"])
                objPedidosParaCompra[estoque.data()["Produto"]]=(quantidadeAntes+quantidadeNova)
            }else{
                objPedidosParaCompra[estoque.data()["Produto"]] = estoque.data()["Quantidade"]
            }
        })

        var arrayPedidosParaCompra = Object.entries(objPedidosParaCompra)

        arrayPedidosParaCompra.forEach(function(somaProdutos){

            $("#tbodyConfirmaPedidoCompra").prepend($("<tr><td class='center-align'>"+somaProdutos[0]+"</td><td class='center-align'>"+somaProdutos[1]+"</td></tr>"))

            //console.log(somaProdutos[0]+" aaa "+somaProdutos[1])
        })

        if(arrayPedidosParaCompra.length != 0){
            $("#divCriaPedidoCompra").append("<a class='btn green right' onclick='confirmaEncomendaItens()' style='margin-top:15px'>Confirma Encomenda dos itens</a>")
        }
    })
/*
    $("#DivconfirmaEncomenda").append("<a class='btn orange left' style='margin-top:20px' onclick='voltarTelaConfirmaPedidoEncomenda()'>Voltar</a>")

    $("#DivconfirmaEncomenda").removeClass("hide")



    db.collection("ItensPedido").where("TipoPedido","==","Encomenda").get().then((EstoqueSnapshot) => {

        EstoqueSnapshot.docs.forEach((estoque) => {

            var produto = rmvUndef(estoque.data()["Produto"])
            var quantidade = parseFloat(rmvUndef(estoque.data()["Quantidade"]))
            var preco = parseFloat(rmvUndef(estoque.data()["Preco"]))

            var precototal = (quantidade*preco)
            console.log("<tr><td class='center-align'>"+produto+"</td><td class='center-align'>"+quantidade+"</td><td class='center-align'>"+formataEmReais(precototal)+"<td class='center-align'><span onclick='cofirmaPedidoEncomenda(\'9\')' class='material-icons orange-text' style='cursor:pointer'>send</span></td></tr>")

        })
    })
*/
 
    $("#divPedidoEncomendado").children().remove()

    $("#divPedidoEncomendado").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Produto</th>"),
                    $("<th class='center-align'>Qtd. Produtos</th>")
                )
            ),
            $("<tbody id='tbodyConfirmaEncomendado'>")
        ) 
    )
    var objPedidosEncomendados = {}
    db.collection("ItensPedido").where("TipoPedido","==","Encomenda").where("CompraRequisitada","==",true).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            if(objPedidosEncomendados.hasOwnProperty(estoque.data()["Produto"])){
                var quantidadeAntes = zeraNulo(objPedidosEncomendados[estoque.data()["Produto"]])
                var quantidadeNova = zeraNulo(estoque.data()["Quantidade"])
                objPedidosEncomendados[estoque.data()["Produto"]]=(quantidadeAntes+quantidadeNova)
            }else{
                objPedidosEncomendados[estoque.data()["Produto"]] = estoque.data()["Quantidade"]
            }
        })

        var arrayPedidosEncomendados = Object.entries(objPedidosEncomendados)

        arrayPedidosEncomendados.forEach(function(somaProdutos){

            $("#tbodyConfirmaEncomendado").prepend($("<tr><td class='center-align'>"+somaProdutos[0]+"</td><td class='center-align'>"+somaProdutos[1]+"</td></tr>"))

        })
        if(arrayPedidosEncomendados.length != 0){
            $("#divPedidoEncomendado").append("<a class='btn green right' onclick='confirmaItensEncomendaEstoque()' style='margin-top:15px'>Confirmar Recebimento dos Itens</a>")
        }

    })



}

function iniciaEntregas(){

    
    $("#divEntregasHoje").children().remove()

    $("#divEntregasHoje").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Pedido</th>"),
                    $("<th class='center-align'>Cliente</th>"),
                    $("<th class='center-align'>Qtd. Itens</th>"),
                    $("<th class='center-align'>Preço</th>")
                )
            ),
            $("<tbody id='tbodyEntregasHoje'>")
        ) 
    )

    var dataAbaixo = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)
    var dataAcima = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)

    numeroPedido = ""
    db.collection("ItensPedido").where("DataEntrega",">",dataAbaixo).where("DataEntrega","<",dataAcima).where("Entregue","==",false).orderBy('DataEntrega','desc').orderBy("NumeroPedido","desc").get().then((EstoqueSnapshot,) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            if(numeroPedido != estoque.data()["NumeroPedido"]){
                numeroPedido = estoque.data()["NumeroPedido"]
                let nomeCliente = estoque.data()["NomeCliente"]
                let quantidadeTotalItensPedido = estoque.data()["QuantidadeTotalItensPedido"]
                let valorTotalPedido = estoque.data()["ValorTotalPedido"]
                let numeroCliente = estoque.data()["NumeroCliente"]
    
                $("#tbodyEntregasHoje").prepend($('<tr style="cursor:pointer" onclick="mostraDetalhesEntrega(\''+numeroPedido+'\',\''+numeroCliente+'\')"><td class="center-align">'+numeroPedido+'</td><td class="center-align">'+nomeCliente+'</td><td class="center-align">'+quantidadeTotalItensPedido+'</td><td class="center-align">'+formataEmReais(valorTotalPedido)+'</td></tr>'))
    
            }

        })

    })



    $("#divFuturasEntregas").children().remove()

    $("#divFuturasEntregas").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Pedido</th>"),
                    $("<th class='center-align'>Cliente</th>"),
                    $("<th class='center-align'>Qtd. Itens</th>"),
                    $("<th class='center-align'>Preço</th>"),
                    $("<th class='center-align'>Data Entrega</th>")
                )
            ),
            $("<tbody id='tbodyEntregasFuturasEntregas'>")
        ) 
    )

    var dataAbaixo = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)
    var dataAcima = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)

    numeroPedido = ""
    db.collection("ItensPedido").where("DataEntrega",">",dataAcima).orderBy('DataEntrega','desc').where("Entregue","==",false).orderBy("NumeroPedido","desc").get().then((EstoqueSnapshot,) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            if(numeroPedido != estoque.data()["NumeroPedido"]){
                numeroPedido = estoque.data()["NumeroPedido"]
                let nomeCliente = estoque.data()["NomeCliente"]
                let quantidadeTotalItensPedido = estoque.data()["QuantidadeTotalItensPedido"]
                let valorTotalPedido = estoque.data()["ValorTotalPedido"]
                let numeroCliente = estoque.data()["NumeroCliente"]
                dataEntregaFutura = rmvUndef(estoque.data()["DataEntrega"])
                if(dataEntrega != ""){
                    var dataEntrega = dataEntregaFutura.toDate().toLocaleDateString("pt-BR")
                }
    
                $("#tbodyEntregasFuturasEntregas").prepend($('<tr style="cursor:pointer" onclick="mostraDetalhesEntrega(\''+numeroPedido+'\',\''+numeroCliente+'\')"><td class="center-align">'+numeroPedido+'</td><td class="center-align">'+nomeCliente+'</td><td class="center-align">'+quantidadeTotalItensPedido+'</td><td class="center-align">'+formataEmReais(valorTotalPedido)+'</td><td class="center-align">'+dataEntrega+'</td></tr>'))
    
            }

        })

    })


    $("#divEntregasRealizadas").children().remove()

    $("#divEntregasRealizadas").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Pedido</th>"),
                    $("<th class='center-align'>Cliente</th>"),
                    $("<th class='center-align'>Qtd. Itens</th>"),
                    $("<th class='center-align'>Preço</th>"),
                    $("<th class='center-align'>Data Entrega</th>")
                )
            ),
            $("<tbody id='tbodyEntregasRealizadas'>")
        ) 
    )

    numeroPedido = ""
    db.collection("ItensPedido").where("Entregue","==",true).orderBy('DataEntrega','desc').get().then((EstoqueSnapshot,) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            if(numeroPedido != estoque.data()["NumeroPedido"]){
                numeroPedido = estoque.data()["NumeroPedido"]
                let nomeCliente = estoque.data()["NomeCliente"]
                let quantidadeTotalItensPedido = estoque.data()["QuantidadeTotalItensPedido"]
                let valorTotalPedido = estoque.data()["ValorTotalPedido"]
                let numeroCliente = estoque.data()["NumeroCliente"]
                dataEntregaRealizada = rmvUndef(estoque.data()["DataEntrega"])
                if(dataEntrega != ""){
                    var dataEntrega = dataEntregaRealizada.toDate().toLocaleDateString("pt-BR")
                }

    
                $("#tbodyEntregasRealizadas").prepend($('<tr style="cursor:pointer" onclick="mostraDetalhesEntrega(\''+numeroPedido+'\',\''+numeroCliente+'\')"><td class="center-align">'+numeroPedido+'</td><td class="center-align">'+nomeCliente+'</td><td class="center-align">'+quantidadeTotalItensPedido+'</td><td class="center-align">'+formataEmReais(valorTotalPedido)+'</td><td class="center-align">'+dataEntrega+'</td></tr>'))
    
            }

        })

    })



    

}

function iniciaPagPrintEntregas(){

    var dataAbaixo = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)
    var dataAcima = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)


    $("#divEntregasHojePrint").children().remove()

    numeroPedidoum = ""
    db.collection("ItensPedido").where("DataEntrega",">",dataAbaixo).where("DataEntrega","<",dataAcima).orderBy('DataEntrega','desc').orderBy("NumeroPedido","desc").get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            if(numeroPedidoum != estoque.data()["NumeroPedido"]){
                numeroPedidoum = estoque.data()["NumeroPedido"]
                var nomeCliente = estoque.data()["NomeCliente"]
                var quantidadeTotalItensPedido = estoque.data()["QuantidadeTotalItensPedido"]
                var valorTotalPedido = estoque.data()["ValorTotalPedido"]
                var numeroCliente = estoque.data()["NumeroCliente"]
    
                db.collection("Clientes").where("NumeroCliente","==",numeroCliente).limit(1).get().then(function(querySnapshot){
                    console.log(this.numeroPedidocerto)
                    querySnapshot.docs.forEach((doc) => {
                        var nomeCliente = doc.data().Nome
                        var cidadeCliente = doc.data().Cidade
                        var enderecoCliente = doc.data().Endereco
                        var numeroEnderecoCliente = doc.data().NumeroEndereco
                        var complementoCliente = doc.data().Complemento
                        var telefoneCliente = doc.data().Telefone

                        $("#divEntregasHojePrint").append(
                            $('<div class="col s12 " style="border-style: solid;border-color: darkgrey;margin-bottom: 20px;;page-break-inside: avoid">').append(
                                $('<div class="divider" style="margin-top: 10px"></div>'),
                                $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                                    $('<div class="col s3">').append(
                                        $('<p style="text-align: left; padding-left:5px">Nome: '+nomeCliente+'</p>')
                                    ),
                                    $('<div class="col s6">').append(
                                        $('<p style="text-align: left;">Endereço: '+enderecoCliente+', '+numeroEnderecoCliente+'</p>')
                                    ),
                                    $('<div class="col s3">').append(
                                        $('<p style="text-align: left;">Tel: '+telefoneCliente+'</p>')
                                    ),
                                ),
                                $('<div class="divider"></div>'),
                                $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                                    $('<div class="col s9">').append(
                                        $('<p style="text-align: left; padding-left:5px">Complemento: '+complementoCliente+'</p>')
                                    ),
                                    $('<div class="col s3">').append(
                                       $('<p style="text-align: left;">Cidade: '+cidadeCliente+'</p>')
                                    )
                                ),
                                $('<div id="DivComplementoEntregaPrint'+this.numeroPedidocerto+'">'),
                                $('<div class="divider"></div>'),
                                $('<div style="margin-left: 0px;margin-right: 0px;" class="row">').append(
                                    $('<table>').append(
                                        $('<thead>').append(
                                            $('<tr>').append(
                                                $('<th class="center-align">Pedido</th>'),
                                                $('<th class="center-align">Produto</th>'),
                                                $('<th class="center-align">Quantidade</th>'),
                                                $('<th class="center-align">Preço</th>')
                                            )
                                        ),
                                        $('<tbody id="tableImpPed'+this.numeroPedidocerto+'">')
                                    )
                                )
                            )
                        )


                    })
                }.bind({numeroPedidocerto: numeroPedidoum}))

    
            }else{
            }



        })

    })

setTimeout(function(){
    preencheTelaPrint()
},500)

}

function preencheTelaPrint(){

    var dataAbaixo = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)
    var dataAcima = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)

    numeroPedidodois = ""
    db.collection("ItensPedido").where("DataEntrega",">",dataAbaixo).where("DataEntrega","<",dataAcima).orderBy('DataEntrega','desc').orderBy("NumeroPedido","desc").get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoquedois) => {
            if((numeroPedidodois != estoquedois.data()["NumeroPedido"])&&(numeroPedidodois!= "")){
                $("#tableImpPed"+numeroPedidodois).append(
                    $('<tr>').append(
                        $('<td class="center-align"></td>'),
                        $('<td class="right-align"><b>Total:</b></td>'),
                        $('<td class="center-align"><b>'+quantidadeTotalItensPedidoEntregaPrint+'</b></td>'),
                        $('<td class="center-align"><b>'+formataEmReais(valorTotalPedidoEntregaPrint)+'</b></td>')
                    )
                )
                $("#DivComplementoEntregaPrint"+numeroPedidodois).append(
                    $('<div class="divider"></div>'),
                    $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                        $('<div class="col s7">').append(
                            $('<p style="text-align: left; padding-left:5px">Observações: '+observacoesPedidoPrint+'</p>')
                        ),
                        $('<div class="col s3">').append(
                            $('<p style="text-align: left;">Pag.: '+formaPagamentoPrint+'</p>')
                        ),
                        $('<div class="col s2">').append(
                            $('<p style="text-align: left;">Pago: '+pedidoPagoPrint+'</p>')
                        )
                    ),
                )
            }
            numeroPedidodois = estoquedois.data()["NumeroPedido"]
            var produtoCliente = estoquedois.data()["Produto"]
            var quantidadeCliente = estoquedois.data()["Quantidade"]
            var precoCliente = estoquedois.data()["Preco"]
            quantidadeTotalItensPedidoEntregaPrint = estoquedois.data()["QuantidadeTotalItensPedido"]
            valorTotalPedidoEntregaPrint = estoquedois.data()["ValorTotalPedido"]
            observacoesPedidoPrint = rmvUndef(estoquedois.data()["ObservacoesPedido"])
            formaPagamentoPrint = rmvUndef(estoquedois.data()["FormaPagamento"])
            pedidoPagoPrint = rmvUndef(estoquedois.data()["Pago"])
            if(pedidoPagoPrint !=""){
                if(pedidoPagoPrint){
                    pedidoPagoPrint = "Sim"
                }else{
                    pedidoPagoPrint = "Não"
                }
            }


            $("#tableImpPed"+numeroPedidodois).append(
                $('<tr>').append(
                    $('<td class="center-align" style="padding: 0px">'+numeroPedidodois+'</td>'),
                    $('<td class="center-align" style="padding: 0px">'+produtoCliente+'</td>'),
                    $('<td class="center-align" style="padding: 0px">'+quantidadeCliente+'</td>'),
                    $('<td class="center-align" style="padding: 0px">'+formataEmReais(precoCliente)+'</td>')
                )
            )
    
        })
        $("#tableImpPed"+numeroPedidodois).append(
            $('<tr>').append(
                $('<td class="center-align"></td>'),
                $('<td class="right-align"><b>Total:</b></td>'),
                $('<td class="center-align"><b>'+quantidadeTotalItensPedidoEntregaPrint+'</b></td>'),
                $('<td class="center-align"><b>'+formataEmReais(valorTotalPedidoEntregaPrint)+'</b></td>')
            )
        )

        $("#DivComplementoEntregaPrint"+numeroPedidodois).append(
            $('<div class="divider"></div>'),
            $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                $('<div class="col s7">').append(
                    $('<p style="text-align: left; padding-left:5px">Observações: '+observacoesPedidoPrint+'</p>')
                ),
                $('<div class="col s3">').append(
                    $('<p style="text-align: left;">Pag.: '+formaPagamentoPrint+'</p>')
                ),
                $('<div class="col s2">').append(
                    $('<p style="text-align: left;">Pago: '+pedidoPagoPrint+'</p>')
                )
            ),
        )
        
        $("#divEntregasHojePrint").removeClass("hide")

        var prtContent = document.getElementById("divEntregasHojePrint")

        $('<iframe>', {
            name: 'myiframe',
            class: 'printFrame'
          })
          .appendTo('body')
          .contents().find('body')
          .append('<html>'+
                    '<head>'+
                        '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'+
                        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">'+
                    '</head>'+
                    '<body class="" style="background-color: #ffff !important;">'+
                        prtContent.innerHTML+
                    '</body>'+
                '</html>');
        $("#divEntregasHojePrint").addClass("hide")
        setTimeout(() => {
            window.frames['myiframe'].focus();
            window.frames['myiframe'].print();
            setTimeout(() => { $(".printFrame").remove(); }, 100);
        },500)
        
    
    })

}


function novoPedidoCadCliente(){
    $("#divNovaVendaTipoCliente").addClass("hide")
    $("#divNovaVendaCadastrarCliente").removeClass("hide")

    $("#BtnSalvarClienteProntaEntrega").addClass("orange")
    $("#BtnSalvarClienteProntaEntrega").removeClass("green")

    $("#BtnSalvarClienteEncomenda").addClass("orange")
    $("#BtnSalvarClienteEncomenda").removeClass("green")

}

function novoPedidoClienteOk(){
    $("#divNovaVendaTipoCliente").addClass("hide")
    $("#divNovaVendaClienteCadastrado").removeClass("hide")
    guardaTipoPedido = "ProntaEntrega"
}

function voltarTipoClienteAdicionarProduto(){
    $("#divNovaVendaTipoCliente").removeClass("hide")
    $("#divNovaVendaClienteCadastrado").addClass("hide")
}

function novoPedidoClienteCadPronta(){
    $("#divNovaVendaCadastrarCliente").addClass("hide")
    $("#divNovaVendaClienteCadastrado").removeClass("hide")
    guardaTipoPedido = "ProntaEntrega"
}

function novoPedidoClienteEncomenda(){
    $("#divNovaVendaTipoCliente").addClass("hide")
    $("#divNovaVendaClienteCadastrado").removeClass("hide")
    guardaTipoPedido = "Encomenda"
}

function novoPedidoClienteCadEncomenda(){
    $("#divNovaVendaCadastrarCliente").addClass("hide")
    $("#divNovaVendaClienteCadastrado").removeClass("hide")
    guardaTipoPedido = "Encomenda"
}

function voltarTipoPedidoNovo(){
    $("#divNovaVendaTipoCliente").removeClass("hide")
    $("#divNovaVendaCadastrarCliente").addClass("hide")
}

function novoPedidoRevisao(){
    $("#divNovaVendaClienteCadastrado").addClass("hide")
    $("#divNovaVendaClienteRevisao").removeClass("hide")
    revisaoPedidoNovo()
}

function voltarTelaConfirmaPedidoEncomenda(){
    populaPedidosEncomenda()
    arrayProdutosVendaEncomenda = []
    $("#tablePedidosEncomenda").removeClass("hide")
    $("#DivconfirmaEncomenda").addClass("hide")


}

function salvarEditaCliente(){

    var idDocumentoCliente = $("#idClienteSendoEditado").val()
    if(idDocumentoCliente != ""){

        var nomeCliente = $("#NomeEditaCliente").val()
        if(nomeCliente == ""){
            M.toast({html: "Nome Cliente não pode ser Nulo!!!", classes:'red rounded'})
            return
        }
        var telefoneCliente = $("#TelefoneEditaCliente").val()
        if(telefoneCliente == ""){
            M.toast({html: "Telefone Cliente não pode ser Nulo!!!", classes:'red rounded'})
            return
        }
        var enderecoCliente = $("#EnderecoEditaCliente").val()
        if(enderecoCliente == ""){
            M.toast({html: "Endereço Cliente não pode ser Nulo!!!", classes:'red rounded'})
            return
        }
        var numeroEnderecoCliente = $("#NumeroEnderecoEditaCliente").val()
        if(numeroEnderecoCliente == ""){
            M.toast({html: "Numero Endereço Cliente não pode ser Nulo!!!", classes:'red rounded'})
            return
        }
        var complementoCliente = $("#ComplementoEnderecoEditaCliente").val()
        
        var cidadeCliente =$("#CidadeEditaCliente").val()
        if(cidadeCliente == ""){
            M.toast({html: "Cidade Cliente não pode ser Nulo!!!", classes:'red rounded'})
            return
        }


        db.collection("Clientes").doc(idDocumentoCliente)
        .update({
            Nome: nomeCliente,
            Telefone: telefoneCliente,
            Endereco: enderecoCliente,
            NumeroEndereco: parseFloat(numeroEnderecoCliente),
            Complemento: complementoCliente,
            Cidade: cidadeCliente
        }).then(function() {
            console.log(" Cliente: ("+nomeCliente+") Atualizado!!")
            M.toast({html: "Cliente: ("+nomeCliente+") Atualizado!!", classes:'green rounded'})
            $("#ModalEditaCliente").modal('close')  
        })
    }else{
        M.toast({html: "Numero do Cliente não encontrado, erro Atualizando!!!", classes:'red rounded'})
        console.error("Numero do Cliente não encontrado, erro Atualizando!!!")
        return
    }

}

function editaCliente(numeroCliente){
    modalEditaProd = M.Modal.getInstance($("#ModalEditaCliente")[0])
    modalEditaProd.open()

    db.collection("Clientes").where("NumeroCliente","==",parseFloat(numeroCliente)).limit(1).get().then(function(querySnapshot){
        querySnapshot.docs.forEach((doc) => {
            var nomeCliente = doc.data().Nome
            var cidadeCliente = doc.data().Cidade
            var enderecoCliente = doc.data().Endereco
            var numeroEnderecoCliente = doc.data().NumeroEndereco
            var complementoCliente = doc.data().Complemento
            var telefoneCliente = doc.data().Telefone
            var idDocumentoCliente = doc.id

            $("#NomeEditaCliente").val(nomeCliente)
            $("#NomeEditaCliente ~ label").addClass("active")

            $("#TelefoneEditaCliente").val(telefoneCliente)
            $("#TelefoneEditaCliente ~ label").addClass("active")

            $("#EnderecoEditaCliente").val(enderecoCliente)
            $("#EnderecoEditaCliente ~ label").addClass("active")

            $("#NumeroEnderecoEditaCliente").val(numeroEnderecoCliente)
            $("#NumeroEnderecoEditaCliente ~ label").addClass("active")

            $("#ComplementoEnderecoEditaCliente").val(complementoCliente)
            $("#ComplementoEnderecoEditaCliente ~ label").addClass("active")

            $("#CidadeEditaCliente").val(cidadeCliente)
            $("#CidadeEditaCliente ~ label").addClass("active")

            $("#idClienteSendoEditado").val(idDocumentoCliente)
        })
    })
}

function sairSistema(){

    firebase.auth().signOut()
    document.location.href="./login.html"

}

function mostraDetalhesEntrega(numeroPedidoDetalhe,numeroCliente){

    modalEditaProd = M.Modal.getInstance($("#ModalDetalhesEntregas")[0])
    modalEditaProd.open()


    $("#ContentModalDetalhesEntregas").children().remove()
    
    db.collection("Clientes").where("NumeroCliente","==",parseFloat(numeroCliente)).limit(1).get().then(function(querySnapshot){
        querySnapshot.docs.forEach((doc) => {
            var nomeCliente = doc.data().Nome
            var cidadeCliente = doc.data().Cidade
            var enderecoCliente = doc.data().Endereco
            var numeroEnderecoCliente = doc.data().NumeroEndereco
            var complementoCliente = doc.data().Complemento
            var telefoneCliente = doc.data().Telefone

            $("#ContentModalDetalhesEntregas").append(
                $('<div class="col s12 " style="border-style: solid;border-color: darkgrey;margin-bottom: 20px;;page-break-inside: avoid">').append(
                    $('<div class="divider" style="margin-top: 10px"></div>'),
                    $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                        $('<div class="col s3">').append(
                            $('<p style="text-align: left; padding-left:5px">Nome: '+nomeCliente+'</p>')
                        ),
                        $('<div class="col s6">').append(
                            $('<p style="text-align: left;">Endereço: '+enderecoCliente+', '+numeroEnderecoCliente+'</p>')
                        ),
                        $('<div class="col s3">').append(
                            $('<p style="text-align: left;">Tel: '+telefoneCliente+'</p>')
                        ),
                    ),
                    $('<div class="divider"></div>'),
                    $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                        $('<div class="col s9">').append(
                            $('<p style="text-align: left; padding-left:5px">Complemento: '+complementoCliente+'</p>')
                        ),
                        $('<div class="col s3">').append(
                            $('<p style="text-align: left;">Cidade: '+cidadeCliente+'</p>')
                        )
                    ),
                    $('<div id="DivComplementoEntrega">'),
                    $('<div class="divider"></div>'),
                    $('<div style="margin-left: 0px;margin-right: 0px;" class="row">').append(
                        $('<table>').append(
                            $('<thead>').append(
                                $('<tr>').append(
                                    $('<th class="center-align">Pedido</th>'),
                                    $('<th class="center-align">Produto</th>'),
                                    $('<th class="center-align">Quantidade</th>'),
                                    $('<th class="center-align">Preço</th>')
                                )
                            ),
                            $('<tbody id="tableEntregDetalhes">')
                        )
                    )
                )
            )


        })
    })


    numeroPedidodois = ""
    db.collection("ItensPedido").where("NumeroPedido","==",parseFloat(numeroPedidoDetalhe)).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoquedois) => {
            numeroPedidodois = estoquedois.data()["NumeroPedido"]
            var produtoCliente = estoquedois.data()["Produto"]
            var quantidadeCliente = estoquedois.data()["Quantidade"]
            var precoCliente = estoquedois.data()["Preco"]
            var quantidadeTotalItensPedido = estoquedois.data()["QuantidadeTotalItensPedido"]
            var valorTotalPedido = estoquedois.data()["ValorTotalPedido"]
            observacoesPedido = rmvUndef(estoquedois.data()["ObservacoesPedido"])
            formaPagamento = rmvUndef(estoquedois.data()["FormaPagamento"])
            pedidoPago = rmvUndef(estoquedois.data()["Pago"])
            if(pedidoPago !=""){
                if(pedidoPago){
                    pedidoPago = "Sim"
                }else{
                    pedidoPago = "Não"
                }
            }
            entregueDetalheEntregas = estoquedois.data()["Entregue"]
            

            $("#tableEntregDetalhes").append(
                $('<tr>').append(
                    $('<td class="center-align" style="padding: 0px">'+numeroPedidodois+'</td>'),
                    $('<td class="center-align" style="padding: 0px">'+produtoCliente+'</td>'),
                    $('<td class="center-align" style="padding: 0px">'+quantidadeCliente+'</td>'),
                    $('<td class="center-align" style="padding: 0px">'+formataEmReais(precoCliente)+'</td>')
                )
            )

            ultimoprint = $('<tr>').append(
                            $('<td class="center-align"></td>'),
                            $('<td class="right-align"><b>Total:</b></td>'),
                            $('<td class="center-align"><b>'+quantidadeTotalItensPedido+'</b></td>'),
                            $('<td class="center-align"><b>'+formataEmReais(valorTotalPedido)+'</b></td>')
                        )

        })
        $("#tableEntregDetalhes").append(ultimoprint)

        $("#DivComplementoEntrega").append(
            $('<div class="divider"></div>'),
            $('<div class="row" style="margin-top: 0px;margin-bottom: 0px;">').append(
                $('<div class="col s7">').append(
                    $('<p style="text-align: left; padding-left:5px">Observações: '+observacoesPedido+'</p>')
                ),
                $('<div class="col s3">').append(
                    $('<p style="text-align: left;">Pag.: '+formaPagamento+'</p>')
                ),
                $('<div class="col s2">').append(
                    $('<p style="text-align: left;">Pago: '+pedidoPago+'</p>')
                )
            ),
        )
        

        if(!entregueDetalheEntregas){

            $("#ContentModalDetalhesEntregas").append($('<div style="margin-bottom:15px" class="col s12 center-align"><a onclick="confirmaEntregaPedido(\''+numeroPedidodois+'\')" class="btn green">Confirma Entrega</a></div>'))
            
        }
    
    })    

}


function mostraDetalhesPedido(numeroPedido){

    modalEditaProd = M.Modal.getInstance($("#ModalDetalhesVendas")[0])
    modalEditaProd.open()

    $("#ContentModalDetalhesVendas").children().remove()

    $("#ContentModalDetalhesVendas").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Produto</th>"),
                    $("<th class='center-align'>Quantidade</th>"),
                    $("<th class='center-align'>Preço</th>")
                )
            ),
            $("<tbody id='tbodyClienteCadastrado'>")
        ) 
    )

    db.collection("ItensPedido").where("NumeroPedido","==",parseFloat(numeroPedido)).orderBy("Quantidade","desc").get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            console.log(estoque)
            $("#tbodyClienteCadastrado").prepend($("<tr><td class='center-align'>"+estoque.data()["Produto"]+"</td><td class='center-align'>"+estoque.data()["Quantidade"]+"</td><td class='center-align'>"+estoque.data()["Preco"]+"</td></tr>"))

        })

    })
    

}

function confirmaEntregaPedido(numeroPedido){

    db.collection("ItensPedido").where("NumeroPedido","==",parseFloat(numeroPedido)).get().then((EstoqueSnapshot) => {

        EstoqueSnapshot.docs.forEach((estoque) => {
            var documentoItem = estoque.id
            var numeroPedido = estoque.data()["NumeroPedido"]
            var produto = estoque.data()["Produto"]
            var quantidade = estoque.data()["Quantidade"]
            timeoutAtualizaEntrega=""

            db.collection("ItensPedido").doc(documentoItem)
            .update({
                Entregue: true,
                DataEntrega: new Date()
            }).then(function() {
                console.log(" Pedido: ("+numeroPedido+") alterado Para: (Entregue)")
                clearTimeout(timeoutAtualizaEntrega);
                timeoutAtualizaEntrega = setTimeout(function(){ 
                    M.toast({html: "Entrega do Pedido: ("+numeroPedido+") Confirmada!!", classes:'green rounded'})
                    $("#ModalDetalhesEntregas").modal('close')
                    iniciaEntregas()       
                  }, 1000);
                  
            }).catch(function(error) {
                console.log("Erro Atualizando Pedido: ("+numeroPedido+") Para: (Entregue)")
                console.log("Erro Atualizando para Entregue:")
                console.error(error)

                clearTimeout(timeoutAtualizaEntrega);
                timeoutAtualizaEntrega = setTimeout(function(){ 
                    M.toast({html: "Erro Atualizadno Entrega do Pedido: ("+numeroPedido+")!!", classes:'red rounded'})
                  }, 1000);
            });

        })

    })


}

function confirmaItensEncomendaEstoque(){
    db.collection("ItensPedido").where("TipoPedido","==","Encomenda").where("CompraRequisitada","==",true).get().then((EstoqueSnapshot) => {

        EstoqueSnapshot.docs.forEach((estoque) => {
            var documentoItem = estoque.id
            var numeroPedido = estoque.data()["NumeroPedido"]
            var produto = estoque.data()["Produto"]
            var quantidade = estoque.data()["Quantidade"]

            db.collection("ItensPedido").doc(documentoItem)
            .update({
                CompraRequisitada: ""
            }).then(function() {
                console.log("Produto: ("+produto+") do Pedido: ("+numeroPedido+") alterado Para: (Finalizado)")

            }).catch(function(error) {
                console.log("Erro Atualizando Produto: ("+produto+") do Pedido: ("+numeroPedido+") Para: (Finalizado)")
                console.log("Erro Atualizando Compra Requisitada:")
                console.error(error)
            });


            adicionaEstoquePorEncomenda(produto,quantidade,numeroPedido)
        })
        M.toast({html: "Itens Adicionados ao Estoque!!", classes:'green rounded'})
        iniciaCompras()

    })
}

function confirmaEncomendaItens(){

    db.collection("ItensPedido").where("TipoPedido","==","Encomenda").where("CompraRequisitada","==",false).get().then((EstoqueSnapshot) => {

        EstoqueSnapshot.docs.forEach((estoque) => {
            var documentoItem = estoque.id
            var numeroPedido = estoque.data()["NumeroPedido"]
            var produto = estoque.data()["Produto"]

            db.collection("ItensPedido").doc(documentoItem)
            .update({
                CompraRequisitada: true
            }).then(function() {
                console.log("Produto: ("+produto+") do Pedido: ("+numeroPedido+") alterado Para: (Compra Requisitada)")

            }).catch(function(error) {
                console.log("Erro Atualizando Produto: ("+produto+") do Pedido: ("+numeroPedido+") Para: (Compra Requisitada)")
                console.log("Erro Atualizando Compra Requisitada:")
                console.error(error)
            });


        })
        M.toast({html: "Encomenda Confirmada!!", classes:'green rounded'})
        iniciaCompras()

    })


}

function confirmaItensEncomenda(){
    arrayProdutosVendaEncomenda.forEach(function(item){
        var produto = item[0]

        var quantidade =  parseFloat(item[1])

        numeroPedidoEncomenda =  parseFloat(item[3])

        removeEstoquePorPedido(produto,quantidade,numeroPedidoEncomenda)
    })

    alteraTipoPedido(numeroPedidoEncomenda,"ProntaEntrega")
    numeroPedidoEncomenda = ""
    voltarTelaConfirmaPedidoEncomenda()

    populaPedidosJaFeitos()
    M.Tabs.getInstance($("#tabsPedidos")[0]).select('divPedidosJaFeitos')
}

function confirmaItemEncomenda(span, produto,quantidadeVal,precoProd,itemIdPedido,numeroPedido){


    db.collection("Estoque").where("Produto","==",produto).limit(1).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            var quantidadeMax = estoque.data()["Quantidade"]

            if(typeof arrayProdutosVendaEncomenda == "undefined"){
                if(quantidadeVal>quantidadeMax){
                    M.toast({html: 'Estoque Máximo Disponível: '+parseFloat(quantidadeMax), classes:'red rounded'})
                    var resConfirm = confirm("Estoque Máximo Disponível para este produto: "+parseFloat(quantidadeMax)+"\n\nEste produto irá te impedir de Confirmar o Pedido de Encomenda para Pronta Entrega\n\nvocê deseja Remover este item?")
                    if(resConfirm){
                        db.collection("ItensPedido").doc(itemIdPedido)
                        .delete().then(function() {
                            M.toast({html: 'Item Excluido com sucesso!!', classes:'Green rounded'})
                            recalculaPedido("",itemIdPedido)
                            span.parentElement.parentElement.remove()
                            var quantidadeProdutosChecar = parseFloat($("#tbodyConfirmaEncomenda tr td span:contains('send')").length)
                            if(quantidadeProdutosChecar == 0){
                                var quantidadeProdutosChecarVazio = parseFloat($("#tbodyConfirmaEncomenda tr td span").length)
                                if(quantidadeProdutosChecarVazio != 0){
                                    $("#DivconfirmaEncomenda").append('<a class="btn green" style="margin-top:25px" onclick="confirmaItensEncomenda(this)">Confirmar Pedido</a>')
                                }                        
                            }                    
                        }).catch(function(error) {
                            M.toast({html: 'Erro ao Excluir Produto!!', classes:'red rounded'})
                            M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                            console.log("Erro Apagando Produto:")
                            console.error(error)
                        });            
                    }
                    return
                }

                arrayProdutosVendaEncomenda = []
                arrayProdutosVendaEncomenda.push([produto,quantidadeVal,precoProd,numeroPedido])
        
                span.outerHTML='<span class="material-icons green-text" style="margin-top: 6px;">remove_circle_outline</span>'
                
            }else{
                contadorQuantidade = 0
        
                arrayProdutosVendaEncomenda.forEach(function(item){
                    if(item.indexOf(produto) != "-1"){
                        console.log(item[1])
                        contadorQuantidade=(parseFloat(contadorQuantidade)+parseFloat(item[1]))
                    }
                })
        
                if(parseFloat(contadorQuantidade)+parseFloat(quantidadeVal) > parseFloat(quantidadeMax)){
                    M.toast({html: 'Outro item deste pedido está usando: '+contadorQuantidade, classes:'red rounded'})
                    var resConfirm = confirm("Estoque Máximo Disponível para este produto: "+(parseFloat(quantidadeMax)-parseFloat(contadorQuantidade))+"\n\nEste produto irá te impedir de Confirmar o Pedido de Encomenda para Pronta Entrega\n\nvocê deseja Remover este item?")
                    if(resConfirm){
                        db.collection("ItensPedido").doc(itemIdPedido)
                        .delete().then(function() {
                            M.toast({html: 'Item Excluido com sucesso!!', classes:'Green rounded'})
                            span.parentElement.parentElement.remove()
                            var quantidadeProdutosChecar = parseFloat($("#tbodyConfirmaEncomenda tr td span:contains('send')").length)
                            if(quantidadeProdutosChecar == 0){
                                var quantidadeProdutosChecarVazio = parseFloat($("#tbodyConfirmaEncomenda tr td span").length)
                                if(quantidadeProdutosChecarVazio != 0){
                                    $("#DivconfirmaEncomenda").append('<a class="btn green" style="margin-top:25px" onclick="confirmaItensEncomenda(this)">Confirmar Pedido</a>')
                                }   
                            }                    
                        }).catch(function(error) {
                            M.toast({html: 'Erro ao Excluir Produto!!', classes:'red rounded'})
                            M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                            console.log("Erro Apagando Produto:")
                            console.error(error)
                        });            
                    }

                    
                    return
                }
        
                arrayProdutosVendaEncomenda.push([produto,quantidadeVal,precoProd,numeroPedido])
        
                span.outerHTML='<span class="material-icons green-text" style="margin-top: 6px;">remove_circle_outline</span>'       
            }
        
            var quantidadeProdutosChecar = parseFloat($("#tbodyConfirmaEncomenda tr td span:contains('send')").length)
            if(quantidadeProdutosChecar == 0){
        
                $("#DivconfirmaEncomenda").append('<a class="btn green" style="margin-top:25px" onclick="confirmaItensEncomenda(this)">Confirmar Pedido</a>')
        
            }    
        })
    })



}

function confirmaPedidoEncomenda(numeroPedido){
    numeroPedido = parseFloat(numeroPedido)

    $("#tablePedidosEncomenda").addClass("hide")

    $("#DivconfirmaEncomenda").children().remove()

    $("#DivconfirmaEncomenda").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Produto</th>"),
                    $("<th class='center-align'>Quantidade</th>"),
                    $("<th class='center-align'>Preço</th>"),
                    $("<th class='center-align'>Confirma</th>")
                )
            ),
            $("<tbody id='tbodyConfirmaEncomenda'>")
        ) 
    )

    db.collection("ItensPedido").where("NumeroPedido","==",numeroPedido).get().then((EstoqueSnapshot) => {

        EstoqueSnapshot.docs.forEach((estoque) => {
            var produto = rmvUndef(estoque.data()["Produto"])
            var quantidade = parseFloat(rmvUndef(estoque.data()["Quantidade"]))
            var preco = parseFloat(rmvUndef(estoque.data()["Preco"]))
            var numeroPedido = parseFloat(rmvUndef(estoque.data()["NumeroPedido"]))
            var idItemPedido = estoque.id

            var precototal = (quantidade*preco)
            $("#tbodyConfirmaEncomenda").prepend($("<tr><td class='center-align'>"+produto+"</td><td class='center-align'>"+quantidade+"</td><td class='center-align'>"+formataEmReais(precototal)+"<td class='center-align'><span onclick='confirmaItemEncomenda(this,\""+produto+"\",\""+quantidade+"\",\""+preco+"\",\""+idItemPedido+"\",\""+numeroPedido+"\")' class='material-icons orange-text' style='cursor:pointer'>send</span></td></tr>"))

        })
    })

    $("#DivconfirmaEncomenda").append("<a class='btn orange left' style='margin-top:20px' onclick='voltarTelaConfirmaPedidoEncomenda()'>Voltar</a>")

    $("#DivconfirmaEncomenda").removeClass("hide")
    

}

function alteraTipoPedido(numeroPedido,tipoPedido){

    var numeroPedido = parseFloat(numeroPedido)
    db.collection("ItensPedido").where("NumeroPedido","==",numeroPedido).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            var idItemPedido = estoque.id
            db.collection("Estoque").doc(idItemPedido)
            .update({
                TipoPedido: tipoPedido
            }).then(function() {
                console.log("Tipo do Pedido: ("+numeroPedido+") alterado Para: ("+tipoPedido+")")
            }).catch(function(error) {
                console.log("Erro Atualizando Tipo do Pedido: ("+numeroPedido+") alterado Para: ("+tipoPedido+")")
                console.log("Erro Atualizando Tipo do Pedido:")
                console.error(error)
            });
        })
    
    })


}

function adicionaEstoquePorEncomenda(produto,quantidade,numeroPedido){
    db.collection("Estoque").where("Produto","==",produto).limit(1).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            var estoqueAtual = estoque.data()["Quantidade"]
            var estoqueAtualizado = parseFloat(estoqueAtual+quantidade)
            db.collection("Estoque").doc(estoque.id)
            .update({
                Quantidade: estoqueAtualizado
            }).then(function() {
                db.collection("LogEstoque").add({
                    Acao: "Adiciona",
                    NumeroPedido: parseFloat(numeroPedido),
                    Produto: produto,
                    Quantidade: parseFloat(quantidade),
                    Data: new Date()
                })
                console.log("Adicionado: "+quantidade+" do produto: "+produto+" para o Pedido: "+numeroPedido)
            }).catch(function(error) {
                console.log("Erro Adicionando: "+quantidade+" do produto: "+produto+" para o Pedido: "+numeroPedido)
                console.log("Erro Atualizando Estoque:")
                console.error(error)
            });
        })
    
    })
    
}

function removeEstoquePorPedido(produto,quantidade,numeroPedido){
    db.collection("Estoque").where("Produto","==",produto).limit(1).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            var estoqueAtual = estoque.data()["Quantidade"]
            var estoqueAtualizado = parseFloat(estoqueAtual-quantidade)
            db.collection("Estoque").doc(estoque.id)
            .update({
                Quantidade: estoqueAtualizado
            }).then(function() {
                db.collection("LogEstoque").add({
                    Acao: "Remove",
                    NumeroPedido: parseFloat(numeroPedido),
                    Produto: produto,
                    Quantidade: parseFloat(quantidade),
                    Data: new Date()
                })
                console.log("Restirado: "+quantidade+" do produto: "+produto+" para o Pedido: "+numeroPedido)
            }).catch(function(error) {
                console.log("Erro Restirando: "+quantidade+" do produto: "+produto+" para o Pedido: "+numeroPedido)
                console.log("Erro Atualizando Estoque:")
                console.error(error)
            });
        })
    
    })
    
}

function removeItemVendaNova(btnRemove,idLinha){

    var nomeitemRemover = $("#SelectProdutosVenda"+idLinha).val().split("^")[0]
    if(nomeitemRemover != ""){
        arrayProdutosVenda.forEach(function(prod, index, object){
            if(prod.indexOf(nomeitemRemover) != "-1"){
                object.splice(index, 1);
                if(arrayProdutosVenda.length == 0){
                    $("#btnContinuarItens").addClass("hide")
                }
            }
        })
    
        $(btnRemove.parentElement.parentElement).remove()
    }else{
        M.toast({html: 'Erro Excluindo Item!!', classes:'red rounded'})
    }

}

function cancelarPedidoNovo(){
    $("#divNovaVendaClienteRevisao").addClass("hide")
    $("#divNovaVendaTipoCliente").removeClass("hide")
    $("#btnContinuarItens").addClass("hide")

    $("#BtnSalvarClienteProntaEntrega").addClass("orange")
    $("#BtnSalvarClienteProntaEntrega").removeClass("green")

    $("#BtnSalvarClienteEncomenda").addClass("orange")
    $("#BtnSalvarClienteEncomenda").removeClass("green")

    $("#NomeClienteNovo").val("")
    $("#TelefoneClienteNovo").val("")
    $("#EnderecoClienteNovo").val("")
    $("#NumeroEnderecoClienteNovo").val("")
    $("#ComplementoEnderecoClienteNovo").val("")
    $("#CidadeClienteNovo").val("")
 
    $("#autocomplete-clientes").val("")
    $("#datepickerEntrega").val("")
    
    $(DivLinhasProdutoVenda.childNodes).remove()
    arrayProdutosVenda = []

}

function voltarCadastrarCliente(){
    $("#divNovaVendaClienteRevisao").addClass("hide")
    $("#divNovaVendaCadastrarCliente").removeClass("hide")

    if (typeof guardaTipoPedido != "undefined"){
        if(guardaTipoPedido != "Encomenda"){
            $("#BtnSalvarClienteProntaEntrega").removeClass("orange")
            $("#BtnSalvarClienteProntaEntrega").addClass("green")

            $("#BtnSalvarClienteEncomenda").addClass("orange")
            $("#BtnSalvarClienteEncomenda").removeClass("green")
        }else{
            $("#BtnSalvarClienteEncomenda").removeClass("orange")
            $("#BtnSalvarClienteEncomenda").addClass("green")

            $("#BtnSalvarClienteProntaEntrega").addClass("orange")
            $("#BtnSalvarClienteProntaEntrega").removeClass("green")
        }
    }
    

    BtnSalvarClienteEncomenda

    //$("#btnContinuarItens").addClass("hide")

    $("#NomeClienteNovo").val("")
    $("#TelefoneClienteNovo").val("")
    $("#EnderecoClienteNovo").val("")
    $("#NumeroEnderecoClienteNovo").val("")
    $("#ComplementoEnderecoClienteNovo").val("")
    $("#CidadeClienteNovo").val("")
 
    $("#autocomplete-clientes").val("")
    //$("#datepickerEntrega").val("")
    
    //$(DivLinhasProdutoVenda.childNodes).remove()
    //arrayProdutosVenda = []

}



function editarPedidoNovo(){
    $("#divNovaVendaClienteCadastrado").removeClass("hide")
    $("#divNovaVendaClienteRevisao").addClass("hide")

}

function populaPedidosJaFeitos(){

    $('#divPedidosJaFeitos table').remove()

    $("#divPedidosJaFeitos").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>NumeroPedido</th>"),
                    $("<th class='center-align'>Cliente</th>"),
                    $("<th class='center-align'>Qtd. Produtos</th>"),
                    $("<th class='center-align'>Valor Total</th>"),
                    $("<th class='center-align'>forma Pag.</th>"),
                    $("<th class='center-align'>Pago</th>"),
                    $("<th class='center-align'>Data Entrega</th>")

                )
            ),
            $("<tbody id='tbodyPedidosJa'>")
        ) 
    )

    db.collection("ItensPedido").where("TipoPedido","==","ProntaEntrega").where("Entregue","==",false).orderBy("NumeroPedido","asc").get().then((EstoqueSnapshot) => {
        objPedidos = {}

        EstoqueSnapshot.docs.forEach((estoque) => {
            objPedidos[estoque.data()["NumeroPedido"]] = estoque.id
        })

        arrayPedidos = Object.values(objPedidos)

        arrayPedidos.forEach(function(idDocumentoPedido){

            db.collection("ItensPedido").doc(idDocumentoPedido).get().then((EstoqueSnapshot) => {
                var numeroPedido = rmvUndef(EstoqueSnapshot.data()["NumeroPedido"])
                var nomeCliente = rmvUndef(EstoqueSnapshot.data()["NomeCliente"])
                var valorTotalPedido = rmvUndef(EstoqueSnapshot.data()["ValorTotalPedido"])
                var quantidadeItensPedido = rmvUndef(EstoqueSnapshot.data()["QuantidadeTotalItensPedido"])

                var formaDePagamento = rmvUndef(EstoqueSnapshot.data()["FormaPagamento"])
                var pago = rmvUndef(EstoqueSnapshot.data()["Pago"])
                if(pago == ""){
                    var pedidoPago =""
                }else{
                    if(pago){
                        var pedidoPago = "<b><p class='green-text'>Sim</p></b>"
                    }else{
                        var pedidoPago = "<b><p class='red-text'>Não</p></b>"
                    }
                }

                dataEntrega = rmvUndef(EstoqueSnapshot.data()["DataEntrega"])
                if(dataEntrega != ""){
                    var dataEntrega = dataEntrega.toDate().toLocaleDateString("pt-BR")
                }
                dataPedido = rmvUndef(EstoqueSnapshot.data()["DataPedido"])
                if(dataPedido != ""){
                    var dataPedido = dataPedido.toDate().toLocaleDateString("pt-BR")
                }

                
                $("#tbodyPedidosJa").prepend($('<tr onclick="mostraDetalhesPedido(\''+numeroPedido+'\')" style="cursor:pointer"><td class="center-align">'+numeroPedido+'</td><td class="center-align">'+nomeCliente+'</td><td class="center-align">'+quantidadeItensPedido+'</td><td class="center-align">'+formataEmReais(valorTotalPedido)+'</td><td class="center-align">'+formaDePagamento+'</td><td class="center-align">'+pedidoPago+'</td><td class="center-align">'+dataEntrega+'</td></tr>'))

                
            })
        })
    })


}

function populaPedidosEncomenda(){

    $('#divPedidosEncomenda table').remove()

    $("#divPedidosEncomenda").append(
        $("<table id='tablePedidosEncomenda'>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>NumeroPedido</th>"),
                    $("<th class='center-align'>Cliente</th>"),
                    $("<th class='center-align'>Qtd. Produtos</th>"),
                    $("<th class='center-align'>Valor Total</th>"),
                    $("<th class='center-align'>forma Pag.</th>"),
                    $("<th class='center-align'>Pago</th>"),
                    $("<th class='center-align'>Data Entrega</th>"),
                    $("<th class='center-align'>Confirma</th>")
                )
            ),
            $("<tbody id='tbodyPedidosEncomenda'>")
        ) 
    )

    db.collection("ItensPedido").where("TipoPedido","==","Encomenda").where("Entregue","==",false).orderBy("NumeroPedido","asc").get().then((EstoqueSnapshot) => {
        objPedidos = {}

        EstoqueSnapshot.docs.forEach((estoque) => {
            objPedidos[estoque.data()["NumeroPedido"]] = estoque.id
        })

        arrayPedidos = Object.values(objPedidos)

        arrayPedidos.forEach(function(idDocumentoPedido){

            db.collection("ItensPedido").doc(idDocumentoPedido).get().then((EstoqueSnapshot) => {
                var numeroPedido = rmvUndef(EstoqueSnapshot.data()["NumeroPedido"])
                var nomeCliente = rmvUndef(EstoqueSnapshot.data()["NomeCliente"])
                var valorTotalPedido = rmvUndef(EstoqueSnapshot.data()["ValorTotalPedido"])
                var quantidadeItensPedido = rmvUndef(EstoqueSnapshot.data()["QuantidadeTotalItensPedido"])

                var formaDePagamento = rmvUndef(EstoqueSnapshot.data()["FormaPagamento"])
                var pago = rmvUndef(EstoqueSnapshot.data()["Pago"])
                if(pago == ""){
                    var pedidoPago =""
                }else{
                    if(pago){
                        var pedidoPago = "<b><p class='green-text'>Sim</p></b>"
                    }else{
                        var pedidoPago = "<b><p class='red-text'>Não</p></b>"
                    }
                }


                dataEntrega = rmvUndef(EstoqueSnapshot.data()["DataEntrega"])
                if(dataEntrega != ""){
                    var dataEntrega = dataEntrega.toDate().toLocaleDateString("pt-BR")
                }
                dataPedido = rmvUndef(EstoqueSnapshot.data()["DataPedido"])
                if(dataPedido != ""){
                    var dataPedido = dataPedido.toDate().toLocaleDateString("pt-BR")
                }

                $("#tbodyPedidosEncomenda").prepend($("<tr><td class='center-align'>"+numeroPedido+"</td><td class='center-align'>"+nomeCliente+"</td><td class='center-align'>"+quantidadeItensPedido+"</td><td class='center-align'>"+formataEmReais(valorTotalPedido)+"</td><td class='center-align'>"+formaDePagamento+"</td><td class='center-align'>"+pedidoPago+"</td><td class='center-align'>"+dataEntrega+"</td><td class='center-align'><span onclick='confirmaPedidoEncomenda(\""+numeroPedido+"\")' class='material-icons orange-text' style='cursor:pointer'>send</span></td></tr>"))

                
            })
        })
    })


}


function confirmaPedidoNovo(btn){

    if(typeof guardaTipoPedido == "undefined"){
        var tipoDoPedido = "Encomenda"
    }else{
        if(guardaTipoPedido != ""){
            var tipoDoPedido = guardaTipoPedido
        }else{
            var tipoDoPedido = "Encomenda"
        }
    }

    var numeroCliente = $('#autocomplete-clientes')[0].attributes["numerocliente"].value
    if(numeroCliente == "0"){
        M.toast({html: 'Cliente não Cadastrado!!', classes:'red rounded'})
        /*var confirmNovoCli=confirm("Deseja Cadastrar um Novo Cliente?")
        if(confirmNovoCli){
            voltarCadastrarCliente()
        }*/
        
        return
    }

    var nomeCliente = $("#autocomplete-clientes").val()

    var dataEntrega = $("#datepickerEntrega").val()
    if(dataEntrega == ""){
        M.toast({html: 'Selecione uma Data para entrega!!', classes:'red rounded'})
        return
    }
    var from = dataEntrega.split("/")
    var dataEntregaFirebase = new Date(from[2], from[1] - 1, from[0])
    

    var formaDePagameto = $("#formaDePagamento").val()
    if(formaDePagameto == ""){
        M.toast({html: 'Selecione Forma de Pagamento!!', classes:'red rounded'})        
        return
    }

    var observacoesPedido = $("#observacoesPedido").val()

    var checkBoxPago = $("#checkBoxPago").prop("checked")
    

    var timeoutGravaPedido = ""

    btn.setAttribute("disabled",true)

    db.collection("ItensPedido").orderBy("NumeroPedido","desc").limit(1).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            numeroPedido = estoque.data()["NumeroPedido"]+1
        })      

        arrayProdutosVenda.forEach(function(item){

            var produto = item[0]

            var quantidade =  parseFloat(item[1])

            var preco =  parseFloat(item[2])

            var quantidadeTotalItensPedido = arrayProdutosVenda.length


            
            if(tipoDoPedido != "Encomenda"){
                removeEstoquePorPedido(produto,quantidade,numeroPedido)

            }
            db.collection("ItensPedido").add({
                Produto: produto,
                Quantidade: parseFloat(quantidade),
                Preco: parseFloat(preco),
                NumeroPedido: parseFloat(numeroPedido),
                DataEntrega: dataEntregaFirebase,
                NumeroCliente: parseFloat(numeroCliente),
                NomeCliente: nomeCliente,
                ValorTotalPedido: precoTotalPedido,
                QuantidadeTotalItensPedido: quantidadeTotalItensPedido,
                TipoPedido: tipoDoPedido,
                DataPedido: new Date(),
                CompraRequisitada: false,
                Entregue:false,
                FormaDePagamento: formaDePagameto,
                Pago: checkBoxPago,
                ObservacoesPedido: observacoesPedido
            })
            .then(function(docRef) {
                clearTimeout(timeoutGravaPedido);
                timeoutGravaPedido = setTimeout(function(){ 
                    M.toast({html: 'Pedido Confirmado!!', classes:'green rounded'})
                    btn.removeAttribute("disabled")
                    cancelarPedidoNovo() 
                    if(tipoDoPedido == "Encomenda"){
                        populaPedidosEncomenda()
                    }else{
                        populaPedidosJaFeitos()  
                    }
                                  
                  }, 1000);
            })
            .catch(function(error) {
                clearTimeout(timeoutGravaPedido);
                timeoutGravaPedido = setTimeout(function(){ 
                    M.toast({html: 'Erro Concluindo Pedido!!', classes:'red rounded'})
                    console.error(error)
                    M.toast({html: error, classes:'red rounded'})
                }, 1000);
            });        



    
        })
    })



       
}

function revisaoPedidoNovo(){



    var tablePedido = ""
    precoTotalPedido = 0

    $('#DivrevisaoProdutoVenda table').remove()

    $("#DivrevisaoProdutoVenda").append(
        $("<table>").append(
            $("<thead>").append(
                $("<tr>").append(
                    $("<th class='center-align'>Produto</th>"),
                    $("<th class='center-align'>Quantidade</th>"),
                    $("<th class='center-align'>Preço</th>")
                )
            ),
            $("<tbody id='tobodyRevisao'>")
        ) 
    )

    arrayProdutosVenda.forEach(function(item){

        db.collection("Estoque").where("Produto","==",item[0]).get().then((EstoqueSnapshot) => {
            var preco = 0

            EstoqueSnapshot.docs.forEach((estoque) => {

                preco = rmvUndef(estoque.data()['Preco'])
                
            })
            if(preco == ""){
                preco = 0
            }

            quantidade =  parseFloat(item[1])

            var precoTotalItem = (quantidade*preco)

            produto = item[0]           

            precoTotalPedido = precoTotalPedido+precoTotalItem

            $("#tobodyRevisao").append($("<tr><td class='center-align'>"+produto+"</td><td class='center-align'>"+quantidade+"</td><td class='center-align'>"+formataEmReais(precoTotalItem)+"</td></tr>"))
        })

    })
    setTimeout(function(){
        $("#tobodyRevisao").append($("<tr><td></td><td></td><td class='center-align'>TOTAL: "+formataEmReais(precoTotalPedido)+"</td></tr>"))
    },1000)

    atualizaAutocompleteClientes()

    $('#formaDePagamento').formSelect()
 

    $('#datepickerEntrega').datepicker({
        i18n: {
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            today: 'Hoje',
            clear: 'Limpar',
            cancel: 'Sair',
            done: 'Confirmar',
            labelMonthNext: 'Próximo mês',
            labelMonthPrev: 'Mês anterior',
            labelMonthSelect: 'Selecione um mês',
            labelYearSelect: 'Selecione um ano',
            selectMonths: true,
            selectYears: 15,
        },
        format: 'dd/mm/yyyy',
        container: 'body',
        minDate: new Date()
        });


}

function atualizaAutocompleteClientes(){
    dataClientesAutoComplete = {}
    arrayDataClientes =[]

    db.collection("Clientes").orderBy('NumeroCliente', "desc").get().then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            nomeCliente = doc.data().Nome
            numeroCliente = doc.data().NumeroCliente

            arrayDataClientes[nomeCliente] = numeroCliente

            dataClientesAutoComplete[nomeCliente]=null

        })


        $('#autocomplete-clientes').autocomplete({
            data:dataClientesAutoComplete
          });

        $("#autocomplete-clientes").unbind("change")
        $("#autocomplete-clientes").on("change",function(e){
            setTimeout(function(){
                var nome = e["currentTarget"].value
                if(arrayDataClientes[nome] == undefined){
                    var numeroCliente = "0"
                    $('#autocomplete-clientes').val("")
                    M.toast({html: 'Cliente não Cadastrado!!', classes:'red rounded'})
                }else{
                    var numeroCliente = arrayDataClientes[nome]
                }            

                $('#autocomplete-clientes')[0].attributes["numerocliente"].value = numeroCliente
            },100)
        })

        if(typeof nomeUltimoClienteCadastrado != "undefined"){
            $('#autocomplete-clientes').val(nomeUltimoClienteCadastrado)
            if(arrayDataClientes[nomeUltimoClienteCadastrado] == undefined){
                var numeroCliente = "0"
                $('#autocomplete-clientes').val("")
            }else{
                var numeroCliente = arrayDataClientes[nomeUltimoClienteCadastrado]
            }            
    
            $('#autocomplete-clientes')[0].attributes["numerocliente"].value = numeroCliente
    
            $("#autocomplete-clientes ~ Label").addClass("active")
    
        }
    
    })
    

}

function cadastrarClienteNovo(tipoPedidoContinuar){


    var NomeClienteNovo= $("#NomeClienteNovo").val().toUpperCase()
    var TelefoneClienteNovo= $("#TelefoneClienteNovo").val()
    var EnderecoClienteNovo= $("#EnderecoClienteNovo").val()
    var NumeroEnderecoClienteNovo= $("#NumeroEnderecoClienteNovo").val()
    var ComplementoEnderecoClienteNovo= $("#ComplementoEnderecoClienteNovo").val()
    var CidadeClienteNovo= $("#CidadeClienteNovo").val()
    var ultimoNumeroCliente = 0

    
    if(NomeClienteNovo == ""){
        M.toast({html: 'Preencher todos os Campos!!', classes:'red rounded'})
        return
    }

    if(TelefoneClienteNovo == ""){
        M.toast({html: 'Preencher todos os Campos!!', classes:'red rounded'})
        return
    }

    if(EnderecoClienteNovo == ""){
        M.toast({html: 'Preencher todos os Campos!!', classes:'red rounded'})
        return
    }

    if(CidadeClienteNovo == ""){
        M.toast({html: 'Preencher todos os Campos!!', classes:'red rounded'})
        return
    }

    if(NumeroEnderecoClienteNovo == ""){
        M.toast({html: 'Preencher todos os Campos!!', classes:'red rounded'})
        return
    }

    db.collection("Clientes").where("Nome","==",NomeClienteNovo).get().then((EstoqueSnapshot) => {

        if(!EstoqueSnapshot.empty){
            M.toast({html: 'Já Existe um Cliente com esse Nome!!', classes:'red rounded'})
            return
        }
            
        db.collection("Clientes").orderBy('NumeroCliente', "desc").limit(1).get().then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                ultimoNumeroCliente = doc.data().NumeroCliente

                db.collection("Clientes").add({
                    Nome: NomeClienteNovo,
                    Telefone: TelefoneClienteNovo,
                    Endereco: EnderecoClienteNovo,
                    NumeroEndereco: parseFloat(NumeroEnderecoClienteNovo),
                    Complemento: ComplementoEnderecoClienteNovo,
                    Cidade: CidadeClienteNovo,
                    NumeroCliente: parseFloat(ultimoNumeroCliente)+1
                })
                .then(function(docRef) {
                    M.toast({html: 'Cliente Adicionado com Sucesso!!', classes:'green rounded'})
                    console.log(docRef.id)
                    localStorage.setItem("idUltimoClienteCadastrado",docRef.id)
                    localStorage.setItem("nomeUltimoClienteCadastrado",NomeClienteNovo)
                    localStorage.setItem("numeroUltimoClienteCadastrado",(parseFloat(ultimoNumeroCliente)+1))
                    
                    atualizaAutocompleteClientes()

                    $("#NomeClienteNovo").val("")
                    $("#TelefoneClienteNovo").val("")
                    $("#EnderecoClienteNovo").val("")
                    $("#NumeroEnderecoClienteNovo").val("")
                    $("#ComplementoEnderecoClienteNovo").val("")
                    $("#CidadeClienteNovo").val("Guarulhos")
                

                    nomeUltimoClienteCadastrado = NomeClienteNovo
                    if(tipoPedidoContinuar == "1"){
                        novoPedidoClienteCadPronta()
                    }else if(tipoPedidoContinuar == "2"){
                        novoPedidoClienteCadEncomenda()
                    }else if(tipoPedidoContinuar == "3"){
                        voltarTipoPedidoNovo()
                    }
                })
                .catch(function(error) {
                    M.toast({html: 'Erro Adicionando Cliente!!', classes:'red rounded'})
                    console.error(error)
                    M.toast({html: error, classes:'red rounded'})
                });        
    
            })
        })
    })
}

function adicionarProdutoBtn(){

    adicionaLinhaProdutoVenda(Math.floor(Math.random() * 10000))

}

function confirmaProdutoVenda(idLinha,btn){

    if(typeof guardaTipoPedido == "undefined"){
        var tipoDoPedido = "Encomenda"
    }else{
        if(guardaTipoPedido != ""){
            var tipoDoPedido = guardaTipoPedido
        }else{
            var tipoDoPedido = "Encomenda"
        }
    }

    var produto = $("#SelectProdutosVenda"+idLinha).val().split("^")[0]
    if(tipoDoPedido == "Encomenda"){
        var quantidadeMax = 999
    }else{
        var quantidadeMax = $("#SelectProdutosVenda"+idLinha).val().split("^")[1]
    }
    var precoProd = $("#SelectProdutosVenda"+idLinha).val().split("^")[2]
    var quantidadeVal = $("#QuantidadeProdutoVenda"+idLinha).val()

    if(quantidadeVal>quantidadeMax){
        M.toast({html: 'Quantidade Maxima do estoque: '+quantidadeMax, classes:'red rounded'})
        return
    }
    if((quantidadeVal == "")||(produto == "")){
        M.toast({html: 'Preencher Todos os Campos!!', classes:'red rounded'})
        return
    }

    if(typeof arrayProdutosVenda == "undefined"){
        arrayProdutosVenda = []
        arrayProdutosVenda.push([produto,quantidadeVal,precoProd])

        btn.outerHTML='<a class="btn red" onclick="removeItemVendaNova(this,\''+idLinha+'\')"><span class="material-icons" style="margin-top: 6px;">remove_circle_outline</span></a>'
        $("#SelectTipoProdutoVenda"+idLinha)[0].setAttribute("disabled","true")
        $("#SelectTipoProdutoVenda"+idLinha).formSelect()

        $("#SelectProdutosVenda"+idLinha)[0].setAttribute("disabled","true")
        $("#SelectProdutosVenda"+idLinha).formSelect()

        $("#QuantidadeProdutoVenda"+idLinha)[0].setAttribute("disabled","true")

        $("#btnContinuarItens").removeClass("hide")
        
    }else{
        contadorQuantidade = 0

        arrayProdutosVenda.forEach(function(item){
            if(item.indexOf(produto) != "-1"){
                console.log(item[1])
                contadorQuantidade=(parseFloat(contadorQuantidade)+parseFloat(item[1]))
            }
        })

        if(parseFloat(contadorQuantidade)+parseFloat(quantidadeVal) > parseFloat(quantidadeMax)){
            M.toast({html: 'Estoque Disponível: '+(parseFloat(quantidadeMax)-parseFloat(contadorQuantidade)), classes:'red rounded'})
            M.toast({html: 'Outro item deste pedido está usando: '+contadorQuantidade, classes:'red rounded'})
            return
        }

        arrayProdutosVenda.push([produto,quantidadeVal,precoProd])

        btn.outerHTML='<a class="btn red" onclick="removeItemVendaNova(this,\''+idLinha+'\')"><span class="material-icons" style="margin-top: 6px;">remove_circle_outline</span></a>'
        $("#SelectTipoProdutoVenda"+idLinha)[0].setAttribute("disabled","true")
        $("#SelectTipoProdutoVenda"+idLinha).formSelect()

        $("#SelectProdutosVenda"+idLinha)[0].setAttribute("disabled","true")
        $("#SelectProdutosVenda"+idLinha).formSelect()

        $("#QuantidadeProdutoVenda"+idLinha)[0].setAttribute("disabled","true")

        $("#btnContinuarItens").removeClass("hide")
    }




}

function adicionaLinhaProdutoVenda(idLinha){

    db.collection("TipoProdutos").get().then((querySnapshot) => {

        optionsTipoProduto = ""

        querySnapshot.docs.forEach((doc) => {
            optionsTipoProduto+='<option value="'+doc.data()["Descricao"]+'">'+doc.data()["Descricao"]+'</option>'
        })

        var linhaproduto =  $('<div class="row" style="margin-bottom:0px">').append(
                                $('<div class="input-field col l2 offset-l2 center-align" style="margin-bottom: 0px;">').append(
                                    $('<select id="SelectTipoProdutoVenda'+idLinha+'" onchange="carregaSelectProdutosVenda(\''+idLinha+'\')">').append(
                                        $('<option value="">Selecione</option>'),
                                        $(optionsTipoProduto)
                                    ),
                                    $('<label>Tipo</label>')
                                ),
                                $('<div class="input-field col l4 center-align" style="margin-bottom: 0px;">').append(
                                    $('<select id="SelectProdutosVenda'+idLinha+'" onchange="selecionaSelectProdutosVenda(\''+idLinha+'\')">').append(
                                        $('<option value="">Selecione</option>')
                                    ),
                                    $('<label>Produto</label>')
                                ),
                                $('<div class="input-field col m1 s3" style="margin-bottom: 0px;"></div>').append(
                                    $('<input id="QuantidadeProdutoVenda'+idLinha+'" type="number" min="1"></input>'),
                                    $('<label for="QuantidadeProdutoVenda'+idLinha+'">Qtd.</label>')
                                ),
                                $('<div class="input-field col m2 center-align" style="margin-top: 20px;margin-bottom: 0px;">').append(
                                    $('<a class="btn green " onclick="confirmaProdutoVenda(\''+idLinha+'\',this)"><span class="material-icons" style="margin-top: 6px;">check_circle_outline</span></a>')
                                ),
                                $('<div class="input-field col m10 offset-l1 left-align" style="margin-top: 0px; margin-bottom:0px">').append(
                                    $('<div class="divider"></div>')
                                )
                            )

        $("#DivLinhasProdutoVenda").append(linhaproduto)

        $('#SelectTipoProdutoVenda'+idLinha).formSelect()

    })
    

}

function selecionaSelectProdutosVenda(idLinha){

    if(typeof guardaTipoPedido == "undefined"){
        var tipoDoPedido = "Encomenda"
    }else{
        if(guardaTipoPedido != ""){
            var tipoDoPedido = guardaTipoPedido
        }else{
            var tipoDoPedido = "Encomenda"
        }
    }


    var produto = $("#SelectProdutosVenda"+idLinha).val()
    if((produto != "")&&(tipoDoPedido != "Encomenda")){
        var quantMaxProd = produto.split("^")[1]
        $("#QuantidadeProdutoVenda"+idLinha).val(quantMaxProd)
        $("#QuantidadeProdutoVenda"+idLinha)[0].max = quantMaxProd
        $("#QuantidadeProdutoVenda"+idLinha+" ~ Label").addClass("active")

        $("#QuantidadeProdutoVenda"+idLinha).unbind("blur")
        $("#QuantidadeProdutoVenda"+idLinha).on("blur",function(){
            
            var valor = parseFloat(this.value)
            var maximo = parseFloat(this.max)

            if(valor == ""){
                var valor = 0
            }

            if(maximo == ""){
                var maximo = 0
            }

            if(valor > maximo){
                M.toast({html: 'Quantidade Maxima do estoque: '+maximo, classes:'red rounded'})
                this.value = ""
            }else if(valor < 0){
                this.value = ""
            }
        })

    }else{
        $("#QuantidadeProdutoVenda"+idLinha).val("")
        $("#QuantidadeProdutoVenda"+idLinha)[0].max = 999
        $("#QuantidadeProdutoVenda"+idLinha+" ~ Label").addClass("active")
    }
}

function carregaSelectProdutosVenda(idLinha){

    if(typeof guardaTipoPedido == "undefined"){
        var tipoDoPedido = "Encomenda"
    }else{
        if(guardaTipoPedido != ""){
            var tipoDoPedido = guardaTipoPedido
        }else{
            var tipoDoPedido = "Encomenda"
        }
    }

    var tipo = $("#SelectTipoProdutoVenda"+idLinha).val()
    if(tipo != ""){
        if(tipoDoPedido == "Encomenda"){
            db.collection("Estoque").where("Tipo","==",tipo).get().then((EstoqueSnapshot) => {
                
                var optionsProdutos = ""

                EstoqueSnapshot.docs.forEach((estoque) => {
                    optionsProdutos+='<option value="'+rmvUndef(estoque.data()['Produto'])+'^'+rmvUndef(estoque.data()['Quantidade'])+'^'+rmvUndef(estoque.data()['Preco'])+'">'+rmvUndef(estoque.data()['Produto'])+'</option>'                    
                })

                $('#SelectProdutosVenda'+idLinha+' option[value!=""]').remove()
                $('#SelectProdutosVenda'+idLinha).append($(optionsProdutos))

                $('#SelectProdutosVenda'+idLinha).formSelect()

            })
        }else{
            db.collection("Estoque").where("Tipo","==",tipo).where("Quantidade",">",0).get().then((EstoqueSnapshot) => {
                
                var optionsProdutos = ""

                EstoqueSnapshot.docs.forEach((estoque) => {
                    optionsProdutos+='<option value="'+rmvUndef(estoque.data()['Produto'])+'^'+rmvUndef(estoque.data()['Quantidade'])+'^'+rmvUndef(estoque.data()['Preco'])+'">'+rmvUndef(estoque.data()['Produto'])+'</option>'                    
                })

                $('#SelectProdutosVenda'+idLinha+' option[value!=""]').remove()
                $('#SelectProdutosVenda'+idLinha).append($(optionsProdutos))

                $('#SelectProdutosVenda'+idLinha).formSelect()

            })
        }
    }


}

function excluirTipoProduto(tipoProd){

    var res = confirm("Você Deseja mesmo Excluir este Tipo de Produto? ")
    if(!res){
        return
    }

    db.collection("Estoque").where("Tipo","==",tipoProd).get().then((EstoqueSnapshot) => {

        EstoqueSnapshot.docs.forEach((estoque) => {

            db.collection("Estoque").doc(estoque.id)
            .delete().then(function() {
                M.toast({html: 'Excluido com sucesso!!', classes:'Green rounded'})
            }).catch(function(error) {
                M.toast({html: 'Erro ao Excluir Produto!!', classes:'red rounded'})
                M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                console.log("Erro Apagando Produto:")
                console.error(error)
            });

        })

    })

    db.collection("TipoProdutos").doc(tipoProd)
    .delete().then(function(){
        M.toast({html: 'Tipo Produto Excluido com sucesso!!', classes:'Green rounded'})
    }).catch(function(error){
        M.toast({html: 'Erro ao Excluir Tipo Produto!!', classes:'red rounded'})
        M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
        console.log("Erro Apagando Tipo Produto:")
        console.error(error)
    })

    iniciaAdministracao();

}

function editarProdutos(linha){

    var idProduto = linha.attributes["idproduto"].nodeValue

    db.collection("Estoque").doc(idProduto).get().then((estoque) => {
        var editnomeProdutoNovov = $("#editnomeProdutoNovo")
        editnomeProdutoNovov.val(rmvUndef(estoque.data()['Produto']))
        $("#editnomeProdutoNovo ~ Label").addClass("active")

        var editPesoProdutoNovov = $("#editPesoProdutoNovo")
        editPesoProdutoNovov.val(rmvUndef(estoque.data()['Peso']))
        $("#editPesoProdutoNovo ~ Label").addClass("active")

        var editPrecoProdutoNovov = $("#editPrecoProdutoNovo")
        editPrecoProdutoNovov.val(rmvUndef(estoque.data()['Preco']))
        $("#editPrecoProdutoNovo ~ Label").addClass("active")

        var editQuantidadeProdutoNovov = $("#editQuantidadeProdutoNovo")
        editQuantidadeProdutoNovov.val(rmvUndef(estoque.data()['Quantidade']))
        $("#editQuantidadeProdutoNovo ~ Label").addClass("active")

        var editDescricaoProdutoNovov = $("#editDescricaoProdutoNovo")
        editDescricaoProdutoNovov.val(rmvUndef(estoque.data()['Descricao']))
        $("#editDescricaoProdutoNovo ~ Label").addClass("active")

        $("#salvarProdutoEditBtn").unbind('click')
        $("#salvarProdutoEditBtn").click(function(){ 

            console.log("Salvando Produto: "+idProduto) 

            if((editnomeProdutoNovov.val() == "") || (editPesoProdutoNovov.val() == "") || (editPrecoProdutoNovov.val() == "") || (editQuantidadeProdutoNovov.val() == "") || (editDescricaoProdutoNovov.val() == "")){
                M.toast({html: 'Favor preencher todos os campos!!', classes:'red rounded'})
                return
            }        

            db.collection("Estoque").doc(idProduto)
            .update({
                Produto: editnomeProdutoNovov.val(),
                Peso: parseFloat(editPesoProdutoNovov.val()),
                Preco: parseFloat(editPrecoProdutoNovov.val()),
                Quantidade: parseInt(editQuantidadeProdutoNovov.val()),
                Descricao: editDescricaoProdutoNovov.val()
            }).then(function() {
                M.toast({html: 'Atualizado com sucesso!!', classes:'Green rounded'})
                $("#editaProdutos").modal('close')
                iniciaAdministracao()
            }).catch(function(error) {
                M.toast({html: 'Erro ao Atualizar!!', classes:'red rounded'})
                M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                console.log("Erro Atualizando Produto:")
                console.error(error)
            });
        });

        


        $("#excluirProdutoEditBtn").unbind('click')
        $("#excluirProdutoEditBtn").click(function(){
            console.log("Excluindo Produto: "+idProduto) 
            var res = confirm("Você Deseja mesmo Excluir este produto? ")
            if(res){
                db.collection("Estoque").doc(idProduto)
                .delete().then(function() {
                    M.toast({html: 'Excluido com sucesso!!', classes:'Green rounded'})
                    $("#editaProdutos").modal('close')
                    iniciaAdministracao()
                }).catch(function(error) {
                    M.toast({html: 'Erro ao Excluir!!', classes:'red rounded'})
                    M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                    console.log("Erro Apagando Produto:")
                    console.error(error)
                });
            } 
        });


    })

    modalEditaProd = M.Modal.getInstance($("#editaProdutos")[0])
    modalEditaProd.open()

}
function recalculaPedidoTela(){
    var numeroPedido = $("#numeroPedidoRecalcula").val()
    if(numeroPedido != ""){
        recalculaPedido(numeroPedido)
    }else{
        M.toast({html: 'Preencher numero do Pedido!!', classes:'rounded'})
    }
}
function recalculaPedido(numeroPedido,idItemPedido=""){

    if(numeroPedido == ""){
        db.collection("ItensPedido").doc(idItemPedido).get().then((EstoqueSnapshot) => {
            numeroPedido = rmvUndef(EstoqueSnapshot.data()["NumeroPedido"])

            if(numeroPedido == ""){
                M.toast({html: 'Erro ao Atualizar!!', classes:'red rounded'})
                console.error("numeroPedido não pode ser Null")
                return    
            }

            db.collection("ItensPedido").where("NumeroPedido", "==", parseFloat(numeroPedido)).get().then((EstoqueSnapshot) => {
                quantidadeRecalculada = 0
                precoRecalculado = 0
                EstoqueSnapshot.docs.forEach((estoque) => {
                    quantidadeRecalculada = parseFloat(quantidadeRecalculada)+parseFloat(estoque.data()["Quantidade"])
                    precoRecalculado = parseFloat(precoRecalculado)+parseFloat(estoque.data()["Preco"])
                })
        
                db.collection("ItensPedido").where("NumeroPedido", "==", parseFloat(numeroPedido)).get().then((EstoqueSnapshot) => {
                    timeoutRecalculaPedido = ""
                    EstoqueSnapshot.docs.forEach((estoque) => {
                        db.collection("ItensPedido").doc(estoque.id)
                        .update({
                            QuantidadeTotalItensPedido: parseFloat(quantidadeRecalculada),
                            ValorTotalPedido: parseFloat(precoRecalculado)
                        }).then(function() {
                            clearTimeout(timeoutRecalculaPedido);
                            timeoutRecalculaPedido = setTimeout(function(){ 
                                M.toast({html: 'Valores do Pedido Atualizados com sucesso!!', classes:'green rounded'})
                            }, 300);
                           
                        }).catch(function(error) {
                            clearTimeout(timeoutRecalculaPedido);
                            timeoutRecalculaPedido = setTimeout(function(){ 
                                M.toast({html: 'Erro ao Atualizar!!', classes:'red rounded'})
                                M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                                console.log("Erro Atualizando Produto:")
                                console.error(error)
                            }, 300);
        
                        });
            
                    })
                })
                console.log(quantidadeRecalculada)
                console.log(precoRecalculado)
        
            })
        

        })
        return  
    }



    db.collection("ItensPedido").where("NumeroPedido", "==", parseFloat(numeroPedido)).get().then((EstoqueSnapshot) => {
        quantidadeRecalculada = 0
        precoRecalculado = 0
        EstoqueSnapshot.docs.forEach((estoque) => {
            quantidadeRecalculada = parseFloat(quantidadeRecalculada)+parseFloat(estoque.data()["Quantidade"])
            precoRecalculado = parseFloat(precoRecalculado)+parseFloat(estoque.data()["Preco"])
        })

        db.collection("ItensPedido").where("NumeroPedido", "==", parseFloat(numeroPedido)).get().then((EstoqueSnapshot) => {
            timeoutRecalculaPedido = ""
            EstoqueSnapshot.docs.forEach((estoque) => {
                db.collection("ItensPedido").doc(estoque.id)
                .update({
                    QuantidadeTotalItensPedido: parseFloat(quantidadeRecalculada),
                    ValorTotalPedido: parseFloat(precoRecalculado)
                }).then(function() {
                    clearTimeout(timeoutRecalculaPedido);
                    timeoutRecalculaPedido = setTimeout(function(){ 
                        M.toast({html: 'Valores do Pedido Atualizados com sucesso!!', classes:'green rounded'})
                    }, 300);
                   
                }).catch(function(error) {
                    clearTimeout(timeoutRecalculaPedido);
                    timeoutRecalculaPedido = setTimeout(function(){ 
                        M.toast({html: 'Erro ao Atualizar!!', classes:'red rounded'})
                        M.toast({html: 'Vocês sabem quem Chamar!!', classes:'red rounded', displayLength:'15000'})
                        console.log("Erro Atualizando Produto:")
                        console.error(error)
                    }, 300);

                });
    
            })
        })
        console.log(quantidadeRecalculada)
        console.log(precoRecalculado)

    })

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function rmvUndef(prop){

    if(prop == "undefined"){
        res = ""
    }else if(prop == undefined){
        res = ""
    }else{
        res = prop
    }

    return res

}

function adicionaTipoProduto(){
    ordemExibicao = 0

    db.collection("TipoProdutos").orderBy("OrdemExibicao","desc").limit(1).get().then((EstoqueSnapshot) => {
        EstoqueSnapshot.docs.forEach((estoque) => {
            ordemExibicao = estoque.data()["OrdemExibicao"]+1
        })      
    
    descricaoTipo = $("#descricaoTipo").val().split(' ').join('_')

    if(descricaoTipo != ""){
        db.collection("TipoProdutos").doc(descricaoTipo).set({
            Descricao: descricaoTipo,
            OrdemExibicao: parseFloat(ordemExibicao)+1
        })
        .then(function(docRef) {
            M.toast({html: 'Gravado com Sucesso!!', classes:'Green rounded'})
            iniciaAdministracao()
        })
        .catch(function(error) {
            M.toast({html: 'Erro Adicionando Tipo de Produto!!', classes:'red rounded'})
            M.toast({html: error, classes:'red rounded'})
        });
    }else{
        M.toast({html: 'Favor Digitar a Descrição!!', classes:'red rounded'})
    }

    
    })


}

function adicionarProdutoAoEstoque(){

    nomeProdutoNovo = $("#nomeProdutoNovo").val()
    PesoProdutoNovo = $("#PesoProdutoNovo").val()
    PrecoProdutoNovo = $("#PrecoProdutoNovo").val()
    QuantidadeProdutoNovo = $("#QuantidadeProdutoNovo").val()
    TipoProdutoNovo = $("#TipoProdutoNovo").val()
    DescricaoProdutoNovo = $("#DescricaoProdutoNovo").val()
    

    if((nomeProdutoNovo == "") || (PesoProdutoNovo == "") || (PrecoProdutoNovo == "") || (QuantidadeProdutoNovo == "") || (TipoProdutoNovo == "") || (TipoProdutoNovo == null) || (DescricaoProdutoNovo == "")){
        M.toast({html: 'Favor preencher todos os campos!!', classes:'red rounded'})
        return
    }

    db.collection("Estoque").where("Produto","==",nomeProdutoNovo).get().then((EstoqueSnapshot) => {
        if(EstoqueSnapshot.size!=0){
            M.toast({html: 'Produto já Cadastrado!!', classes:'red rounded'})
            return
        }else{
            db.collection("Estoque").add({
                Peso: parseFloat(PesoProdutoNovo),
                Produto: nomeProdutoNovo,
                Quantidade: parseInt(QuantidadeProdutoNovo),
                Tipo: TipoProdutoNovo,
                Preco: parseFloat(PrecoProdutoNovo),
                Descricao: DescricaoProdutoNovo
            })
            .then(function(docRef) {
                M.toast({html: 'Produto Adicionado com Sucesso!!', classes:'green rounded'})
                $("#adicionarProdutos").modal('close')
                iniciaAdministracao()
                
            })
            .catch(function(error) {
                M.toast({html: 'Erro Adicionando Produto ao Estoque!!', classes:'red rounded'})
                M.toast({html: error, classes:'red rounded'})
            });        
        }
    })


}

function reloadPagina(tempo){

    setTimeout(function(){
        location.reload()
    },tempo)

}



/*inputElement.onchange = function(event) {
    var fileList = event.target.files;
    //TODO do something with fileList.  
 }*/

 $('#btnfileInput').click(function() {

    enviaImgOcr();

    /*//get file object
    var file = document.getElementById('fileInput').files[0];
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            alert(e.target.result);
        };
    }*/
});


var form;
$('#fileInput').change(function (event) {
    form = event.target.files[0] // para apenas 1 arquivo
    //var name = event.target.files[0].content.name; // para capturar o nome do arquivo com sua extenção
});

$(':file').on('change', function() {
    var file = this.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        var teste = reader.result;

        var formData = new FormData();
        formData.append("base64image", teste);
        //formData.append("url", file);
        formData.append("language"   , "por");
        formData.append("apikey"  , "ec5eeebb6288957");
        formData.append("isOverlayRequired", true);
        formData.append("isTable", true);
        formData.append("isCreateSearchablePdf", false);
        formData.append("OCREngine", 1);
        //formData.append("isTable", true);
        
        //Send OCR Parsing request asynchronously
        jQuery.ajax({
            url: "https://api.ocr.space/parse/image",
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (ocrParsedResult) {
                resultadoOcr = ocrParsedResult
                console.log(resultadoOcr)
            }
        });
    
    };
    reader.onerror = function (error) {
      console.error('Error: ', error);
      return
    };


});


function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

function enviaImgOcr() {

    //Prepare form data
    var formData = new FormData();
    formData.append("file", form);
    //formData.append("url", "URL-of-Image-or-PDF-file");
    formData.append("language", "por");
    formData.append("apikey", "2b00aae4c588957");
    formData.append("isOverlayRequired", true);
    //Send OCR Parsing request asynchronously
    jQuery.ajax({
        url: 'https://api.ocr.space/parse/image',
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (ocrParsedResult) {
            //Get the parsed results, exit code and error message and details
            var parsedResults = ocrParsedResult["ParsedResults"];
            var ocrExitCode = ocrParsedResult["OCRExitCode"];
            var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
            var errorMessage = ocrParsedResult["ErrorMessage"];
            var errorDetails = ocrParsedResult["ErrorDetails"];
            var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
            //If we have got parsed results, then loop over the results to do something
            if (parsedResults != null) {
                //Loop through the parsed results
                $.each(parsedResults, function (index, value) {
                    var exitCode = value["FileParseExitCode"];
                    var parsedText = value["ParsedText"];
                    var errorMessage = value["ParsedTextFileName"];
                    var errorDetails = value["ErrorDetails"];

                    console.log(parsedText)

                    var textOverlay = value["TextOverlay"];
                    var pageText = '';
                    switch (+exitCode) {
                        case 1:
                            pageText = parsedText;
                            break;
                        case 0:
                        case -10:
                        case -20:
                        case -30:
                        case -99:
                        default:
                            pageText += "Error: " + errorMessage;
                            break;
                    }

                    $.each(textOverlay["Lines"], function (index, value) {

                        //LOOP THROUGH THE LINES AND GET WORDS TO DISPLAY ON TOP OF THE IMAGE AS OVERLAY

                    });


                    //YOUR CODE HERE
                });
            }
        },error: function(e){
            console.error(e)
        }
    });

}

function formataEmReais(valor){
    var res = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valor);
      
      return res;
}

function zeraNulo(valor){
    console.log(valor)
    if((valor == "") || (valor == "undefined") || (valor == undefined)){
        valor = 0
    }

    return valor
}

//Adiciona Com id
/* 
db.collection("TipoProdutos").doc("Rondelli").set({
    Descricao: "Rondelli"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
*/



//Adiciona id Aletorio
/*
db.collection("TipoProdutos").add({
    Descricao: "Rondelli"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
*/


//pega informacoes da colecao
/*
db.collection("TipoProdutos").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
       console.log(doc.data()["Descricao"]);
    });
});
*/


//Adiciona produto
/*
db.collection("Produtos").add({
    Nome: "Rondelli Quatro Queijos",
    Peso: 1000,
    Preco: 26,
    Sabor: "Quatro Queijos",
    Tipo: "Rondelli"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
*/


//seleciona produto com filtros
/*
db.collection("Produtos").where("Tipo","==","Massas").where("Sabor","==","Quatro Queijos").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
       console.log(doc.id);
    });
});
*/

