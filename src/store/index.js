import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	// 是否打开折叠
	isCollapse: false
};

const getters = {
	isOpened(state) {
		return state.isCollapse
	}
}

const mutations = {
	change() {
		state.isCollapse = !state.isCollapse
	}
}

const actions = {
	change1(context) {
		context.commit('change')
	}
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});
 
export default store;