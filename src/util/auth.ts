import Pizzly from 'pizzly-js';
import { AuthId, MayBe, User } from '@/types';

const pizzly = new Pizzly({ host: 'https://split-better.herokuapp.com' });
export const myAPI = pizzly.integration('splitwise');

type ConnectionStatus = boolean;
export const getAuthId = async (): Promise<MayBe<AuthId>> => {
  return myAPI
    .connect()
    .then(({ authId }) => authId)
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const checkConnection = (): Promise<ConnectionStatus> => {
  return myAPI
    .connect()
    .then(() => true)
    .catch(() => false);
};

export const getUser = async (authId: AuthId): Promise<MayBe<User>> => {
  return myAPI
    .auth(authId)
    .get('get_current_user')
    .then((res) => res.json())
    .then((data: { user: User }) => data.user)
    .catch((e) => {
      console.error(e);
      return null;
    });
};
