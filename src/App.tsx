import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { useRecoilValue } from 'recoil';
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

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <div>hello</div>
      </ThemeProvider>
    </>
  );
}

export default App;
