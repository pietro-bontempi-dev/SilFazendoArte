var campoFiltro=document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function(){
    
    var clientes = document.querySelectorAll(".cliente");

    if(this.value.length > 0){
        for (var i=0; i < clientes.length; i++){
            var cliente = clientes[i];
            var tdNome = cliente.querySelector(".nome");
            var nome = tdNome.textContent;

            //Busca por Expressão Regular
            //var expressao = new RegExp(this.value, "i");

            //Busca com substring
            var comparavel = nome.substring(0, this.value.length);
            var comparavelMinusculo = comparavel.toLowerCase();
            var valorDigitadoMinusculo = this.value.toLowerCase();

            //Busca por comparação variável - conteúdo do campo
            //if( nome != this.value){

            //Expressão Regular do JS
            //if(!expressao.test(nome)){
            
            //Substring
            if(!(valorDigitadoMinusculo == comparavelMinusculo)){
                //Não é igual, oculta a linha
                cliente.classList.add("invisivel");
            } else {
                //É igual, exibe a linha
                cliente.classList.remove("invisivel");
            }
        }
    } else {
        for (var i=0; i < clientes.length; i++){
            var cliente = clientes[i];

            cliente.classList.remove("invisivel");
        }
    } 
})