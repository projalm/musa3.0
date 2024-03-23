const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
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

const flowPrincipal = addKeyword(["hola", "ole", "alo"])
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
  const adapterFlow = createFlow([flowPrincipal]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken:
      "EAAO7cfcvkY4BOyDyrYuBba1oZBQJBLoQlr3A4mL7cSgJIIHPtoy3ocoUq2uAielXu6Bsl6qEqXd5S5tOXtTz0pWCYiTF7sh4zZAXm2gQHduQHMZCiRDK3sByBjiIsndWoVIwZBsfmFcjIh9fYMntegedZBghG0Ktq0Bj3HlGNKlaVNgz7uiGkeagHrkKRGH3HjzokAgZBKl3TRSa8b",
    numberId: "244396062094814",
    verifyToken: "LOQUESEA",
    version: "v16.0",
  });
  // const adapterProvider = createProvider(TwilioProvider, {
  //   accountSid: process.env.ACC_SID, //AC4695aa720b4d700a***************
  //   authToken: process.env.ACC_TOKEN, //3f6fae09f7a1c3534***************
  //   vendorNumber: process.env.ACC_VENDOR, //+14155238886
  // });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
