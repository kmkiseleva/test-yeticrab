const http = require("http");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const koaBody = require("koa-body");

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));

let requests = [
  {
    id: 1,
    orderDate: "15.05.2022",
    clientCompanyName: "Управление Автомобильных Перевозок",
    driverInitials: "Иванов Иван Иванович",
    driverPhone: "+79991111111",
    comments: "Хрупкий груз",
    atiCode: "12345",
  },
  {
    id: 2,
    orderDate: "20.01.2022",
    clientCompanyName: "LogiCo",
    driverInitials: "Петров Герман Васильевич",
    driverPhone: "+79992221100",
    comments: "Доставить во второй половине дня",
    atiCode: "12340",
  },
  {
    id: 3,
    orderDate: "05.02.2022",
    clientCompanyName: "АВ-Логистик, ООО",
    driverInitials: "Нойштард Игорь Павлович",
    driverPhone: "+79993332211",
    comments: "Позвонить за полчаса",
    atiCode: "12250",
  },
];

let nextId = 4;

const router = new Router();

router.get("/requests", async (ctx, next) => {
  ctx.response.body = requests;
});

router.post("/requests", async (ctx, next) => {
  let data = JSON.parse(ctx.request.body);
  let date = new Date().toLocaleDateString();
  requests.push({ ...data, id: nextId++, orderDate: date });
  ctx.response.status = 204;
});

router.put("/requests/:id", async (ctx, next) => {
  const content = JSON.parse(ctx.request.body);
  const requestId = Number(ctx.params.id);
  const filteredPosts = requests.filter((o) => o.id !== requestId);
  requests = [...filteredPosts, content];
  ctx.response.status = 204;
});

router.delete("/requests/:id", async (ctx, next) => {
  const requestId = Number(ctx.params.id);
  const index = requests.findIndex((o) => o.id === requestId);
  if (index !== -1) {
    requests.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log("server started"));
