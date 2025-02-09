import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(duration)
dayjs.extend(LocalizedFormat)

const WEEKS: { [key: number]: string } = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期日',
}

export const weekToday = () => {
  let hour = dayjs().hour();
  let week =dayjs().day();
  if(hour<24 && hour >20){
    week+=1; 
  }
  console.log("dayjs.hour()"+hour);
  console.log("dayjs.day()"+week);
  return WEEKS[week]
}
export const halfDayJudge  = () => {
  const hour = dayjs().hour()+8
  const minute = dayjs().minute()
  const diff = (new Date(null, null, null, 17, 30) - new Date(null, null, null, hour, minute)) / 60000
  console.log('dayjs():hour' +hour)
  console.log('diff:'+diff)
  const shangxiawu = hour<12? '上午':'下午'
  const data:any = [diff,shangxiawu]
  return data
}

export default dayjs
