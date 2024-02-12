const baseUrl = "http://localhost:3000";

const ApiURLConstants = {
  auth: {
    signUp: `${baseUrl}/users`,
    login : `${baseUrl}/auth/login`
  },
  user: {
    getUser: `${baseUrl}/user`,
  },
};

export default ApiURLConstants;