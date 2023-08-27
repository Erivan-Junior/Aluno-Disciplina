class DisciplinaControlador {

    constructor() {
        this.servico = new DisciplinaService();
    }

    inserir() {
        const nomeElemento = document.querySelector("#nomeDisciplina");
        const codigoElemento = document.querySelector("#codigoCadastrando");
        const disciplinaInserida = this.servico.inserir(nomeElemento.value, Number(codigoElemento.value));
        if (disciplinaInserida)
            this.AtualizarHtml();
    }
    inserirAlunoNaDisciplina() {
        const nomeElemento = document.querySelector("#nomeAluno");
        const idadeElemento = document.querySelector("#idade");
        const matriculaElemento = document.querySelector("#matricula");
        const codigoElemento = document.querySelector("#codigoInserindo");
        
        const alunoInserido = this.servico.inserirAlunoNaDisciplina(nomeElemento.value, Number(idadeElemento.value),
            matriculaElemento.value, Number(codigoElemento.value));
        if (alunoInserido)
            this.AtualizarHtml();
    }

    AtualizarHtml() {
        const elementoDestino = document.querySelector("#listarDisciplinas");
        elementoDestino.textContent = "";
        this.servico.listar().forEach(disciplina => {
            const disciplinaElemento = document.createElement("li");
            disciplinaElemento.textContent = `Codigo: ${disciplina.codigo} - Nome: ${disciplina.nome} - Alunos:${
                disciplina.alunos.map(aluno => aluno.nome).join(', ')}`;
            elementoDestino.appendChild(disciplinaElemento);
        });
    }
}
