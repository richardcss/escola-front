import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import axios from '../../services/axios';
import history from '../../services/history';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    let formsErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      // eslint-disable-next-line no-unused-vars
      formsErrors = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      // eslint-disable-next-line no-unused-vars
      formsErrors = true;
      toast.error('O email deve ser válido');
    }

    if (password.length < 6 || password.length > 32) {
      // eslint-disable-next-line no-unused-vars
      formsErrors = true;
      toast.error('A senha deve ter entre 6 e 32 caracteres');
    }

    if (!formsErrors) {
      try {
        await axios.post('/users/', {
          nome,
          password,
          email,
        });

        toast.success('Você fez seu cadastro');
        history.push('/login');
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);

        errors.map(error => toast.error(error));
      }
    }
  };

  return (
    <Container>
      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            placeholder="Seu nome"
            onChange={e => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            value={email}
            placeholder="Seu email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            placeholder="Sua senha"
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
