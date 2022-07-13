import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { getAuthId, myAPI } from '@/util/auth';
import { User } from '@/types';
import { MdOutlineMoney } from 'react-icons/md';

type UserData = User | null;

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!window.localStorage.getItem('AUTH_ID');
  });
  const [authId, setAuthId] = useState(() => {
    return window.localStorage.getItem('AUTH_ID') || '';
  });
  const [user, setUser] = useState<UserData>(null);

  useEffect(() => {
    myAPI
      .auth(authId)
      .get('get_current_user')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      });
  }, []);

  const onLogin = async () => {
    const authId = await getAuthId();
    if (authId) {
      setIsLoggedIn(true);
      window.localStorage.setItem('AUTH_ID', authId);
    } else {
      setIsLoggedIn(false);
    }
  };

  const loginOrMenu = () => {
    if (user) {
      return (
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={`${user.first_name} ${user.last_name}`} />
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
          <Heading display='inline-flex' alignItems='center' as="h1" size="lg">
            <Icon mr={2} as={MdOutlineMoney}></Icon> Split Better
          </Heading>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Link alignItems='center' display='inline-flex' href='/groups'>Groups</Link>
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
