import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/cyan-logo-transp.webp';

export default function Register() {
  const [name, setName] = useState('');

  const history = useHistory();

  function transport() {
    setInterval(() => {
      history.push('/');
    }, 15000);
  }

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
    };

    try {
      const res = await api.post('mills', data);

      toast.success(`Seu ID de acesso: ${res.data.id}`,
        { autoClose: 9000, draggable: false, closeOnClick: false }
      );

      transport();
    } catch (err) {
      toast.error('Erro no cadastro, tente novamente');
    }
  }
  return (
    <div className="register-container">
      <ToastContainer />
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e gerencie seus Moinhos,
            Colheitas, Fazendas e Campos!
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome do Moinho"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="moinho"
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div >
  );
}
