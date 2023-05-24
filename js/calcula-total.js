

//Captura todos os clientes que fizeram encomendas
var clientes = document.querySelectorAll(".cliente");

for (var i=0; i < clientes.length; i++) {
    
    //Captura a quantidade encomendada
    var qtde = clientes[i].querySelector(".qtde").textContent;
    
    //Captura o valor unitário do produto
    var unitario = clientes[i].querySelector(".unitario").textContent;

    //Verifica se a QTDE recebida é válida
    if (!validaQtde(qtde)) {
        //Aqui se não for válido
        clientes[i].querySelector(".qtde").textContent = "Qtde inválida";
        clientes[i].style.color="red";
    }
    else {
        //QTDE é válida, verifica o valor unitário
        if(!validaUnitario(unitario)){
            
            //Aqui se não for válido
            clientes[i].querySelector(".unitario").textContent = "Unitário inválido";
            clientes[i].style.backgroundColor = "lightcoral";
        }
        else {
            //Exibe o valor total da encomenda
            clientes[i].querySelector(".total").textContent = calculaTotal(qtde,unitario);

            //Formata o valor unitário
            clientes[i].querySelector(".unitario").textContent = formataValor(unitario);
        }
        
    }    
}

//Função pra formatação de valor
function formataValor(valor){
    
    var valorFormatado = parseFloat(valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return valorFormatado;
}

//Função para calcular o valor total
function calculaTotal(qtde,unitario){
    var total = 0;

    total = qtde * unitario;

    return formataValor(total);
}

//Função para validação da QTDE
function validaQtde(qtde){
    if(!isNaN(qtde) && qtde > 0){
        return true;
    }else{
        return false;
    }
}

//Função para validação do Valor Unitário
function validaUnitario(unitario){
    if(!isNaN(unitario) && unitario > 0){
        return true;
    }else{
        return false;
    }
}


