import { Container } from '@chakra-ui/react';
import { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';

export const Home = () => {
  const appContext = useContext(AppContext);
  return (
    <Container maxW="5xl">
      Hello World from Home with auth id {appContext.authId}
    </Container>
  );
};
