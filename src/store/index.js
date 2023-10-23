import Vue from 'vue'
import Vuex from 'vuex'
import usersApi from '../apis/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      tel: '',
      isCandidate: false,
      isCompany: false
    },
    otherUser: {
      id: -1,
      name: '',
      email: '',
      image: 'https://o.aolcdn.com/images/dar/5845cadfecd996e0372f/5d178cb92a30bc72bbc71c33e3605223945a5fa7/aHR0cDovL28uYW9sY2RuLmNvbS9oc3Mvc3RvcmFnZS9taWRhcy8yMGI5ZmMzMmNiOWRmYTJlMGMzYmZmNzA2NzZlNzJmNC8yMDI2MjQxMjEvd2FsbHBhcGVyLWZvci1mYWNlYm9vay1wcm9maWxlLXBob3RvLmpwZw==',
      tel: '',
      isCandidate: false,
      isCompany: false
    },
    userList: [

    ],
    chatMessageList: [

    ],
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    },
    setotherUser(state, otherUser) {
      state.otherUser = {
        ...state.otherUser,
        ...otherUser
      }
    },
    setUserList(state, userList) {
      state.userList = {
        ...state.userList,
        userList
      }
    },
    SOCKET_signup(state, data) {
      console.log('signup:', data);
      state.userList = data
    },
    SOCKET_signin(state, data) {
      console.log('login:', data);
      state.userList = data
    },
    SOCKET_connect(state, data) {
      state.userList = data
    },
    SOCKET_Message(state, data) {
      state.chatMessageList.push(data)
    },
    SOCKET_read(state, data) {
      state.chatMessageList = data
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
        const response = await usersApi.getCurrentUser()
        commit('setCurrentUser', {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          image: response.data.image,
          isCompany: response.data.isCompany,
          isCandidate: response.data.isCandidate
        })
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch currentuser information')
      }
    }
  },
  modules: {
  }
})
