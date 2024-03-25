const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  addAnswer,
} = require("@bot-whatsapp/bot");

const MetaProvider = require("@bot-whatsapp/provider/meta");
const MockAdapter = require("@bot-whatsapp/database/mock");
// const TwilioProvider = require("@bot-whatsapp/provider/twilio");

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

let dataUser;

const flowSecundario = addKeyword(["2", "siguiente"]).addAnswer([
  "📄 Aquí tenemos el flujo secundario",
]);

const flowDocs = addKeyword([
  "doc",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
    "https://bot-whatsapp.netlify.app/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowTuto = addKeyword(["tutorial", "tuto"]).addAnswer(
  [
    "🙌 Aquí encontras un ejemplo rapido",
    "https://bot-whatsapp.netlify.app/docs/example/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowWelcome = addKeyword("hola")
  .addAnswer(
    "🌈 ¡En este viaje de aprendizaje, estaré siempre a tu lado! 🐾💃 Soy uno de los personajes de Musa, pero en esta ocasión, llevo los colores de *atingi*. 🌟💼 🐾💃 \n\n¿Por qué me estoy pintando de los colores de atingi? Bueno, es porque en este viaje educativo, Musa y atingi se han unido para brindarte lo mejor de ambos mundos: la creatividad y la diversión de Musa con la potencia y el conocimiento de atingi. 🌟💼",
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
      buttons: [{ body: "¡GENIAL!" }],
      capture: true,
    }
  )
  .addAnswer(
    "📱 Para que estemos más conectad@s, no olvides guardar este número en tus contactos. Ah, y por cierto, *¿cómo te llamas?* Me encantaría conocerte mejor. 👀",
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
      capture: true,
    },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ name: ctx.body });
      dataUser = state.get("name");
      // await flowDynamic(
      //   `😁 ¡Muchas gracias, ${myState.name}! A partir de ahora, usaré ese nombre para dirigirme a ti. ¿Te parece bien?`,
      //   {
      //     // media: "https://i.imgur.com/0HpzsEm.png",
      //     buttons: [{ body: "SI" }, { body: "NO" }],
      //     capture: true,
      //   }
      // );
    }
  )
  .addAnswer(
    `😁 ¡Muchas gracias, ${dataUser}! A partir de ahora, usaré ese nombre para dirigirme a ti. ¿Te parece bien?`,
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
      buttons: [{ body: "SI!" }, { body: "NO" }],
      capture: true,
    },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const acceptName = ctx.body;

      if (acceptName === "SI") {
        await gotoFlow(rejectedName);
      }
    }
  )
  .addAnswer(
    "¡Excelente! 😄 Ahora, tengo dos preguntas para registrar tus datos y poder enviarte tu constancia de participación al finalizar esta sesión de aprendizaje.",
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
      buttons: [{ body: "OK" }],
      capture: true,
    }
  )
  .addAnswer(
    "💁‍♂️💁‍♀️ Dime, ¿con qué género te identificas?\n\n*A.* Femenino\n*B.* Masculino\n*C.* Otro\n*D.* Prefiero no decirlo\n\n✍️ *Escribe una letra entre A y D.*",
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
      capture: true,
    }
  )
  .addAnswer(
    "😊💬 ¡Qué emoción! Ahora que conozco un poco más sobre ti, estoy feliz de embarcarnos juntos en esta emocionante aventura de aprendizaje",
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
      buttons: [{ body: "¡EMPECEMOS!" }],
      capture: true,
    }
  )
  .addAnswer(
    "Claro que sí. ¡Bienvenid@ a esta sesión!",
    {
      // media: "https://i.imgur.com/0HpzsEm.png",
    },
    null,
    async (ctx, { flowDynamic, gotoFlow }) => {
      await gotoFlow(mainFlow);
    }
  );

const mainFlow = addKeyword("MAIN_FLOW")
  .addAnswer("*EXPLORANDO EL MUNDO DEL MARKETING DIGITAL* 🌐")
  .addAnswer(
    "⏱️ *Duración promedio de la sesión* \n10 minutos\n\n🤖 *Tip atingi:* \n▪️Puedes retomar el aprendizaje en cualquier momento\n\n📧 *Correo para consultas:* \nsoporte@holamusa.com",
    { buttons: [{ body: "OK" }] }
  );

const rejectedName = addKeyword("REJECTED_NAME").addAnswer(
  "🤔 No te preocupes, ¡lo resolveremos juntos! Por favor, proporciona tu nombre nuevamente para asegurarnos de que esté correcto esta vez. 😊👍",
  { capture: true },
  null,
  [flowWelcome]
);

const flowDiscord = addKeyword(["discord"]).addAnswer(
  [
    "🤪 Únete al discord",
    "https://link.codigoencasa.com/DISCORD",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowPrincipal = addKeyword(["principal"])
  .addAnswer("🙌 Hola bienvenido a este *Chatbot*")
  .addAnswer(
    [
      "te comparto los siguientes links de interes sobre el proyecto",
      "👉 *doc* para ver la documentación",
      "👉 *gracias*  para ver la lista de videos",
      "👉 *discord* unirte al discord",
    ],
    null,
    null,
    [flowDocs, flowGracias, flowTuto, flowDiscord]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowWelcome]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken:
      "EAAO7cfcvkY4BOz5D0QqZCQMYEGYs7ZB5mmsxBbdjDqAiB1VXeWAI5ujXHqaPNv8Xixqyjw01YeKZC5BEAwZCpQwAarx9Mip1o4wFinEq3bLmz1znmXZBXIVMGbpXMiXjloJszmnwk09eFc8ShIY2CN6fx2HBz5ry3ZBgV9MXNrmRHdK19BEvdifNpFvEa78G9FaXfOmKhm16jHl00ZD",
    numberId: "244396062094814",
    verifyToken: "loquesea",
    version: "v16.0",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
