import { defineStore } from "pinia"
type Handle<T> = (...args:T[])=>T
interface TaskQueue<T> {
    Queue: Handle<T>[]
}
export const useTaskQueue =defineStore('taskQueue', {
  state: (): TaskQueue<any> => {
    return {
      Queue: []
    }
  },
  actions: {
    /**
       * 增加任务队列
       * @param handle
       * @constructor
       */
    ADD_TASK_QUEUE(handle: Handle<any>) {
      this.Queue.push(handle)
    },
    /**
       * 执行任务队列
       * @constructor
       */
    PERFORM_TASK_QUEUE() {
      this.Queue.forEach(async (handle: Handle<any>) => {
        await handle()
      })
    },
    /**
       * 弹出任务队列最后一项返回不执行
       * @constructor
       */
    POP_TASK_QUEUE() {
      return this.Queue.pop()
    },
    /**
       * 弹出任务队列第一项
       * @constructor
       */
    SHIFT_TASK_QUEUE() {
      return this.Queue.shift()
    }
  }
})
