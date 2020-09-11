import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FiLogIn } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import cyanLogo from '../../assets/cyan-logo-transp.webp';
import heroesImg from '../../assets/agro.webp';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('millId', id);
      localStorage.setItem('millName', res.data.name);

      history.push('/profile');
    } catch (err) {
      toast.error('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <ToastContainer />
      <section className="form">
        <img src={cyanLogo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Seu ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#15b44a" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
