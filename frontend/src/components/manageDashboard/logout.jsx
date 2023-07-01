import axios from 'axios';

export const logout = () =>{
  return axios.get('https://flavor-fusion-ylnk.onrender.com/logout')
    .then((response) => {
      return window.location.replace('/');
    })
    .catch((error)=>{
      throw new Error('Logout failed');
    });
};