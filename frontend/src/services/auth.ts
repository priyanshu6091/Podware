import axios from 'axios';

export class AuthService {
  static async signUp(email: string, password: string, firstname: string, lastname: string, role: string) {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
        firstname,
        lastname,
        role,
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data?.message || 'An error occurred' };
    }
  }

  static async signIn(email: string, password: string, role: string) {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
        role,
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data?.message || 'Invalid email or password' };
    }
  }

  static async signOut() {
    try {
      await axios.post('http://localhost:5000/api/auth/signout');
      return { error: null };
    } catch (error: any) {
      return { error: error.response?.data?.message || 'An error occurred' };
    }
  }
}
