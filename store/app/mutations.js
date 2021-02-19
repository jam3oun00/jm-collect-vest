export const state =()=> ({
    message: null,
    notificationDialog:false,
    notificationDialogTitle:'',
});

const mutations = {
setNotification:(state,payload)=>state.notificationDialog = payload
};

export default mutations;
