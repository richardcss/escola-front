import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/alunos');
        setAlunos(response.data);
      } catch (err) {
        toast.error('Erro na requisição!');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('Você precisa fazer login');
      return;
    }

    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');

    e.currentTarget.remove();
  };

  const handleDelete = async (e, id) => {
    e.persist();

    if (!isLoggedIn) {
      toast.error('Você precisa fazer login');
      return;
    }

    try {
      e.currentTarget.parentElement.remove();
      const userName =
        e.currentTarget.parentElement.querySelector('div span').firstChild
          .nodeValue;

      console.log(id);

      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);

      toast.success(`Usuário ${userName} apagado com sucesso!`);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map(error => toast.error(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map(aluno => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              onClick={e => handleDelete(e, aluno.id)}
              size={16}
              display="none"
              cursor="pointer"
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
