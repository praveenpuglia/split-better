import { Friend } from '@/types';
import { myAPI } from '@/util/auth';
import { Avatar, Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

const AllFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  useEffect(() => {
    myAPI
      .auth(localStorage.AUTH_ID)
      .get('get_friends')
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.friends);
      });
  }, []);
  return (
    <Box>
      {friends.map((friend) => (
        <Box p={5} shadow="md" borderWidth="1px">
          <Avatar
            name={`${friend.first_name} ${friend.last_name}`}
            src={friend.picture.medium}
          />
          <Heading fontSize="xl">{friend.first_name}</Heading>
          <div>
            {friend.groups.map((group) => {
              return (
                <Box border="2px">
                  <Box>{`${group.group_id}`}</Box>
                  <ul>
                    {group.balance.map((balance) => {
                      return (
                        <strong key={balance.amount}>{balance.amount}</strong>
                      );
                    })}
                  </ul>
                </Box>
              );
            })}
          </div>
        </Box>
      ))}
    </Box>
  );
};
export default AllFriends;
