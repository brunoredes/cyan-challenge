import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { FiPower, FiPlus, FiInfo } from 'react-icons/fi';

import logoImg from '../../assets/cyan-logo-transp.webp';
import mill from '../../assets/windmill.webp';

import api from '../../services/api';

import './styles.css';

export default function Profile() {

  const [harvest, setHarvest] = useState([]);

  const history = useHistory();

  const millName = localStorage.getItem('millName');
  const millId = localStorage.getItem('millId');

  useEffect(() => {
    api.get('/harvest', {
      headers: {
        Authorization: millId,
      },
    }).then((res) => {
      setHarvest(res.data);
    });
  }, [millId]);

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  function handleAddFarm() {
    history.push('/farm/new');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>
          Bem vindo ao moinho
          {' '}
          {millName}
        </span>

        <Link className="button" to="/harvest/new">Cadastrar nova colheita</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <div className="harvest-session">
        <h1>Colheitas Cadastradas</h1>
        
        <FiInfo size={40} 
              data-tip="Para adicionar uma nova fazenda, copie o ID da colheita e clique em adicionar nova fazenda" 
              color="#A8A8B3" className="harvest-info" />
              <ReactTooltip />
      </div>
      <ul>
        {harvest.map((harvest) => (
          <li key={harvest.id}>
            <strong>ID da colheita</strong>
            <p>{harvest.id}</p>

            <strong>Data de início: </strong>
            <p>{JSON.stringify(new Date(harvest.startDate)).slice(1, 11)}</p>

            <strong>Data de fim: </strong>
            <p>{JSON.stringify(new Date(harvest.endDate)).slice(1, 11)}</p>

            <strong><Link to={`/harvest`}>Acessar Colheita</Link></strong>

            <div>
              <button data-tip="Adicionar nova fazenda" type="button" onClick={() => handleAddFarm()}>
                <FiPlus size={20} color="#A8A8B3" />
              </button>
              <ReactTooltip />
            </div>

            <img src={mill} alt="Moinho" />
          </li>
        ))}
      </ul>
    </div >
  );
}
