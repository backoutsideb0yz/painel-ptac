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

    const ideia = {
      id: Date.now(),
      texto,
      feita: false,
    };

    setIdeias((atual) => [...atual, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function aoDigitar(event) {
    setNovaIdeia(event.target.value);
    setErro("");
  }

  return (
    <main>
      <h1>Painel de Ideias</h1>

      <form onSubmit={aoAdicionar}>
        <input
          type="text"
          value={novaIdeia}
          onChange={aoDigitar}
          placeholder="Qual é a sua ideia?"
        />

        <button type="submit">Adicionar</button>
      </form>

      {erro && <p>{erro}</p>}
    </main>
  );
}