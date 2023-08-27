class DisciplinaService {
    constructor() {
        this.repositorioDisciplina = new DisciplinaRepositorio();
        this.serviceAluno = new AlunoService();
    }

    inserir(nome, codigo) {
        if(nome == '' || codigo == '')
            throw new Error('Impossivel cadastrar com campos vazios!');
        const disciplinaPesquisada = this.pesquisarPorCodigo(codigo);
        if (disciplinaPesquisada.length > 0)
            throw new Error('Disciplona já cadastrada!');

        const disciplinaNova = new Disciplina(codigo, nome);
        this.repositorioDisciplina.inserir(disciplinaNova);
        return disciplinaNova;   
    }

    inserirAlunoNaDisciplina(nome, idade, matricula, codigo){
        if(nome == '' || idade == '' || matricula == '' || codigo == '')
            throw new Error('Impossivel cadastrar com campos vazios!');
        
        const disciplinaPesquisada = this.pesquisarPorCodigo(codigo)[0];
        if (disciplinaPesquisada == null)
            throw new Error('Disciplona não cadastrada!');

        const alunoPesquisado = this.serviceAluno.pesquisarPorMatricula(matricula)[0]
        if(alunoPesquisado == null)
            var alunoNovo = this.serviceAluno.inserir(nome, idade, matricula);
        else{
            disciplinaPesquisada.alunos.forEach(aluno => {
                if(aluno.matricula === matricula)
                    throw new Error('Aluno ja cadastrada na disciplina!');
            });
            alunoNovo = alunoPesquisado;
        }
        disciplinaPesquisada.alunos.push(alunoNovo)
        return alunoNovo;
    }

    pesquisarPorCodigo(codigo) {
        return this.repositorioDisciplina.listar().filter(
            disciplina => disciplina.codigo === codigo);
    }   

    listar() {
        return this.repositorioDisciplina.listar()
    }

    remover(codigo) {
        this.repositorioDisciplina.remover(codigo);
    }
}
