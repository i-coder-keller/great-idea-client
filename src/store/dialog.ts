import { defineStore } from 'pinia'

export const useDialogStore = defineStore('main', {
  state: () => {
    return {
      dialogVisible: false,
      donationVisible: false,
      concatMeVisible: false
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
    },
    /**
     * 联系我弹框控制
     * @constructor
     */
    SET_CONCAT_ME_VISIBLE_STATUS() {
      this.concatMeVisible = !this.concatMeVisible
    }
  }
})
