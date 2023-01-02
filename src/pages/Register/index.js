/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector(state => state.auth.user.id);
  const nomeStored = useSelector(state => state.auth.user.nome);
  const emailStored = useSelector(state => state.auth.user.email);
  const isLoading = useSelector(state => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

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

    if (!id && (password.length < 6 || password.length > 32)) {
      // eslint-disable-next-line no-unused-vars
      formsErrors = true;
      toast.error('A senha deve ter entre 6 e 32 caracteres');
    }

    if (formsErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados' : 'Crie sua conta'}</h1>

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

        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
