import app from "./app";
import db from "./db";
const seed = db.seed;

const init = async () => {
  try {
    await seed();
    const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`🚀listening on port: ${port} 🔗http://localhost:${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
