var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// bin/server.ts
import http from "node:http";

// src/app.ts
import express from "express";
import cors from "cors";

// src/routes/index-route.ts
import { Router } from "express";
var router = Router();
router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Post Auth Platform API"
  });
});

// src/routes/post-routes.ts
import { Router as Router2 } from "express";

// src/repositories/post-repository.ts
var PostRepository = class {
  constructor(database2) {
    this.database = database2;
  }
  get() {
    return __async(this, null, function* () {
      return yield this.database.posts.findMany({
        orderBy: [
          {
            createdAt: "desc"
          },
          {
            updatedAt: "desc"
          }
        ],
        where: {
          deleted: false
        }
      });
    });
  }
  getByUserId(userId) {
    return __async(this, null, function* () {
      return yield this.database.posts.findMany({
        where: {
          userId,
          deleted: false
        },
        orderBy: [
          {
            createdAt: "desc"
          },
          {
            updatedAt: "desc"
          }
        ]
      });
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      return yield this.database.posts.findMany({
        where: {
          id,
          deleted: false
        }
      });
    });
  }
  create(data) {
    return __async(this, null, function* () {
      return yield this.database.posts.create({
        data
      });
    });
  }
  update(data) {
    return __async(this, null, function* () {
      const _a = data, { id } = _a, updatedData = __objRest(_a, ["id"]);
      return yield this.database.posts.update({
        data: updatedData,
        where: {
          id,
          deleted: false
        }
      });
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield this.database.posts.update({
        data: {
          deleted: true
        },
        where: {
          id
        }
      });
    });
  }
};

// config/database.ts
import { PrismaClient } from "@prisma/client";
var database = new PrismaClient();

// src/controllers/create-post-controller.ts
var CreatePostController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const post = this.postRepository.create(req.body);
      res.status(201).json(post);
    });
  }
};

// src/controllers/get-user-posts-controller.ts
var GetUserPostsController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { userId } = req.params;
      const posts = yield this.postRepository.getByUserId(userId);
      res.status(200).json(posts);
    });
  }
};

// src/controllers/get-posts-controller.ts
var GetPostsController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  handle(_req, res) {
    return __async(this, null, function* () {
      const posts = yield this.postRepository.get();
      res.status(200).json(posts);
    });
  }
};

// src/controllers/get-post-by-id-controller.ts
var GetPostByIdController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      const post = yield this.postRepository.getById(id);
      res.status(200).json(post);
    });
  }
};

// src/controllers/update-post-controller.ts
var UpdatePostController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const post = this.postRepository.update(req.body);
      res.status(200).json(post);
    });
  }
};

// src/controllers/delete-post-controller.ts
var DeletePostController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.params;
      yield this.postRepository.delete(id);
      res.status(200).json({
        message: "Post deletado."
      });
    });
  }
};

// src/routes/post-routes.ts
var router2 = Router2();
var postRepository = new PostRepository(database);
var createPostController = new CreatePostController(postRepository);
var getPostsController = new GetPostsController(postRepository);
var getUserPostsController = new GetUserPostsController(postRepository);
var getPostByIDController = new GetPostByIdController(postRepository);
var updatePostController = new UpdatePostController(postRepository);
var deletePostController = new DeletePostController(postRepository);
router2.post("/", (req, res) => {
  createPostController.handle(req, res);
});
router2.put("/", (req, res) => {
  updatePostController.handle(req, res);
});
router2.delete("/:id", (req, res) => {
  deletePostController.handle(req, res);
});
router2.get("/", (req, res) => {
  getPostsController.handle(req, res);
});
router2.get("/by-user-id/:userId", (req, res) => {
  getUserPostsController.handle(req, res);
});
router2.get("/by-post-id/:id", (req, res) => {
  getPostByIDController.handle(req, res);
});

// src/app.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);
app.use("/post", router2);

// bin/server.ts
var port = 4e3;
app.set("port", port);
var server = http.createServer(app);
server.listen(port, () => {
  console.log(`\u{1F680} Listening on port ${port}`);
});
