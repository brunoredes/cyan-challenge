import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { FiPower, FiPlus, FiInfo } from 'react-icons/fi';

import logoImg from '../../assets/cyan-logo-transp.webp';
import farmImg from '../../assets/farm.svg';

import api from '../../services/api';

import './styles.css';

export default function HarvestProfile() {

  const [farm, setFarm] = useState([]);

  const history = useHistory();

  const harvestid = localStorage.getItem('harvesttId')

  useEffect(() => {
    api.get(`/farm/${harvestid}`, {
    }).then((res) => {
      setFarm(res.data);
    });
  }, [harvestid]);

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  function handleAddField() {
    history.push('/field/new');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>
          Colheita
          {' '}
          {harvestid}
        </span>

        <Link className="button" to="/profile">Voltar para moinho</Link>
        <button onClick={handleLogout} type="button" data-tip="Sair">
          <FiPower size={18} color="#E02041"/>
        </button>
        <ReactTooltip />
      </header>

      <div className="harvest-session">
        <h1>Fazendas Cadastradas</h1>

        <FiInfo size={40}
          data-tip="Para adicionar um novo campo, 
          copie o ID da fazenda e clique no botão de adicionar, no card abaixo"
          color="#A8A8B3" className="harvest-info" />
        <ReactTooltip />
      </div>
      <ul>
        {farm.map((farm) => (
          <li key={farm.id}>
            <strong>ID da Fazenda</strong>
            <p>{farm.id}</p>

            <strong>Nome </strong>
            <p>{farm.name}</p>

            <div>
              <button data-tip="Adicionar novo Campo" type="button" onClick={() => handleAddField()}>
                <FiPlus size={20} color="#A8A8B3" />
              </button>
              <ReactTooltip />
            </div>

            <img src={farmImg} alt="Fazenda" />
          </li>
        ))}
      </ul>
    </div >
  );
}
