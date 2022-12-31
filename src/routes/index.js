import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './myRoute';

import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute path="/" component={Alunos} exact isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute path="/aluno/" component={Aluno} exact isClosed />
      <MyRoute path="/foto/:id" component={Fotos} exact isClosed />
      <MyRoute path="/register/" component={Register} exact isClosed={false} />
      <MyRoute path="/login/" component={Login} exact isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
