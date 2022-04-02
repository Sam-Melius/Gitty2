const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'fake_github_user',
    photo_url: 'https://www.placecage.com/gif/300/300',
    
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };