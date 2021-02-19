const state = () => ({
  loading: false,
  formData: {},
  wishList: [],
  wallet: {},
  currentUser: {},
  bankAccount: {},
});

const mutations = {
  setLoading: (state, payload) => state.isLoading = payload,
  setWishList: (state, payload) => state.wishList = payload,
  setWallet: (state, payload) => state.wallet = payload,
  setCurrentUser: (state, payload) => state.currentUser = payload,
  setBankAccount: (state, payload) => state.bankAccount = payload,
  setFormData: (state, payload) => {
    state.formData = state.formData || {};
    state.formData = {
      ...state.formData,
      [payload.name]: payload.value
    }
  }
};

export default {state, mutations};
