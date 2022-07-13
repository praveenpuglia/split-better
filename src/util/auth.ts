import Pizzly from 'pizzly-js';
const pizzly = new Pizzly({ host: 'https://split-better.herokuapp.com' });
export const myAPI = pizzly.integration('splitwise');

type AuthId = string | null;
type ConnectionStatus = boolean;
export const getAuthId = async (): Promise<AuthId> => {
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
