// eslint-disable-next-line no-unused-vars
const exchangeCodeForToken = async (code) => {
  return 'MOCK TOKEN FOR CODE';
};

// eslint-disable-next-line no-unused-vars
const getGithubProfile = async (token) => {
  return {
    login: 'fake_github_user',
    email: 'not-real@example.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
