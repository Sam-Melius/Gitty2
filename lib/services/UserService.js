const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {
    let githubProfile;
    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then((profile) => {
        githubProfile = profile;
        return GithubUser.findByUsername(profile.username);
      }) 
      
      .then((user) => {
        if (!user) {
          return GithubUser.insert(githubProfile);
  
        } else {return user;}
        
      });
    
   
  }
  // static async create(code) {
  //   const token = await exchangeCodeForToken(code);
  //   const profile = await getGithubProfile(token);
  //   let user = await GithubUser.findByUsername(profile.username);
    
  //   if(!user) {
  //     user = await GithubUser.insert(profile);
  //   }
  //   return user;
  // }
  
    
};
