import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { FiPower, FiMap } from 'react-icons/fi';

import logoImg from '../../assets/cyan-logo-transp.webp';
import fieldImg from '../../assets/field.png';

import api from '../../services/api';

import './styles.css';

export default function Field() {

  const [field, setField] = useState([]);

  const history = useHistory();

  const farmId = localStorage.getItem('farmId');

  useEffect(() => {
    api.get('/field', {
      params: { farm_id: farmId }
    }).then((res) => {
      console.log(res.data);
      setField(res.data);
    });
  }, [farmId]);

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>
          Colheita
          {' '}
          {farmId}
        </span>

        <Link className="button" to="/harvest">Voltar para fazenda</Link>
        <button onClick={handleLogout} type="button" data-tip="Sair">
          <FiPower size={18} color="#E02041" />
        </button>
        <ReactTooltip />
      </header>

      <h1>Campos cadastrados</h1>
      <ul>
        {field.map((farm) => (
          <li key={farm.id}>
            <strong>ID do Campo</strong>
            <p>{farm.id}</p>

            <strong>Latitude</strong>
            <p>{farm.coordinates.coordinates[0]}</p>

            <strong>Longitude</strong>
            <p>{farm.coordinates.coordinates[1]}</p>

            <strong>
              <a href={`https://www.google.com/maps/@${farm.coordinates.coordinates[0]},${farm.coordinates.coordinates[1]}`}>
                <FiMap />
              Ver no mapa
              </a>
            </strong>

            <img src={fieldImg} alt="Campo" />
          </li>
        ))}
      </ul>
    </div >
  );
}
