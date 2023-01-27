import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`🚀listening on port: ${port} 🔗http://localhost:${port}`)
    );
  } catch (ex) {
    console.log(ex);
  }
};

init();
