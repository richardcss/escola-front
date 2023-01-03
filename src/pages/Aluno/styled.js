import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 30px;
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

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: white;
    background-color: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
