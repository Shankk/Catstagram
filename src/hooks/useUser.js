import { useContext } from 'react';
import { UserContext } from '../components/utility/UserGet';

export const useUser = () => useContext(UserContext);