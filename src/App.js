import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
        
  },[] );

  

  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio 03',
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['Desafio 03']
    });

    setRepositories([...repositories, response.data]);
  
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !==id
    ));
/*ou pode ser feito:
*
*   const newRepositories = repositories.filter(
*   repository => repository.id !== id
    )
    setRepositories(newRepositories);
*/
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
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
