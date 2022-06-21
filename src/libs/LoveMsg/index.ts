/**
 * @name loveMsg
 * @description 入口
 */
import dotenv from 'dotenv'
import { goodMorning } from './goodMorning'
import { goodAfternoon } from './goodAfternoon'
import { goodEvening } from './goodEvening'
import { drinkWater } from './drinkWater'
dotenv.config()

const { MESSAGE_TYPE } = process.env

export default function main() {
  if (MESSAGE_TYPE === 'goodAfternoon') {
    // 午安
    goodAfternoon()
  } else if (MESSAGE_TYPE === 'goodEvening') {
    // 晚安
    goodEvening()
  } else if (MESSAGE_TYPE === 'drinkWater'){
    //喝水
    drinkWater()
  } else {
    // 早安
    drinkWater()
  }
}
