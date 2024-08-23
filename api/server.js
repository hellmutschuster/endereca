import "dotenv/config";
import app from "./src/app.js";

const port = process.env.API_PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});