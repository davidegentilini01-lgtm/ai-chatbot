import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        { role: "system", content: "Sei un assistente semplice e diretto." },
        { role: "user", content: userMsg }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices?.[0]?.message?.content || "Errore" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
