/**
 * @name drinkWater
 * @description 提醒喝水
 */
import API from '../../api/loveMsg'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  let text = '上午好呀，我的小楠宝贝~'
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
    ])

     // 工作日/休息日，需要排除节假日
     const week = weekToday()
     if (['星期六', '星期日'].includes(week)) {
      text += `
周末快乐！！！😆今天的懒觉睡的还舒服咩~😝🤣今天是${week}，起床后记得喝一大杯水噢~😝，等一会会巴库就来陪你了哦\n`
      } else {
         text += `工作辛苦啦，繁忙之余不要忘记喝水水哦~😆\n`
      }
      
     if (sayLove) {
      text += `
   ${sayLove.content}\n`
     }
    console.log('drinkWater', text)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const weatherInfo = async () => {
  try {
    const weather = await API.getWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const template = textCardTemplate({ ...weather, lunarInfo })
      console.log('weatherInfo', template)

      // 发送消息
      await wxNotify(template)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}

// goodMorning
export const goodMorning = async () => {
  await weatherInfo()
  await goodWord()
}
