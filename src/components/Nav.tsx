import { useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { getAuthId, getUser } from '@/util/auth';
import { MdAttachMoney } from 'react-icons/md';
import { AUTH_ID_KEY } from '@/constants';
import { AppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const authId = await getAuthId();
      if (authId) {
        const user = await getUser(authId);
        window.localStorage.setItem(AUTH_ID_KEY, authId);
        appContext.setAuthId(authId);
        appContext.setUser(user);
        navigate('/home');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loginOrMenu = () => {
    if (appContext.user) {
      return (
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              name={`${appContext.user.first_name} ${appContext.user.last_name}`}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href="/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/logout">Logout</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else {
      return (
        <Button onClick={onLogin} type="button" colorScheme="blue">
          Login
        </Button>
      );
    }
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading display="inline-flex" alignItems="center" as="h2" size="md">
            <Icon mr={2} as={MdAttachMoney}></Icon> Split Better
          </Heading>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Link alignItems="center" display="inline-flex" href="/groups">
                Groups
              </Link>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {loginOrMenu()}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
