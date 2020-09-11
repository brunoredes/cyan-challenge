import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';

import api from '../../services/api';

import logoImg from '../../assets/cyan-logo-transp.webp';
import './styles.css';

export default function NewField() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [farmId, setFarmId] = useState(0);

  const history = useHistory();

  const millId = localStorage.getItem('millId');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )
  }, []);

  async function handleNewFarm(e) {
    e.preventDefault();

    const data = {
      latitude,
      longitude,
      farmId
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
    <div className="new-field-container">
      <ToastContainer />
      <div className="content">
        <section>
          <img src={logoImg} alt="Cyan Logo" />

          <h1>Cadastrar novo Campo</h1>
          <p>
            Digite o nome do campo
          </p>

          <Link className="back-link" to="/harvest">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para fazenda
          </Link>
        </section>

        <form onSubmit={handleNewFarm}>
          <label htmlFor="Latitude">Latitude</label>
          <input
            placeholder="Nome da fazenda"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            name="Latitude"
          />
          <label htmlFor="Longitude">Longitude</label>
          <input
            placeholder="ID da colheita"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            name="Longitude"
          />
          <label htmlFor="farm-id">ID da Fazenda</label>
          <input
            placeholder="ID da colheita"
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            name="farm-id"
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
