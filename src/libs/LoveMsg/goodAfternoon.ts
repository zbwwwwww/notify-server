/**
 * @name goodAfternoon
 * @description 说午安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { newsTemplate } from './templates/news'


// 获取新闻
const getNews = async() => {
  try {
    // 每日简报
    // const dailyBriefing = await API.getDailyBriefing()
    // const formateData: TodayHeadlines[] = dailyBriefing.map((n) => ({
    //   ...n,
    //   title: n.title,
    //   description: n.digest,
    //   picUrl: n.imgsrc,
    //   ctime: n.mtime,
    // }))
    // 今日头条
    const todayTopNews = await API.getTianTopNews()
    console.log('todayTopNews', todayTopNews.length)

    // 每次信息最多8个
    // 设定发送两次一共16个信息，数据如果不够则请求另一个接口
    let result: any = []
    const len = todayTopNews.length

    if (len >= 8) {
      // 只取前8条
      result = todayTopNews.slice(0, 8)
    }
      const template = newsTemplate(result)
      await wxNotify(template)
  }
  catch (error) {
    console.log('goodEvening', error)
  }
}
export const goodAfternoon = async() => {
  await getNews()
  let text = '小楠宝贝，今日份午安来喽:'

  text += `
午睡前让我们来看看今日发生了哪些国家大事呢，请阅读以上今日头条新闻↑😝\n`
  const template = {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
  await wxNotify(template)
  
}
