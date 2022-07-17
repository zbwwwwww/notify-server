/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish, tianGou,liZhiGuYan,duiLian } = data

  let text = '早安呀，我可爱的小楠宝贝~\n'

  // 工作日/休息日，需要排除节假日
  const week = weekToday()
  console.log("week"+week);
  if (['星期六', '星期日'].includes(week)) {
     text += `
如果我小楠宝贝还没起床呀！巴库就等着小楠宝贝起床给我说早安呦🤣
嗯哼~，既然今天是${week}，就让你再睡会懒觉~下次可不能啦~😝\n`
  }
  else {
   text += `
如果我小楠宝贝已经起床啦！巴库向你说早安呦~，记得吃早饭呀😆\n
嗯哼哼~今天可是${week}哦，上班别迟到了哦~`
  }

  // 诗句
  if (songLyrics) {
    text += `\n请欣赏今日晨间情话：
  ${tianGou?.content}\n`
  }

  if(liZhiGuYan) {
    text += `请欣赏今日励志古言：
    『名言』${liZhiGuYan.saying}
    『翻译』${liZhiGuYan.transl}
    『作者』${liZhiGuYan.source}\n`
  }

  if (netEaseCloud) {
    text += `今日份网易云音乐热评：
『网易云音乐热评』${netEaseCloud.content}————${netEaseCloud.source}\n`
  }

  if (duiLian) {
    text += `每日一句经典中华文化对联：
『经典对联』${duiLian.content}\n`
  }
  
  // 每日英语
  if (dayEnglish) {
    text += `每天一句英语学习：
『每日英语』${dayEnglish.content}————${dayEnglish.note}\n`
  }

  if (oneMagazines) {
    text += `请欣赏ONE杂志语录：
『ONE杂志』${oneMagazines.word}\n`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
