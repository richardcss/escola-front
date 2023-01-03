/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import axios from '../../services/axios';

export default function Fotos({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
      } catch {
        toast.error('Erro ao obter a imagem');
        history.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  const handleChange = async e => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);

    setFoto(fileUrl);

    const formData = new FormData();

    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post(`/fotos/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');
    } catch (err) {
      const { status } = get(err, 'response', '');

      toast.error('Erro ao enviar a foto');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Foto</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: propTypes.shape({}).isRequired,
};
