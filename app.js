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

// const flowSecundario = addKeyword(["2", "siguiente"]).addAnswer([
//   "📄 Aquí tenemos el flujo secundario",
// ]);

// const flowDocs = addKeyword([
//   "doc",
//   "documentacion",
//   "documentación",
// ]).addAnswer(
//   [
//     "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
//     "https://bot-whatsapp.netlify.app/",
//     "\n*2* Para siguiente paso.",
//   ],
//   null,
//   null,
//   [flowSecundario]
// );

// const flowTuto = addKeyword(["tutorial", "tuto"]).addAnswer(
//   [
//     "🙌 Aquí encontras un ejemplo rapido",
//     "https://bot-whatsapp.netlify.app/docs/example/",
//     "\n*2* Para siguiente paso.",
//   ],
//   null,
//   null,
//   [flowSecundario]
// );

// const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
//   [
//     "🚀 Puedes aportar tu granito de arena a este proyecto",
//     "[*opencollective*] https://opencollective.com/bot-whatsapp",
//     "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
//     "[*patreon*] https://www.patreon.com/leifermendez",
//     "\n*2* Para siguiente paso.",
//   ],
//   null,
//   null,
//   [flowSecundario]
// );

const mainFlow = addKeyword("MAIN_FLOW")
  .addAnswer("*EXPLORANDO EL MUNDO DEL MARKETING DIGITAL* 🌐")
  .addAnswer(
    "⏱️ *Duración promedio de la sesión* \n10 minutos\n\n🤖 *Tip atingi:* \n▪️Puedes retomar el aprendizaje en cualquier momento\n\n📧 *Correo para consultas:* \nsoporte@holamusa.com",
    { capture: true, buttons: [{ body: "OK" }] }
  )
  .addAnswer(
    "🚀 ¡Cuando concluyas esta sesión, estarás listo para comenzar a implementar estrategias y aumentar la presencia digital de tu negocio! 📈📊\n\n✅ Y recibirás tu constancia de participación 🏆📜.",
    {
      capture: true,
      buttons: [{ body: "¡GENIAL!" }],
    }
  );

const afterTakeName = addKeyword("AFTER_TAKE_NAME")
  .addAnswer(
    "¡Excelente! 😄 Ahora, tengo dos preguntas para registrar tus datos y poder enviarte tu constancia de participación al finalizar esta sesión de aprendizaje.",
    {
      capture: true,
      buttons: [{ body: "OK" }],
    }
  )
  .addAnswer(
    "💁‍♂️💁‍♀️ Dime, ¿con qué género te identificas?\n\n*A.* Femenino\n*B.* Masculino\n*C.* Otro\n*D.* Prefiero no decirlo\n\n✍️ *Escribe una letra entre A y D.*",
    {
      capture: true,
    }
  )
  .addAnswer(
    "😊💬 ¡Qué emoción! Ahora que conozco un poco más sobre ti, estoy feliz de embarcarnos juntos en esta emocionante aventura de aprendizaje",
    {
      capture: true,
      buttons: [{ body: "¡EMPECEMOS!" }],
    }
  )
  .addAnswer(
    "Claro que sí. ¡Bienvenid@ a esta sesión!",
    null,
    async (ctx, { gotoFlow }) => {
      if (ctx.body) {
        return gotoFlow(mainFlow);
      }
    },
    [mainFlow]
  );

const rejectedName = addKeyword("REJECTED_NAME").addAnswer(
  "🤔 No te preocupes, ¡lo resolveremos juntos! Por favor, proporciona tu nombre nuevamente para asegurarnos de que esté correcto esta vez. 😊👍",
  { capture: true },
  async (ctx, { gotoFlow }) => {
    if (ctx.body) {
      return gotoFlow(afterTakeName);
    }
  },
  [afterTakeName]
);

