// Adaptador

import express from "express";
import PreviewOrder from "./PreviewOrder";
const app = express();
app.use(express.json());

app.post("/orderPreview", async function (req, res) {
	const previewOrder = new PreviewOrder();
	const output = await previewOrder.execute(req.body);
	res.json(output);
});

app.listen(3000);