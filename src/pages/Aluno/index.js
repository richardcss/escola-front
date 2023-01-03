import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';

import axios from '../../services/axios';
import history from '../../services/history';

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map(error => toast.error(error));
          history.push('/');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('O sobrenome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('O e-mail precisa ser válido');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('A idade precisa ser um número inteiro');
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('O peso precisa ser um número decimal ou inteiro');
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('A altura precisa ser um número decimal ou inteiro');
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno atualizado com sucesso!');
      } else {
        await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno criado com sucesso!');
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Erro desconhecido!');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
        toast.error('Você precisa se autenticar novamente');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>
      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/foto/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit} autoComplete="off">
        <div className="parent">
          <div className="firstChild">
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                value={nome}
                id="nome"
                onChange={e => setNome(e.target.value)}
                placeholder="Nome"
              />
            </label>

            <label htmlFor="sobrenome">
              Sobrenome:
              <input
                type="text"
                value={sobrenome}
                id="sobrenome"
                onChange={e => setSobrenome(e.target.value)}
                placeholder="Sobrenome"
              />
            </label>

            <label htmlFor="email">
              E-mail:
              <input
                type="email"
                value={email}
                id="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail"
              />
            </label>
          </div>

          <div className="secondChild">
            <label htmlFor="idade">
              Idade:
              <input
                type="number"
                value={idade}
                id="idade"
                onChange={e => setIdade(e.target.value)}
                placeholder="Idade"
              />
            </label>

            <label htmlFor="peso">
              Peso (kg):
              <input
                type="number"
                value={peso}
                id="peso"
                onChange={e => setPeso(e.target.value)}
                placeholder="Peso (kg)"
              />
            </label>

            <label htmlFor="altura">
              Altura (cm):
              <input
                type="Altura"
                value={altura}
                id="altura"
                onChange={e => setAltura(e.target.value)}
                placeholder="Altura (cm)"
              />
            </label>
          </div>
        </div>

        <button type="submit">{id ? 'Salvar' : 'Enviar'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
