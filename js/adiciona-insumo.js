var adicionarInsumo = document.querySelector("#adicionar-insumo");
var valorTotal = 0;
let insumos = [];

var lucro_calculado = 0;

adicionarInsumo.addEventListener("click", function(event){   
    event.preventDefault();

    //Captura o formulário
    var form = document.querySelector("#form-insumo");

    var insumo = obtemInsumo(form);
        
    //Valida os campos preenchidos
    var validacao = validaInsumo(insumo);
    
    adicionaInsumoNaTabela(insumo);
    
    //Limpa o formulário
    form.reset();
    
    //Limpa a UL de erros
    document.querySelector("#mensagens-erro").innerHTML="";
})

function adicionaInsumoNaTabela(insumo){
    var insumoTr = montaTr(insumo);
    var tabela = document.querySelector('#tabela-insumos');
    tabela.appendChild(insumoTr);

    var valor_necessario=0;

    for (var i = 0; i < insumos.length; i++) {
        valor_necessario += insumos[i][4];
        
         //var final = insumos[i][5] = formataValor(((lucro + 100) / 100) * insumos[i][4]);
        // var final2 = insumos[i][5] = parseFloat(((lucro + 100) / 100) * insumos[i][4]);
        // valorTotal +=final2;
        // console.log(typeof final2);
        // console.log(final2);
    }

    document.getElementById("total_insumos").innerHTML=valor_necessario;
    //Calculo do lucro
    lucro_calculado=valor_necessario*document.getElementById("lucro").value/100;
    document.getElementById("valor_lucro").innerHTML=formataValor(lucro_calculado);
    document.getElementById("total_produto").innerHTML=formataValor(Math.ceil(valor_necessario+lucro_calculado));
}

function obtemInsumo(form){
    var insumo = {
        insumo: form.insumo.value,
        qtdeInsumo: form.qtdeInsumo.value,
        qtdeProduto: form.qtdeProduto.value,
        valor: form.valor.value
    }

    return insumo;
}

function montaTr(insumo){
    
    //Monta a nova linha da tabela
    var insumoTr = document.createElement("tr");

   //Atribui as colunas na nova linha
    insumoTr.appendChild(montaTd(insumo.insumo, "insumo"));
    insumoTr.appendChild(montaTd(insumo.qtdeInsumo, "qtdeInsumo"));
    insumoTr.appendChild(montaTd(insumo.qtdeProduto, "qtdeProduto"));
    insumoTr.appendChild(montaTd(formataValor(insumo.valor, "valor")));
    insumoTr.appendChild(montaTd(formataValor(insumo.valor/insumo.qtdeProduto*insumo.qtdeInsumo)));

    
    var lucroExl = document.getElementById("lucro").value/100;

    let linha = [insumo.insumo, insumo.qtdeInsumo, insumo.qtdeProduto, insumo.valor, insumo.valor/insumo.qtdeProduto*insumo.qtdeInsumo, (lucroExl+1)*(insumo.valor/insumo.qtdeProduto*insumo.qtdeInsumo)];
    insumos.push(linha);

    return insumoTr;
}

function montaTd(dados, classe){
    var td = document.createElement("td");
    td.textContent = dados;
    td.classList.add(classe);

    return td;
}

//Função de validação do preenchimento do formulário
function validaInsumo(insumo){
    
    var erros = [];

    if(insumo.insumo==""){
        erros.push("Por favor, selecione um insumo para esta produto.");
    }
    
    if(insumo.qtdeInsumo==""){
        erros.push("A quantidade é inválida.");
    }

    if(insumo.qtdeProduto==""){
        erros.push("A quantidade da Embalagem é inválida.");
    }

    if(insumo.valor==""){
        erros.push("O Valor é inválido")
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

function valorFinal(){
    for (i=0; i<insumos.length; i++){
        var soma = 0;
        soma+=insumos[i][5];
    } 
}

function exportarExcel(){
    exportToExcel(insumos);
}