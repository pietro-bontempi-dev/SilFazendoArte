//Obtem o botão do formulário
var botaoAdicionar = document.querySelector("#adicionar-encomenda");

botaoAdicionar.addEventListener("click", function(event){   
    event.preventDefault();

    //Captura o formulário
    var form = document.querySelector("#form-adiciona");

    var encomenda = obtemEncomenda(form);
    
    //Valida os campos preenchidos
    var validacao = validaEncomenda(encomenda);

    if(validacao.length > 0){
        //Exibe os erros de preenchimento do formulário
        exibeMensagemErro(validacao);
        return;
    }

    /*Captura a tabela de encomendas
    var tabela = document.querySelector("#tabela-clientes");*/
   
    //Prepara e insere a nova linha na tabela
    //tabela.appendChild(montaTr(obtemEncomenda(form)));

    adicionaEncomendaNaTabela(encomenda)

    //Limpa o formulário
    form.reset();

    //Limpa a UL de erros
    document.querySelector("#mensagens-erro").innerHTML="";
})

function adicionaEncomendaNaTabela(encomenda){
    var encomendaTr = montaTr(encomenda);
    var tabela = document.querySelector('#tabela-clientes');
    tabela.appendChild(encomendaTr);
}

function obtemEncomenda(form){
    var encomenda = {
        nome: form.nome.value,
        produto: form.produto.value,
        qtde: form.qtde.value,
        unitario: form.unitario.value
    }

    return encomenda;
}

function montaTr(encomenda){
    
    //Monta a nova linha da tabela
    var encomendaTr = document.createElement("tr");

   //Atribui as colunas na nova linha
    encomendaTr.appendChild(montaTd(encomenda.nome, "nome"));
    encomendaTr.appendChild(montaTd(encomenda.produto, "produto"));
    encomendaTr.appendChild(montaTd(encomenda.qtde, "qtde"));
    encomendaTr.appendChild(montaTd(formataValor(encomenda.unitario), "unitario"));
    encomendaTr.appendChild(montaTd(calculaTotal(encomenda.qtde, encomenda.unitario), "total"));

    return encomendaTr;
}

function montaTd(dados, classe){
    var td = document.createElement("td");
    td.textContent = dados;
    td.classList.add(classe);

    return td;
}

//Função de validação do preenchimento do formulário
function validaEncomenda(encomenda){
    
    var erros = [];

    if(encomenda.nome.length==0){
        erros.push("O nome do cliente não pode ser vazio.");
    }

    if(encomenda.produto==""){
        erros.push("Por favor, selecione um produto para esta encomenda.");
    }
    
    if(!validaQtde(encomenda.qtde)){
        erros.push("A quantidade é inválida.");
    }

    if(!validaUnitario(encomenda.unitario)){
        erros.push("O valor unitário é inválido.");
    }

    return erros;
}

//Função para exibir as mensagens de erro
function exibeMensagemErro(erros){

    var ul = document.querySelector("#mensagens-erro");

    //Limpa a UL para as novas mensagens
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent=erro;
        ul.appendChild(li);
    });
}


