import app from "./app";
import seed from "./db/seed";

const init = async () => {
  try {
    if (process.env.SEED === "true") await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`🚀listening on port: ${port} 🔗http://localhost:${port}`)
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
