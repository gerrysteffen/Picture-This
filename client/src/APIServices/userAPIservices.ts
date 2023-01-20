import { UserType } from "../types";

const root = 'http://localhost:4000';

export default {
  register: async (user: UserType) => {
    try {
      const response = await fetch(root + '/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  login: async (user: {email: string, password:string}) => {
    try {
      const response = await fetch(root + '/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email: user.email, password: user.password },
        }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    try {
      await fetch(root + '/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.log(error);
    }
  },

  refreshUser: async () => {
    try {
      const response = await fetch(root + '/user', {
        method: 'GET',
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
};
