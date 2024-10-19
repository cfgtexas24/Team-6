import {
  HuggingFaceEmbedding,
  Ollama,
  Settings,
  VectorStoreIndex,
  PDFReader,
} from "llamaindex";
import express from "express";
import multer from "multer";
import cors from "cors";

Settings.llm = new Ollama({
  model: "tinyllama",
});

Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "BAAI/bge-small-en-v1.5",
  quantized: false,
});

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const upload = multer();

app.post("/", upload.single("resume"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.sendStatus(400);
    return;
  }

  const arr = new Uint8Array(file.buffer);
  const stream = await getQueryStream(arr);
  for await (const result of stream) {
    res.write(result.toString());
  }

  res.status(200).end();
});

app.listen(3000, () => console.log("Server running on port 3000"));

async function getQueryStream(arr: Uint8Array) {
  const loader = new PDFReader();
  const documents = await loader.loadDataAsContent(arr);

  const index = await VectorStoreIndex.fromDocuments(documents);
  const queryEngine = index.asQueryEngine();
  return await queryEngine.query({
    stream: true,
    query: `How can this resume be improved? Give at least five specific recommendations.`,
  });
}
