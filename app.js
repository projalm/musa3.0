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

const typeOfMessage = addKeyword("media")
  .addAnswer(
    "ESCRIBIR CUALQUIER COSA PARA CONTINUAR POR CADA TIPO DE MENSANE MOSTRADO",
    { capture: true, buttons: [{ body: "OK" }] },
    async (ctx, ctxFn) => {
      const id = ctx.from;
      const file =
        "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf";
      await ctxFn.provider.sendMedia(
        (number = id),
        (text = ""),
        (mediaInput = file)
        // (captionMessage = `PDF file: ${file}`)
      );

      return await ctxFn.flowDynamic([
        "PDF",
        { delay: 1500, buttons: [{ body: "OK" }] },
      ]);
      // await flowDynamic([
      //   "Enviando",
      //   {
      //     body: "PDF File",
      //     media:
      //       "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf",
      //     delay: 500,
      //   },
      // ]);
    }
  )
  .addAction({ capture: true }, async (ctx, ctxFn) => {
    const id = ctx.from;
    const file = "https://bot-whatsapp.netlify.app/videos/console.mp4";
    await ctxFn.provider.sendMedia(
      (number = id),
      (text = ""),
      "https://bot-whatsapp.netlify.app/videos/console.mp4"

      // (captionMessage = `PDF file: ${file}`)
    );
    return await ctxFn.flowDynamic([
      "VIDEO",
      { delay: 1500, buttons: [{ body: "OK" }] },
    ]);
    // await flowDynamic([
    //   "Enviando",
    //   {
    //     body: "PDF File",
    //     media:
    //       "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf",
    //     delay: 500,
    //   },
    // ]);
  })
  .addAction({ capture: true }, async (ctx, ctxFn) => {
    const id = ctx.from;
    await ctxFn.provider.sendContacts(
      (number = id),
      [
        {
          name: "Jose Leon",
          first_name: "FDSFD",
          last_name: "FDS",
          middle_name: "",
          suffix: "",
          prefix: "",
          birthday: "",
          phones: [{ phone: "5190653829", wa_id: "", type: "" }],
          emails: [{ email: "correo@corre.com", type: "" }],
          company: "",
          department: "",
          title: "",
          urls: [{ url: "", type: "" }],
          addresses: [
            {
              street: "",
              city: "",
              state: "",
              zip: "",
              country: "",
              country_code: "",
              type: "",
            },
          ],
        },
      ]
      // (captionMessage = `PDF file: ${file}`)
    );
    return await ctxFn.flowDynamic([
      "CONTACTO",
      { delay: 1500, buttons: { body: "OK" } },
    ]);
    // await flowDynamic([
    //   "Enviando",
    //   {
    //     body: "PDF File",
    //     media:
    //       "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf",
    //     delay: 500,
    //   },
    // ]);
  })
  .addAction({ capture: true }, async (ctx, ctxFn) => {
    const id = ctx.from;
    await ctxFn.provider.sendLocation(
      (number = id),
      {
        long_number: -12.136634097758094,
        lat_number: -76.98518454665098,
        name: "Surco",
        address: "Jr. Monte Ebano 364, Lima 15039",
      }
      // (captionMessage = `PDF file: ${file}`)
    );
    // await flowDynamic([
    //   "Enviando",
    //   {
    //     body: "PDF File",
    //     media:
    //       "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf",
    //     delay: 500,
    //   },
    // ]);
    return await ctxFn.flowDynamic([
      "Ubicacion",
      { delay: 1500, buttons: { body: "OK" }, capture: true },
    ]);
  })
  .addAnswer(
    `Son todos por el momento, proximamente mas`,
    null,
    (ctx, { gotoFlow }) => {
      return gotoFlow(mainMenu);
    }
  );

// addAnswer(
// "Hola!",
// {
//   media:
//     "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf",
// }
// null,
// async (ctx, { provider }) => {
//   const number = ctx.from;
//   console.log(provider);
//   try {
//     await provider.sendMedia(number, {
//       document: {
//         url: "https://download.nikonimglib.com/archive2/payY500AHbkQ02bXMhb14TZo4978/D3300_NT(En)02.pdf",
//         fileName: "titulo",
//         mimeType: "application/pdf",
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// );

const resetAll = addKeyword(["reiniciar", "Reiniciar", "REINICIAR"]).addAnswer(
  "🤓De acuerdo, volvamos al inicio de todo ⏪",
  null,
  (ctx, { gotoFlow }) => {
    return gotoFlow(flowWelcome);
  }
);

const mainMenu = addKeyword("salir").addAnswer(
  "🤓💬 ¿A qué ruta te gustaría acceder hoy? \n\n1️⃣ Curso Principal\n2️⃣Tipos de Mensajes\n\n✍️ *Escribe un número*",
  {
    capture: true,
  },
  (ctx, { fallBack, gotoFlow }) => {
    if (ctx.body !== "1" && ctx.body !== "2") {
      return fallBack();
    } else if (ctx.body === "1") {
      return gotoFlow(mainFlow);
    } else if (ctx.body === "2") {
      return gotoFlow(typeOfMessage);
    }
  }
);

