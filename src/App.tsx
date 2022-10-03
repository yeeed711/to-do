import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';
import { darkTheme, lightTheme } from './theme';

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}

html {
  font-size: 10px;
  font-family: 'Pretendard', sans-serif;
}

body{
  line-height: 1;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  transition: background-color 0.3s, color 0.3s;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  background-color: inherit;
}

img {
  width: 100%;
  height: auto;
}

input {
  &:focus {
    outline:none;
  }
}

.ir {
  position: absolute;
  clip: rect(0,0,0,0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow:hidden;
}

.hide {
  display: none;
}
`;

interface IIcon {
  name: string;
}

function App() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const Icon = ({ name }: IIcon) => {
    return <div className='material-icons-round'>{name}</div>;
  };

  const ToggleMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <div>hello</div>
        <ToggleBtn onClick={ToggleMode}>
          <Icon name={isDark ? 'dark_mode' : 'wb_sunny'} />
        </ToggleBtn>
      </ThemeProvider>
    </>
  );
}

export default App;

const ToggleBtn = styled.button`
  border: 2px solid #03c076;
  border-radius: 50%;
  padding: 0.9rem;
  position: absolute;
  top: 3rem;
  right: 3rem;
  color: #03c076;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  &:hover {
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);
  }
`;
