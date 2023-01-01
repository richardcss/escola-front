import React from 'react';
import propTypes from 'prop-types';

import { Container } from './styled';

export default function Loading({ isLoading }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span />
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: propTypes.bool,
};
