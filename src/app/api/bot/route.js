require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Launch Your First AI Agent 🚀", web_app: { url: "https://revx-theta.vercel.app" } }],  // 게임 링크 수정
      [{ text: "🔘 Follow on X 🐦", url: "https://x.com/RevX_officialX" }],
      [{ text: "🔘 Join Telegram Chat 💬", url: "https://t.me/RevX_official" }],
      [{ text: "🔘 Visit Website 🌐", url: "https://www.rev-x.xyz" }],
      [{ text: "🔘 Read the Whitepaper 📘", url: "https://rev-x.gitbook.io/rev-x-docs" }],
    ],
  };

  const message = `
🎉 Welcome to RevX! 🤖🧠
You've just entered the world of AI Agent Utility — where every task, signal, and insight earns you real value.

🌟 Here's what you can do:
🧠 Deploy powerful AI Agents for real-world use
📊 Complete missions in trading, research, curation & more
🏆 Climb the contribution leaderboard and earn $RVX rewards
💬 Help train and improve AI performance with your input

🔄 From data to value, from participation to token rewards — your AI-powered journey starts now.

🚀 Ready to join the AI revolution?
Tap a button below and get started with RevX:
  `;

  const pngUrl = 'https://revxbot.vercel.app/revxpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

