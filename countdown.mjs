// A calendar-date target, not a claim about the game's official unlock hour.
export const RELEASE_AT = Date.parse('2026-10-29T00:00:00+08:00');
export function timeRemaining(now = Date.now()) {
  const total = Math.max(0, Math.ceil((RELEASE_AT - now) / 1000));
  return { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60, released: now >= RELEASE_AT };
}
export function calendarFile() {
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Personal Countdown//Phantom Blade Zero//ZH','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:phantom-blade-zero-20261029@personal-countdown','DTSTAMP:20261012T000000Z','DTSTART;VALUE=DATE:20261029','DTEND;VALUE=DATE:20261030','SUMMARY:影之刃零 · 正式发售','DESCRIPTION:发售日提醒。实际解锁时间以官方公告为准。','URL:https://pbz.s-game.com/zh-CN/','END:VEVENT','END:VCALENDAR',''].join('\r\n');
}
