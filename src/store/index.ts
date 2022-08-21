import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      dialogVisible: false,
      donationVisible: false
    }
  },
  actions: {
    /**
     * 修改弹框是否展示
     */
    SET_DIALOG_VISIBLE_STATUS() {
      this.dialogVisible = !this.dialogVisible
    },
    /**
     * 捐赠弹框控制
     * @constructor
     */
    SET_DONATION_VISIBLE_STATUS() {
      this.donationVisible = !this.donationVisible
    }
  }
})
