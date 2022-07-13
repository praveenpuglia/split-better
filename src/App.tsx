import Nav from '@/components/base/Nav';
import { Icon } from '@chakra-ui/react';
import AllFriends from './components/friends/AllFriends';
import { MdGroups } from 'react-icons/md';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      {/* <AllFriends></AllFriends> */}
      <Icon as={MdGroups}></Icon>
    </div>
  );
}

export default App;
