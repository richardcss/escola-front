/* eslint-disable no-unused-vars */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';

import axios from '../../../services/axios';
import * as types from '../types';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(axios.post, '/tokens', {
      email,
      password,
    });

    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (err) {
    toast.error('Usuário ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');

  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users/', {
        email,
        nome,
        password: password || undefined,
      });

      toast.success('Você atualizou o seu usuário');

      yield put(actions.registerUpdatedSuccess(payload));
    } else {
      yield call(axios.post, '/users/', {
        email,
        nome,
        password,
      });

      toast.success('Contra criada com sucesso!');
      yield put(actions.registerCreatedSuccess(payload));
      history.push('/login');
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    const status = get(err, 'response.status', 0);

    if (status === 401) {
      toast.info('Você precisa fazer login novamente');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map(error => toast.error(error));
    } else {
      console.log('err:', err);
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
