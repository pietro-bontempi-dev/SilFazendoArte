var tabela = document.querySelector("table");

tabela.addEventListener("dblclick",function(event){
    //console.log(event.target);
    event.target.parentNode.classList.add("fadeOut");

    setTimeout(function(){
        event.target.parentNode.remove();
    },600);
});
