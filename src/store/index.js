import { createStore } from 'vuex'

export default createStore({
	state: {
		goods: []
	},
	mutations: {
		addGood(state, payload) {
			state.goods.push({
				id: Date.now(),
				...payload
			})
		},

		deleteGood(state, id) {
			state.goods = state.goods.filter(item => item.id !== id)
		}
	}
})
