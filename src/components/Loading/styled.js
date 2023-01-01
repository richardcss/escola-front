import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }

  span {
    width: 70px;
    height: 70px;
    border: 5px solid white;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: loading 1.1s cubic-bezier(0.35, 0.55, 0.65, 0.4) infinite;
    z-index: 2;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
