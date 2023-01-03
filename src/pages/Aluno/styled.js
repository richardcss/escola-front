import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  .parent {
    display: flex;
    flex-direction: row;
  }

  .firstChild {
    width: 50%;
    padding-right: 20px;
  }

  .secondChild {
    width: 50%;
  }

  button {
    margin-top: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input {
    margin-top: 10px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 18px;
    transition: border 0.3s linear;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
