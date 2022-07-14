import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationEn = {
  colin: "Colin",
  zhoajing: "Zhoa Jing",
  title: "Colin Jing",
  willyoubeattending: "RSVP",
  invitedby: "invited by",
  name: "Name",
  submit: "Submit",
  rsvpwithmorecompany: "RSVP with more company?",
  addguest: "Add Guest",
  howtogo: "How to go?",
  clickonmarker: "Click on marker to get directions from google map!",
  anyquestions: "Any questions?",
  rsvp: "RSVP",
  required: "Required",
  tooshort: "Too Short!",
  toolong: "Too Long!",
  onlyalphabetscharacters: "Only alphabets are allowed for this field",
  accept: "Accept",
  decline: "Decline",
  description1:
    "We would like to thank you for taking your time to respond. Venue of our wedding will be at",
  thankyou: "Thank you",
  thankyoumessage:
    "Thank you for responding and see you at <bold>{{address}}</bold> on the <bold>{{datetime}}</bold>!",
  byebyemessage: "Thank you for responding and well wishes!",
  schedule: "Schedule",
};
const translationCn = {
  colin: "李宋浩",
  zhoajing: "吴昭静",
  title: "岁月静浩",
  willyoubeattending: "请问您是否会出席此次邀请?",
  invitedby: "受邀于",
  accept: "出席",
  decline: "不出席",
  name: "姓名",
  submit: "提交",
  rsvpwithmorecompany: "如有携带家属或伴侣，请在下方列出他们的名",
  addguest: "添加",
  howtogo: "Venue 婚礼地点",
  clickonmarker: "Click on marker to get directions from google map!",
  anyquestions: "Contact us 联络",
  rsvp: "RSVP 出席",
  required: "必须填",
  tooshort: "太短",
  toolong: "太长",
  onlyalphabetscharacters: "只可以打华语或英文",
  description1: "谢谢您抽空来出席我们的婚礼，<br/> 婚礼地点是在",
  thankyou: "谢谢",
  thankyoumessage:
    "感谢您的回应 我们 <bold>{{datetime}}</bold> 在 <bold>{{address}}</bold> 见！",
  byebyemessage: "谢谢您的回应",
  schedule: "Schedule 流程表",
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    cn: { translation: translationCn },
  },
  lng: "en",
  fallbackLng: "cn",
  interpolation: { escapeValue: false },
});

export { i18n };
