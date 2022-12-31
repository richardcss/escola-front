import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    margin-top: 5px;
    border-radius: 4px;
    transition: border 0.3s linear;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
