import { Router } from "https://deno.land/x/oak/mod.ts";
import { Work } from "../models/Work.ts";

const router = new Router();

let works: Work[] = [];

router.get("/works", (ctx) => {
  ctx.response.body = { message: "FETCH SUCCESSFUL", response: works };
});

router.get("/works/:workId", async (ctx) => {
  try {
      const workId = ctx.params.workId;
      const workIndex = await works.findIndex((work) => {
        return work.id === workId;
      });
      ctx.response.body = {
        message: `FETCH Work_no: ${workId}, SUCCESSFUL`,
        reponse: works[workIndex],
      };
  } catch (error) {
    console.log(error);
     ctx.response.body = { message: "FAILED TO FETCH REQUEST" };
  }
});
router.post("/works", async (ctx) => {
    try {
          const reqBody = await ctx.request.body();
          const data = await reqBody.value;
          console.log(data);
          const newWork: Work = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            job: data.job,
            department: data.department,
            date: new Date().toISOString(),
          };
          works.push(newWork);
          ctx.response.body = {
            message: "ADDED WORK, SUCCESSFUL",
            response: newWork,
          };
    } catch (error) {
        console.log(error);
        ctx.response.body = {message: 'FAILED TO CREATE REQUEST'}
    }
});
router.put("/works/:workId", async (ctx) => {
    try {
        const workId = ctx.params.workId;
        const reqBody = await ctx.request.body();
        const data = await reqBody.value;
        const workIndex =  works.findIndex((work) => {
            return work.id === workId
        })
        works[workIndex] = {
            id: works[workIndex].id,
            job: data.job,
             department: data.department,
             date: works[workIndex].date
        }
        ctx.response.body = {
          message: "UPDATED WORK, SUCCESSFUL",
          response: data
        };
    } catch (error) {
         console.log(error);
         ctx.response.body = { message: "FAILED TO UPDATE REQUEST BODY" };
    }
});
router.delete("/works/:workId", (ctx) => {
    const workId = ctx.params.workId;
    works = works.filter((work) => {
        work.id !== workId
    })
    ctx.response.body = {
      message: `DELETED SUCCESSFUL`,
      work_no: `${workId}`,
      response: {}
    };
});

export default router;
