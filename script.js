var url = window.location.href.split("/");
url = url[url.length-1].split(".")[0];
if(url == "disciplinas")
    var controlador = new DisciplinaControlador();
else if(url == "index")
    var controlador = new AlunoControlador();