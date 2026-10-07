import { useState } from "react";
import "./App.css";

export default function App() {
  
  const [ideias, setIdeias] = useState([]);

  const [novaIdeia, setNovaIdeia] = useState("");

  const [erro, setErro] = useState("");

  function aoAdicionar(event) {
    event.preventDefault();

    const texto = novaIdeia.trim();

    if (texto === "") {
      setErro("Digite sua ideia antes de adicionar.");
      return;
    }

    const ideia = { id: Date.now(), texto, feita: false };

    setIdeias((atual) => [...atual, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function aoDigitar(event) {
    setNovaIdeia(event.target.value);
    setErro("");
  }

  function aoAlternar(id) {
    setIdeias((atual) =>
      atual.map((ideia) =>
        ideia.id === id ? { ...ideia, feita: !ideia.feita } : ideia
      )
    );
  }

  function aoRemover(id) {
    setIdeias((atual) => atual.filter((ideia) => ideia.id !== id));
  }

  const total = ideias.length;
  const concluidas = ideias.filter((ideia) => ideia.feita).length;

  return (
    <main className="painel">
      <h1>Painel de Ideias</h1>

      <form onSubmit={aoAdicionar} className="formulario">
        <input
          type="text"
          value={novaIdeia}
          onChange={aoDigitar}
          placeholder="Qual é a sua ideia?"
        />
        <button type="submit">Adicionar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul className="lista">
        {ideias.map((ideia) => (
          <li key={ideia.id} className="item">
            <label>
              <input
                type="checkbox"
                checked={ideia.feita}
                onChange={() => aoAlternar(ideia.id)}
              />
    
              <span className={ideia.feita ? "texto feita" : "texto"}>
                {ideia.texto}
              </span>
            </label>
            <button
              type="button"
              className="remover"
              onClick={() => aoRemover(ideia.id)}
              aria-label={`Remover ideia: ${ideia.texto}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <footer className="rodape">
        {`${total} ideias no painel · ${concluidas} concluídas`}
      </footer>
    </main>
  );
}