const mainFlow = addKeyword("MAIN_FLOW")
  .addAnswer("*EXPLORANDO EL MUNDO DEL MARKETING DIGITAL* 🌐")
  .addAnswer(
    "⏱️ *Duración promedio de la sesión* \n10 minutos\n\n🤖 *Tip atingi:* \n▪️Puedes retomar el aprendizaje en cualquier momento\n\n📧 *Correo para consultas:* \nsoporte@holamusa.com",
    { capture: true, buttons: [{ body: "OK" }] }
  )
  .addAnswer(
    "🚀 ¡Cuando concluyas esta sesión, estarás listo para comenzar a implementar estrategias y aumentar la presencia digital de tu negocio! 📈📊\n\n\n✅ Y recibirás tu constancia de participación 🏆📜.",
    {
      capture: true,
      buttons: [{ body: "¡GENIAL!" }],
    }
  )
  .addAnswer(
    "😁💬 ¿Alguna vez te has preguntado cómo las empresas pueden llegar a tanta gente en línea y lograr que sus productos y servicios destaquen en un mundo digital abrumador? \n\n*A.* ¡Sí, siempre he tenido curiosidad sobre eso!\n*B.* No, nunca me lo había planteado.",
    {
      capture: true,
      buttons: [{ body: "A" }, { body: "B" }],
    },
    async (ctx, { flowDynamic, fallBack }) => {
      if (ctx.body === "A") {
        await flowDynamic(
          "Entiendo, hoy vamos a despejar todas tus dudas y nos adentrarnos en el mundo del marketing digital. Descubriremos cómo puede permitirnos llegar a una audiencia amplia y obtener beneficios sorprendentes. 😊🌐🚀"
        );
      } else if (ctx.body === "B") {
        await flowDynamic(
          "¡No hay problema! Estás a punto de explorar qué es el marketing digital y cómo permite a las empresas alcanzar una amplia audiencia y obtener muchos beneficios"
        );
      } else {
        return fallBack();
      }
    }
  )
  .addAnswer(
    "anteriormente, el marketing se hacía por medios tradicionales como anuncios en periódicos, revistas, vallas publicitarias, radio y televisión. 📰📺\n\nSin embargo, en la era digital actual, el marketing ha experimentado una transformación significativa. 🌐 Pues se ha movido en gran medida hacia el ámbito digital.",
    { capture: true, buttons: [{ body: "¡ES CIERTO!" }] }
  )
  .addAnswer(
    "Ha llegado el momento de poner en práctica todo lo que hemos aprendido hoy. ¡Vamos a hacerlo junt@s! 🚀📚💪",
    { capture: true, buttons: [{ body: "¡EMPECEMOS!" }] }
  )
  .addAnswer(
    "😁💬 *¿Qué es el marketing digital y en qué se diferencia del marketing tradicional?*\n\n*A)* El marketing digital se basa únicamente en anuncios en televisión, mientras que el marketing tradicional se enfoca en anuncios en línea.\n\n*B)* El marketing digital utiliza canales y estrategias en línea para promocionar productos o servicios, mientras que el marketing tradicional se basa en anuncios impresos y medios tradicionales.\n\n*C)* El marketing digital es más costoso que el marketing tradicional.",
    { capture: true, buttons: [{ body: "A" }, { body: "B" }, { body: "C" }] },
    async (ctx, { flowDynamic, fallBack, globalState }) => {
      if (ctx.body === "B") {
        await globalState.update({ points: 1 });
        await flowDynamic("¡Correcto! 👍🏼🎊");
      } else if (ctx.body === "A" || ctx.body === "C") {
        await flowDynamic(
          "🔄 La respuesta correcta es la B😁💬 *Continuemos.*"
        );
      } else {
        return fallBack();
      }
    }
  )
  .addAnswer(
    "😎 *¿Cuál de las siguientes no es una ventaja del marketing digital?*\n\n*A)* Mayor alcance\n*B)* Resultados mensurables\n*C)* Experiencia táctil y sensorial",
    { capture: true, buttons: [{ body: "A" }, { body: "B" }, { body: "C" }] },
    async (ctx, { flowDynamic, fallBack, globalState }) => {
      if (ctx.body === "C") {
        let data = globalState.get("points");
        await globalState.update({ points: +data + 1 });
        await flowDynamic("¡Correcto! 👍🏼🎊");
      } else if (ctx.body === "A" || ctx.body === "B") {
        await flowDynamic(
          "🔄 La respuesta correcta es la C😁💬 *Continuemos.*"
        );
      } else {
        return fallBack();
      }
    }
  )
  .addAnswer(
    "👌 *¿Cuál de las siguientes estrategias de marketing digital se centra en compartir contenido valioso, como blogs, videos y más, para atraer a la audiencia?*\n*A)* Marketing en Redes Sociales\n*B)* Marketing de Afiliados\n*C)* Marketing de Contenidos",
    { capture: true, buttons: [{ body: "A" }, { body: "B" }, { body: "C" }] },
    async (ctx, { flowDynamic, fallBack, globalState }) => {
      if (ctx.body === "C") {
        let data = globalState.get("points");
        await globalState.update({ points: +data + 1 });
        await flowDynamic("¡Correcto! 👍🏼🎊");
      } else if (ctx.body === "A" || ctx.body === "B") {
        await flowDynamic(
          "🔄 ${user.name}, la respuesta correcta es la C😁💬 *Continuemos.*"
        );
      } else {
        return fallBack();
      }
    }
  )
  .addAction(async (_, { flowDynamic, globalState }) => {
    const points = globalState.get("points");
    await flowDynamic(`🤩 ¡OK!  Has acertado ${points} de 3 preguntas.`);
  })
  .addAnswer(
    "🥳 Gracias por tu participación.\n\n🟩🟩🟩🟩🟩🟩 👾",
    { capture: true, buttons: [{ body: "CONTINUAR" }] },
    (_, { gotoFlow }) => {
      return gotoFlow(mainMenu);
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
      console.log(ctx);
      return gotoFlow(afterTakeName);
    }
  },
  [afterTakeName]
);

