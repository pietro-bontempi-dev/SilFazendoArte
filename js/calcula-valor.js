var calculaValor = document.querySelector("#calcula-valor");
var form = document.querySelector("#form-calcula");
var valorTotal = 0;

calculaValor.addEventListener("click", function (event) {

    event.preventDefault();

    var lucro = parseFloat(form.lucro.value);
    var nomeProduto = form.produto.value;

    for (var i = 0; i < insumos.length; i++) {
        console.log(insumos[i][4]);
        var final = insumos[i][5] = ((lucro + 100) / 100) * insumos[i][4];
        valorTotal += final;
    }

    console.log(valorTotal);
    adicionarLinha(nomeProduto);



    var insumo = obtemInsumo(form);
        
    //Valida os campos preenchidos
    var validacao = validaInsumo(insumo);
    
    if(validacao.length > 0){
        //Exibe os erros de preenchimento do formulário
        exibeMensagemErro(validacao);
        return;
    }
    
    
    adicionaInsumoNaTabela(insumo)
    
    //Limpa o formulário
    form.reset();
    

})


function adicionarLinha(nome) {
    
    // Cria uma nova linha na tabela
    let novaLinha = form.insertRow();

    // Cria células na nova linha e define o conteúdo das células
    let celula1 = novaLinha.insertCell();
    celula1.textContent = nome;

    let celula2 = novaLinha.insertCell();
    celula2.textContent = valorTotal;
  }


function adicionaInsumoNaTabela(insumo) {
    var insumoTr = montaTr(insumo);
    var tabela = document.querySelector('#tabela-insumos');
    tabela.appendChild(insumoTr);
}

function obtemInsumo(form) {
    var insumo = {
        insumo: form.insumo.value,
        qtdeInsumo: form.qtdeInsumo.value,
        qtdeProduto: form.qtdeProduto.value,
        valor: form.valor.value
    }

    return insumo;
}

function montaTr(insumo) {

    //Monta a nova linha da tabela
    var insumoTr = document.createElement("tr");

    //Atribui as colunas na nova linha
    insumoTr.appendChild(montaTd(insumo.insumo, "insumo"));
    insumoTr.appendChild(montaTd(insumo.qtdeInsumo, "qtdeInsumo"));
    insumoTr.appendChild(montaTd(insumo.qtdeProduto, "qtdeProduto"));
    insumoTr.appendChild(montaTd(formataValor(insumo.valor, "valor")));
    insumoTr.appendChild(montaTd(formataValor(insumo.valor / insumo.qtdeProduto * insumo.qtdeInsumo)));

    let linha = [insumo.insumo, insumo.qtdeInsumo, insumo.qtdeProduto, insumo.valor, insumo.valor / insumo.qtdeProduto * insumo.qtdeInsumo, 0];
    insumos.push(linha);

    console.log(insumos);

    return insumoTr;
}

function montaTd(dados, classe) {
    var td = document.createElement("td");
    td.textContent = dados;
    td.classList.add(classe);

    return td;
}