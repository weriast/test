import {List} from "./List.tsx";
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 16px;
`

const App = () => {
  return <Wrapper>
    <List/>
  </Wrapper>
}

export default App
