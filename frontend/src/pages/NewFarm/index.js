import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

import api from '../../services/api';

import logoImg from '../../assets/cyan-logo-transp.webp';
import './styles.css';

export default function NewIncident() {
  const [name, setName] = useState('');
  const [harvestId, setHarvestId] = useState('');

  const history = useHistory();

  const millId = localStorage.getItem('millId');

  async function handleNewFarm(e) {
    e.preventDefault();

    const data = {
      name,
      harvestId,
    };

    try {
      const response = await api.post('/farm', data, {
        headers: {
          Authorization: millId,
        },
      });
      localStorage.setItem('harvesttId', response.data.harvest_id);
      history.push('/harvest');
    } catch (err) {
      toast.error('Erro ao cadastrar Fazenda, por favor tente novamente');
    }
  }

  return (
    <div className="harvest-container">
      <ToastContainer />
      <div className="content">
        <section>
          <img src={logoImg} alt="Cyan Logo" />

          <h1>Cadastrar nova fazenda</h1>
          <p>
            Digite o nome de sua fazenda
          </p>

          <Link className="back-link" to="/harvest">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para colheitas
          </Link>
        </section>

        <form onSubmit={handleNewFarm}>
          <label htmlFor="start-date">Nome da Fazenda</label>
          <input
            placeholder="Nome da fazenda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="start-date"
          />
          <label htmlFor="end-date">ID da colheita</label>
          <input
            placeholder="ID da colheita"
            value={harvestId}
            onChange={(e) => setHarvestId(e.target.value)}
            name="end-date"
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
