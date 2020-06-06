import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log(response.data);
      return response.data;
      
    })
}

export const login = user => {
  console.log("im netering in here !");
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
   
      if(typeof response.data === "string"){
          localStorage.setItem('usertoken', response.data)
          return response.data  
      }
      else{
        return alert(response.data.msg);
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}