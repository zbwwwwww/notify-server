/**
 * @name drinkWater
 * @description 提醒喝水
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { weekToday ,halfDayJudge} from '../../utils/dayjs'
// 美丽短句
const remindDrinkWater = async () => {
  const halfDay = halfDayJudge()
  const [diff,shangxiawu] = halfDay
  console.log("shangxiawu:"+shangxiawu)
  let text = `${shangxiawu}好呀，我的小楠宝贝☀️ ~`
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getJoke(2), // 雷人笑话
    ])
    // 过滤掉异常数据
    const [sayLove, caiHongpi, joke]:any= dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))
    // 工作日/休息日，需要排除节假日
    const week = weekToday()
     if (['星期六', '星期日'].includes(week)) {
       if('上午'==shangxiawu){
         text += `周末快乐！！！😆今天的懒觉睡的还舒服咩~😝🤣今天是${week}，起床后记得喝一大杯水噢~😝，等一会会巴库就来陪你了哦!`
         if (caiHongpi) {
          text += `周末彩虹屁来啦😘: \n${caiHongpi.content}\n`
         }
       } else {
        text += `中午吃的什么好吃的呀！！！😝记得午睡起床后记得喝一大杯水噢~😝，晚上巴库来和你一起走走路噢！😘`
       }
        
      } else {
         text += `工作辛苦啦，繁忙之余不要忘记喝水水哦~😆\n`
          if('上午' == shangxiawu && sayLove) {
            text += `放松一下，今日份土味情话请查收😘: \n${sayLove.content}\n`
          } else if ('下午'==shangxiawu && joke) {
            text +=`还有${diff}分钟就要下班了噢，来听听笑话放松下吧！😘\n`
            text += ` ${joke.map( n => `『${n.title}』${n.content}`).join('\n')}`
            
          }
         
      }
      const template = {
        msgtype: 'text',
        text: {
          content: text,
        },
      }
      console.log('drinkWater', template)
//      wxNotify(template)
  } catch (error) {
    console.log('drinkWater:err', error)
  }
}

// drinkWater
export const drinkWater = async () => {
  await remindDrinkWater()
}
