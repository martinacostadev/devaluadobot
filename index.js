const { Telegraf } = require("telegraf");
require("dotenv").config();
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    "Hola! Bienvenido al bot que hicimos en stream www.twitch.tv/martindevaluado"
  )
);
bot.help((ctx) => ctx.reply("Enviame un sticker :)"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("dolar", async (ctx) => {
  const dolar = await axios
    .get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((response) => {
      const dolarOficial = response.data.find(
        (res) => res.casa.nombre === "Dolar Oficial"
      );
      const dolarVenta = dolarOficial.casa.venta;
      return dolarVenta;
    })
    .catch((error) => console.log("Error de API", error));

  return ctx.reply(`El dólar está en U$S ${dolar}`);
});

bot.launch();
