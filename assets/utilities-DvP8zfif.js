import{D as e}from"./DemoBlock-Dh67CGSb.js";import{d,o as l,b as n,e as i,w as a,a as t,_ as c}from"./index-C84iVYcc.js";const o={class:"container-column"},r=`
\`\`\`html
<div class="flex justify-between items-center gap-4">
  <div class="box">左</div>
  <div class="box">中</div>
  <div class="box">右</div>
</div>
\`\`\`
`,m='\n```html\n<div class="padding-rem bg-primary-light radius-half-rem">padding-rem 内边距</div>\n<div class="mt-4 padding-rem bg-success radius-half-rem">mt-4 上外边距</div>\n```\n',x=`
\`\`\`html
<div class="flex gap-4">
  <div class="box bg-primary text-white">bg-primary</div>
  <div class="box bg-success text-white">bg-success</div>
  <div class="box bg-danger text-white">bg-danger</div>
  <div class="box bg-info text-white">bg-info</div>
  <div class="box bg-warning text-white">bg-warning</div>
</div>
<span class="text-muted">text-muted 次要文字</span>
\`\`\`
`,g='\n```html\n<h1 class="text-2xl font-bold text-center">居中加粗标题</h1>\n<p class="text-sm text-muted">text-sm text-muted 说明文字</p>\n```\n',p=`
\`\`\`html
<div class="d-flex">display: flex</div>
<div class="position-relative">relative 定位容器</div>
<div class="hidden-768">仅桌面端显示</div>
<div class="show-768">仅移动端显示</div>
\`\`\`
`,v=d({name:"StylesUtilities",__name:"utilities",setup(b){return(u,s)=>(l(),n("div",o,[i(e,{title:"布局工具类",code:r},{default:a(()=>[...s[0]||(s[0]=[t("div",{class:"flex justify-between items-center gap-4 w-100"},[t("div",{class:"box"},"左"),t("div",{class:"box"},"中"),t("div",{class:"box"},"右")],-1)])]),_:1}),i(e,{title:"间距工具类",code:m},{default:a(()=>[...s[1]||(s[1]=[t("div",{class:"container-column gap-4"},[t("div",{class:"padding-rem bg-primary-light radius-half-rem"}," padding-rem 内边距 "),t("div",{class:"mt-4 padding-rem bg-success radius-half-rem"}," mt-4 上外边距 ")],-1)])]),_:1}),i(e,{title:"颜色工具类",code:x},{default:a(()=>[...s[2]||(s[2]=[t("div",{class:"container-column gap-4"},[t("div",{class:"flex flex-wrap gap-4"},[t("div",{class:"box bg-primary text-white"},"bg-primary"),t("div",{class:"box bg-success text-white"},"bg-success"),t("div",{class:"box bg-danger text-white"},"bg-danger"),t("div",{class:"box bg-info text-white"},"bg-info"),t("div",{class:"box bg-warning text-white"},"bg-warning")]),t("div",null,[t("span",{class:"text-primary font-semibold"},"text-primary 主色文字"),t("span",{class:"text-muted"},"text-muted 次要文字")])],-1)])]),_:1}),i(e,{title:"排版工具类",code:g},{default:a(()=>[...s[3]||(s[3]=[t("div",{class:"container-column gap-4"},[t("h1",{class:"text-2xl font-bold text-center"},"居中加粗标题"),t("p",{class:"text-sm text-muted text-center"}," text-sm text-muted 说明文字 "),t("p",{class:"text-xl font-light"},"text-xl font-light 大号细体")],-1)])]),_:1}),i(e,{title:"显示 / 响应式",code:p},{default:a(()=>[...s[4]||(s[4]=[t("div",{class:"container-column gap-4"},[t("div",{class:"d-flex gap-4"},[t("span",{class:"d-inline-block padding-rem bg-primary-light radius-half-rem"}," d-inline-block "),t("span",{class:"d-inline-block padding-rem bg-primary-light radius-half-rem"}," d-inline-block ")]),t("div",{class:"padding-rem bg-warning radius-half-rem"}," 使用浏览器宽度 < 768px 可看到 hidden-768 隐藏、show-768 显示效果 ")],-1)])]),_:1})]))}}),w=c(v,[["__scopeId","data-v-f6c090c4"]]);export{w as default};
