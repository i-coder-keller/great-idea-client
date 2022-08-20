import { defineStore } from 'pinia'
interface UserStore {
    token: string | null
}
export const useUserStore = defineStore('user',{
  state: ():UserStore => {
    return {
      token: null
    }
  },
  actions: {
    /**
     * 保存token
     */
    SET_USER_TOKEN(token: string) {
      this.token = token
    }
  }
})
