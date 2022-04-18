import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sideBarOpen: false,
        user: {}
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        },
        getUser: state => {
            return state.user
        }
    },
    mutations: {
        toggleSidebar(state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        initUser(state, user) {
            state.user = user
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        },
        initUser(context) {
            // 세션 or 쿠키에서 유저 정보가 남아있는지 확인 
            // 있으면 정보 store에 저장해줌 
            // 없으면 끝
            context.commit('initUser')
        },
        setUser(context, user) {
            context.commit('setUser', user)
        }
    }
})