const flowWelcome = addKeyword(["hola", "Hola", "HOLA"])
  .addAnswer(
    "Imagen",
    {
      // capture: true,
      media:
        "https://testbotmusa.blob.core.windows.net/img-chatbot/atingiWelcomeOne.jpg",
    }
    // async (ctx, { provider }) => {
    //   await provider.sendMedia(
    //     ctx.from,
    //     "TEXTO",
    //     "https://testbotmusa.blob.core.windows.net/img-chatbot/atingiWelcomeOne.jpg"
    //   );
    // }
  )
  .addAnswer(
    "🌈 ¡En este viaje de aprendizaje, estaré siempre a tu lado! 🐾💃 Soy uno de los personajes de Musa, pero en esta ocasión, llevo los colores de *atingi*. 🌟💼 🐾💃 \n\n¿Por qué me estoy pintando de los colores de atingi? Bueno, es porque en este viaje educativo, Musa y atingi se han unido para brindarte lo mejor de ambos mundos: la creatividad y la diversión de Musa con la potencia y el conocimiento de atingi. 🌟💼",
    {
      capture: true,
      buttons: [{ body: "¡GENIAL!" }],
      delay: 1000,
    }
  )
  .addAnswer(
    "📱 Para que estemos más conectad@s, no olvides guardar este número en tus contactos. Ah, y por cierto, *¿cómo te llamas?* Me encantaría conocerte mejor. 👀",
    {
      capture: true,
    },
    (ctx, { globalState, flowDynamic }) => {
      globalState.update({ name: ctx.body });
    }
  )
  .addAction(null, async (ctx, { globalState, flowDynamic }) => {
    let name = globalState.get("name");
    return await flowDynamic(
      `😁 ¡Muchas gracias, ${name}! A partir de ahora, usaré ese nombre para dirigirme a ti`
    );
  })
  .addAnswer(
    `¿Te parece bien?`,
    {
      capture: true,
      buttons: [{ body: "SI" }, { body: "NO" }],
    },
    async (ctx, { gotoFlow }) => {
      const acceptName = ctx.body;
      console.log(ctx);
      if (acceptName === "NO") {
        return gotoFlow(rejectedName);
      }
    }
  )
  .addAnswer(
    "¡Excelente!😄 Ahora, tengo dos preguntas para registrar tus datos y poder enviarte tu constancia de participación al finalizar esta sesión de aprendizaje.",
    {
      capture: true,
      buttons: [{ body: "OK" }],
    }
  )
  .addAnswer(
    "💁‍♂️💁‍♀️ Dime, ¿con qué género te identificas?\n\n*A.* Femenino\n*B.* Masculino\n*C.* Otro\n*D.* Prefiero no decirlo\n\n✍️ *Escribe una letra entre A y D.*",
    {
      capture: true,
    },
    (ctx, { fallBack }) => {
      if (
        ctx.body !== "A" &&
        ctx.body !== "B" &&
        ctx.body !== "C" &&
        ctx.body !== "D"
      ) {
        return fallBack();
      }
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
    [rejectedName, afterTakeName, mainFlow, mainMenu]
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
  const adapterFlow = createFlow([
    flowWelcome,
    mainFlow,
    afterTakeName,
    rejectedName,
    mainMenu,
    resetAll,
    typeOfMessage,
  ]);

  const adapterProvider = createProvider(MetaProvider, {
    jwtToken:
      "EAAO7cfcvkY4BO9SZA4qU4gfftQuZC3Q42WsA3YnuLsr2PlTkhTXFXQiiMxFe92gTZAQKjjDeeFmmJxTBHbT8KisDvH8B5ZBedzZC18KiaM0bsg66RBMWXHgU8ZA40POjOI0Olb3EzRuibxGEM4cg8SGYK4peNuoViqnT2YJIBDgyIc0AVseAK2ykZCeZBXFjdVVifBL6jUc4WnUh35AZD",
    numberId: "244396062094814",
    verifyToken: "loquesea",
    version: "v16.0",
  });

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  // console.log(adapterFlow);

  // adapterProvider.on("message", (stream) => {
  //   console.log(stream);
  // });
};

main();
