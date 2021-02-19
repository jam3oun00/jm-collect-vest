import axios from "axios";

const actions = {
  setLoading: 'setLoading'
};
export default {
  registerUser: ({commit}, payload) => new Promise((resolve, reject) => {
    commit(actions.setLoading, true);
    axios.post('http://collectvest-staging.herokuapp.com/api/v1/users/register', payload).then(response => {
      commit(actions.setLoading, false);
      resolve(response)
    }).catch(error => {
      commit(actions.setLoading, false);
      reject(error)
    })
  })


}
