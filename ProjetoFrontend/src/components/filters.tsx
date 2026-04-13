
export function Filters(props: any) {

  function aplicarFiltro() {
    let filtrados = props.livros;

    // STATUS
    if (props.statusFilter !== "todos") {
      filtrados = filtrados.filter(
        (l: any) => l.status === props.statusFilter
      );
    }

    // GÊNERO
    if (props.generoFilter !== "todos") {
      filtrados = filtrados.filter(
        (l: any) => l.genero === props.generoFilter
      );
    }

    // EDITORA
    if (props.editoraFilter !== "todos") {
      filtrados = filtrados.filter(
        (l: any) => l.editora === props.editoraFilter
      );
    }

    // AVALIAÇÃO
    if (props.avaliacaoFilter !== "todos") {
      filtrados = filtrados.filter(
        (l: any) => l.avaliacao === Number(props.avaliacaoFilter)
      );
    }

    // ORDENAÇÃO
    if (props.sortBy === "titulo") {
      filtrados = [...filtrados].sort((a: any, b: any) =>
        a.titulo.localeCompare(b.titulo)
      );
    } else {
      filtrados = [...filtrados].sort((a: any, b: any) =>
        b.id - a.id
      );
    }

    props.setLivrosFiltrados(filtrados);
  }

  return (
    <section className="filter-section">
      <div className="filter-card">
        <div className="filters-grid" style={{ alignItems: 'end' }}>
          <div className="select-group">
            <label>Status</label>
            <select
              value={props.statusFilter}
              onChange={(e) => props.setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="Lido">Lido</option>
              <option value="Lendo">Lendo</option>
            </select>
          </div>
          <div className="select-group">
            <label>Gênero</label>
            <select
              value={props.generoFilter}
              onChange={(e) => props.setGeneroFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              {props.generos.map((g: any) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="select-group">
            <label>Editora</label>
            <select
              value={props.editoraFilter}
              onChange={(e) => props.setEditoraFilter(e.target.value)}
            >
              <option value="todos">Todas</option>
              {props.editoras.map((e: any) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="select-group">
            <label>Avaliação</label>
            <select
              value={props.avaliacaoFilter}
              onChange={(e) => props.setAvaliacaoFilter(e.target.value)}
            >
              <option value="todos">Todas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="select-group">
            <label>Ordenar</label>
            <button
              onClick={() =>
                props.setSortBy(
                  props.sortBy === "titulo" ? "id" : "titulo"
                )
              }
            >
              {props.sortBy === "titulo" ? "Título" : "Mais novos"}
            </button>
          </div>
          <div className="select-group" style={{ marginLeft: 8 }}>
            <button onClick={aplicarFiltro} style={{ height: 32 }}>Filtrar</button>
          </div>
        </div>
      </div>
    </section>
  );
}