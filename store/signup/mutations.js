export const state =()=> ({
  loading: false,
});

const mutations = {
  setLoading: (state, payload) => state.isLoading = payload,
};

export default mutations;
