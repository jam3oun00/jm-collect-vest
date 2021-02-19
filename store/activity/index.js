const state = () => ({
  assetHoldings: [],
  requests: [],
  transactions: [],
  activityLog: [],
  search:'',
});

const mutations = {
  setAssetHoldings: (state, payload) => (state.assetHoldings = payload),
  setRequests: (state, payload) => (state.requests = payload),
  setTransactions: (state, payload) => (state.transactions = payload),
  setActivityLogs: (state, payload) => (state.activityLog = payload),
  setSearch:(state,payload)=>state.search = payload
};
export default { state, mutations };
