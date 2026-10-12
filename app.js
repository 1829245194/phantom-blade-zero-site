import { timeRemaining, calendarFile } from './countdown.mjs';
const $ = selector => document.querySelector(selector);
let toastTimer;
function toast(message) { const element = $('.toast'); element.textContent = message; element.classList.add('is-visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3600); }
const units = ['days', 'hours', 'minutes', 'seconds'];
let announced = false;
function tick() {
  const remaining = timeRemaining();
  for (const unit of units) { const text = String(remaining[unit]).padStart(2, '0'); if ($(`#${unit}`).textContent !== text) $(`#${unit}`).textContent = text; }
  if (remaining.released && !announced) { $('h1').innerHTML = '此刻出鞘。<br>入影江湖。'; $('.release-line').textContent = '2026 年 10 月 29 日 · 发售日已至'; $('.countdown').setAttribute('aria-label','发售日期已到达'); document.title = '影之刃零 · 发售日已至'; announced = true; }
}
tick(); setInterval(tick, 250); document.addEventListener('visibilitychange', tick);
const choices = [...document.querySelectorAll('.scene-choice')];
function setScene(index) {
  document.querySelectorAll('.backdrop').forEach((element, i) => element.classList.toggle('is-active', i === index));
  choices.forEach((element, i) => { element.classList.toggle('is-selected',i === index); element.setAttribute('aria-pressed',String(i === index)); });
  try { localStorage.setItem('pbz-scene',String(index)); } catch {}
}
choices.forEach((element,i) => element.addEventListener('click',() => setScene(i)));
try { const saved = Number(localStorage.getItem('pbz-scene')); if (Number.isInteger(saved) && saved >= 0 && saved < choices.length) setScene(saved); } catch {}
function setView(active) { document.body.classList.toggle('is-viewing',active); $('.exit-view').hidden = !active; $('.view-mode').setAttribute('aria-pressed',String(active)); $('.page').inert = active; (active ? $('.exit-view') : $('.view-mode')).focus({preventScroll:true}); }
$('.view-mode').addEventListener('click',() => setView(true)); $('.exit-view').addEventListener('click',() => setView(false));
document.addEventListener('keydown',event => { if (event.key === 'Escape' && document.body.classList.contains('is-viewing')) setView(false); });
$('.fullscreen').addEventListener('click',async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else toast('当前浏览器不支持全屏，可使用纯净观景。'); } catch { toast('暂时无法进入全屏，可使用纯净观景。'); } });
document.addEventListener('fullscreenchange',() => { const active = Boolean(document.fullscreenElement); $('.fullscreen').setAttribute('aria-label', active ? '退出全屏' : '进入全屏'); $('.fullscreen').title = active ? '退出全屏' : '进入全屏'; });
$('.calendar').addEventListener('click',() => { const blob = new Blob([calendarFile()],{type:'text/calendar;charset=utf-8'}); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = '影之刃零-2026-10-29.ics'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url),10000); toast('日历文件已下载，打开即可添加发售日提醒。'); });
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { for (let i=0;i<15;i++) { const ember=document.createElement('i'); ember.className='ember'; ember.style.cssText=`--x:${25+Math.random()*70}%;--size:${1+Math.random()*1.8}px;--duration:${10+Math.random()*15}s;--delay:${-Math.random()*25}s`; $('.embers').append(ember); } }
