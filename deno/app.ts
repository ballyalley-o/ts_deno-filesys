import { Application } from "https://deno.land/x/oak/mod.ts";
import workRoute from "./routes/work.ts";

const app = new Application();
const PORT = 8000;

app.use(workRoute.routes());
app.use(workRoute.allowedMethods());


app.use(async (ctx, next) => {
  console.log('PROCESSING...')
  await next()
});

const CONNECTION = await app.listen({ port: PORT });

console.log(`SERVER STATUS: Running on PORT: ${PORT}...`);