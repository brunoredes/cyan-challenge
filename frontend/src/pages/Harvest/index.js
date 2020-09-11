import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

import api from '../../services/api';

import logoImg from '../../assets/cyan-logo-transp.webp';
import './styles.css';

export default function NewIncident() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const history = useHistory();

  const millId = localStorage.getItem('millId');

  async function handleNewHarvest(e) {
    e.preventDefault();

    const data = {
      startDate,
      endDate,
    };

    try {
      await api.post('harvest', data, {
        headers: {
          Authorization: millId,
        },
      });

      history.push('/profile');
    } catch (err) {
      // eslint-disable-next-line no-alert
      toast.error('Erro ao cadastrar colheita, por favor tente novamente');
    }
  }

  return (
    <div className="harvest-container">
      <ToastContainer />
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar nova colheira</h1>
          <p>
            Digite uma data de início e data de fim para suas colheitas
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewHarvest}>
          <label htmlFor="start-date">Data de início</label>
          <input
            type="date"
            placeholder="Data de início"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            name="start-date"
          />
          <label htmlFor="end-date">Data de fim</label>
          <input
            type="date"
            placeholder="Data de fim"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            name="end-date"
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