const flowWelcome = addKeyword("hola")
  .addAnswer(
    "🌈 ¡En este viaje de aprendizaje, estaré siempre a tu lado! 🐾💃 Soy uno de los personajes de Musa, pero en esta ocasión, llevo los colores de *atingi*. 🌟💼 🐾💃 \n\n¿Por qué me estoy pintando de los colores de atingi? Bueno, es porque en este viaje educativo, Musa y atingi se han unido para brindarte lo mejor de ambos mundos: la creatividad y la diversión de Musa con la potencia y el conocimiento de atingi. 🌟💼",
    {
      capture: true,
      buttons: [{ body: "¡GENIAL!" }],
    }
  )
  .addAnswer(
    "📱 Para que estemos más conectad@s, no olvides guardar este número en tus contactos. Ah, y por cierto, *¿cómo te llamas?* Me encantaría conocerte mejor. 👀",
    {
      capture: true,
    }
  )
  .addAnswer(
    `😁 ¡Muchas gracias, undefined! A partir de ahora, usaré ese nombre para dirigirme a ti. ¿Te parece bien?`,
    {
      capture: true,
      buttons: [{ body: "SI" }, { body: "NO" }],
    },
    async (ctx, { gotoFlow }) => {
      const acceptName = ctx.body;

      if (acceptName === "NO") {
        return gotoFlow(rejectedName);
      }
    }
  )
  .addAnswer(
    "¡Excelente! DENTRO😄 Ahora, tengo dos preguntas para registrar tus datos y poder enviarte tu constancia de participación al finalizar esta sesión de aprendizaje.",
    {
      capture: true,
      buttons: [{ body: "OK" }],
    }
  )
  .addAnswer(
    "💁‍♂️💁‍♀️ Dime, ¿con qué género te identificas?\n\n*A.* Femenino\n*B.* Masculino\n*C.* Otro\n*D.* Prefiero no decirlo\n\n✍️ *Escribe una letra entre A y D.*",
    {
      capture: true,
    }
  )
  .addAnswer(
    "😊💬 ¡Qué emoción! Ahora que conozco un poco más sobre ti, estoy feliz de embarcarnos juntos en esta emocionante aventura de aprendizaje",
    {
      buttons: [{ body: "¡EMPECEMOS!" }],
      capture: true,
    }
  )
  .addAnswer(
    "Claro que sí. ¡Bienvenid@ a esta sesión!",
    null,
    async (ctx, { gotoFlow }) => {
      return gotoFlow(mainFlow);
    },
    [rejectedName, afterTakeName, mainFlow]
  );

// const flowDiscord = addKeyword(["discord"]).addAnswer(
//   [
//     "🤪 Únete al discord",
//     "https://link.codigoencasa.com/DISCORD",
//     "\n*2* Para siguiente paso.",
//   ],
//   null,
//   null,
//   [flowSecundario]
// );

// const flowPrincipal = addKeyword(["principal"])
//   .addAnswer("🙌 Hola bienvenido a este *Chatbot*")
//   .addAnswer(
//     [
//       "te comparto los siguientes links de interes sobre el proyecto",
//       "👉 *doc* para ver la documentación",
//       "👉 *gracias*  para ver la lista de videos",
//       "👉 *discord* unirte al discord",
//     ],
//     null,
//     null,
//     [flowDocs, flowGracias, flowTuto, flowDiscord, rejectedName]
//   );

// const flujoFinal = addKeyword("imagen").addAnswer(
//   "Hola!",
//   null,
//   async (ctx, { flowDynamic }) => {
//     await flowDynamic([
//       {
//         body: "SOY UNA IMAGEN",
//         media: "https://i.imgur.com/1XEiIGq.png",
//         delay: 500,
//       },
//     ]);
//   }
// );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowWelcome]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken:
      "EAAO7cfcvkY4BO9uZBBmmMiOLliGEzuwZAnJiDW3qEAmVqJlsMDIuVrbx4IZBm56DTNOqujzF01LYZBBYjMrGS7fowwZCpMS5Pa4211KdUBkLZC7m3DJZBenpM36R9FxltCZCJgi6jwRxV421wfhDTQe6nKbKU0DG79CpfTUbiAAa9S2JZAQE7dHz4E6rh75xfaOAxTH68RYSFcZBrBxIoZD",
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
