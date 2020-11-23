import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepos] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res) => setRepos(res.data));
  }, []);

  async function handleAddRepository() {
    const res = await api.post("repositories", {
      title: `Repository ${Date.now()}`,
      url: "http://github.com/sethwololo",
      techs: ["reactjs", "nodejs"],
    });
    const repository = res.data;
    setRepos([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepos(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
