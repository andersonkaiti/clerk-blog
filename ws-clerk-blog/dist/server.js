var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

// src/utils/decode-buffer.ts
var decode = (input) => Buffer.isBuffer(input) ? input.toString("utf-8") : input instanceof Uint8Array ? Buffer.from(input).toString("utf-8") : String(input);

// src/utils/transform-post.ts
function transformPost(data) {
  if (Array.isArray(data)) {
    return data.map((_a) => {
      var _b = _a, { title: title2, text: text2 } = _b, rest2 = __objRest(_b, ["title", "text"]);
      return __spreadValues({
        title: decode(title2),
        text: decode(text2)
      }, rest2);
    });
  }
  const _c = data, { title, text } = _c, rest = __objRest(_c, ["title", "text"]);
  return __spreadValues({
    title: decode(title),
    text: decode(text)
  }, rest);
}

// src/repositories/post-repository.ts
var PostRepository = class {
  constructor(database2) {
    this.database = database2;
  }
  get() {
    return __async(this, null, function* () {
      const posts = yield this.database.posts.findMany({
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
        },
        include: {
          user: {
            include: {
              email_addresses: true
            }
          }
        }
      });
      return transformPost(posts);
    });
  }
  getByUserId(userId) {
    return __async(this, null, function* () {
      const posts = yield this.database.posts.findMany({
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
      return transformPost(posts);
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const posts = yield this.database.posts.findMany({
        where: {
          id,
          deleted: false
        },
        include: {
          user: true
        }
      });
      return transformPost(posts);
    });
  }
  create(_0) {
    return __async(this, arguments, function* ({ userId, text, title }) {
      const post = yield this.database.posts.create({
        data: {
          userId,
          title: Buffer.from(title, "utf-8"),
          text: Buffer.from(text, "utf-8")
        }
      });
      return transformPost(post);
    });
  }
  update(_0) {
    return __async(this, arguments, function* ({ id, title, text }) {
      const post = yield this.database.posts.update({
        data: {
          title: Buffer.from(title, "utf-8"),
          text: Buffer.from(text, "utf-8")
        },
        where: {
          id,
          deleted: false
        }
      });
      return transformPost(post);
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
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const post = this.postRepository.create(req.body);
        res.status(201).json(post);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/get-user-posts-controller.ts
var GetUserPostsController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const { userId } = req.params;
        const posts = yield this.postRepository.getByUserId(userId);
        res.status(200).json(posts);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/get-posts-controller.ts
var GetPostsController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handle(_req, res) {
    return __async(this, null, function* () {
      try {
        const posts = yield this.postRepository.get();
        res.status(200).json(posts);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/get-post-by-id-controller.ts
var GetPostByIdController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const post = yield this.postRepository.getById(id);
        res.status(200).json(post);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/update-post-controller.ts
var UpdatePostController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const post = this.postRepository.update(req.body);
        res.status(200).json(post);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/delete-post-controller.ts
var DeletePostController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        yield this.postRepository.delete(id);
        res.status(200).json({
          message: "Post deletado."
        });
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/factories/posts-controllers-factory.ts
import { config } from "dotenv";
config();
var PostsControllersFactory = class {
  createControllers() {
    const postRepository = new PostRepository(database);
    const createPostController2 = new CreatePostController(postRepository);
    const getPostsController2 = new GetPostsController(postRepository);
    const getUserPostsController2 = new GetUserPostsController(postRepository);
    const getPostByIDController2 = new GetPostByIdController(postRepository);
    const updatePostController2 = new UpdatePostController(postRepository);
    const deletePostController2 = new DeletePostController(postRepository);
    return {
      createPostController: createPostController2,
      getPostsController: getPostsController2,
      getUserPostsController: getUserPostsController2,
      getPostByIDController: getPostByIDController2,
      updatePostController: updatePostController2,
      deletePostController: deletePostController2
    };
  }
};

// src/routes/post-routes.ts
var {
  createPostController,
  deletePostController,
  getPostByIDController,
  getPostsController,
  getUserPostsController,
  updatePostController
} = new PostsControllersFactory().createControllers();
var router2 = Router2();
router2.post("/", createPostController.handle.bind(createPostController));
router2.put("/", updatePostController.handle.bind(updatePostController));
router2.delete("/:id", deletePostController.handle.bind(deletePostController));
router2.get("/", getPostsController.handle.bind(getPostsController));
router2.get(
  "/by-user-id/:userId",
  getUserPostsController.handle.bind(getUserPostsController)
);
router2.get(
  "/by-post-id/:id",
  getPostByIDController.handle.bind(getPostByIDController)
);

// src/routes/user-routes.ts
import { Router as Router3 } from "express";

// src/repositories/user-repository.ts
var UserRepository = class {
  constructor(database2) {
    this.database = database2;
  }
  create(_0) {
    return __async(this, arguments, function* ({
      email_addresses,
      created_at,
      first_name,
      image_url,
      last_name,
      last_sign_in_at,
      profile_image_url,
      updated_at,
      id
    }) {
      yield this.database.users.create({
        data: {
          created_at,
          first_name,
          image_url,
          last_name,
          last_sign_in_at,
          profile_image_url,
          updated_at,
          id,
          email_addresses: {
            create: email_addresses.map((email) => ({
              id: email.id,
              email_address: email.email_address,
              object: email.object
            }))
          }
        }
      });
    });
  }
  update(_0) {
    return __async(this, arguments, function* ({
      email_addresses,
      created_at,
      first_name,
      image_url,
      last_name,
      last_sign_in_at,
      profile_image_url,
      updated_at,
      username,
      id
    }) {
      yield this.database.users.update({
        where: {
          id
        },
        data: {
          created_at,
          first_name,
          image_url,
          last_name,
          last_sign_in_at,
          profile_image_url,
          updated_at,
          username,
          email_addresses: {
            deleteMany: {},
            create: email_addresses.map((email) => ({
              id: email.id,
              email_address: email.email_address,
              object: email.object
            }))
          }
        }
      });
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield this.database.users.delete({
        include: {
          email_addresses: true
        },
        where: {
          id
        }
      });
    });
  }
};

// src/services/clerk-webhook.ts
var ClerkWeebhookService = class {
  constructor(webhook) {
    this.webhook = webhook;
  }
  verify(req) {
    return __async(this, null, function* () {
      const {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature
      } = req.headers;
      if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error("Headers svix ausentes.");
      }
      const payload = JSON.stringify(req.body);
      const headers = {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature
      };
      try {
        return this.webhook.verify(payload, headers);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    });
  }
};

// src/factories/clerk-webhook-service-factory.ts
import { Webhook } from "svix";
var ClerkWeebhookServiceFactory = class {
  createWebhook(secret) {
    return {
      clerkWebhookService: new ClerkWeebhookService(new Webhook(secret))
    };
  }
};

// src/controllers/create-user-controller.ts
var CreateUserController = class {
  constructor(userRepository, clerkWebhookService) {
    this.userRepository = userRepository;
    this.clerkWebhookService = clerkWebhookService;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const event = yield this.clerkWebhookService.verify(
          req
        );
        if (!event) throw new Error("Erro ao verificar webhook.");
        const {
          type: eventType,
          data: _a
        } = event, _b = _a, { created_at, updated_at, last_sign_in_at } = _b, userData = __objRest(_b, ["created_at", "updated_at", "last_sign_in_at"]);
        if (eventType === "user.created") {
          yield this.userRepository.create(__spreadValues({
            created_at: new Date(created_at),
            last_sign_in_at: new Date(created_at),
            updated_at: new Date(updated_at)
          }, userData));
          res.status(201).json({
            message: "Usu\xE1rio criado com sucesso!"
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/update-user-controller.ts
var UpdateUserController = class {
  constructor(userRepository, clerkWebhookService) {
    this.userRepository = userRepository;
    this.clerkWebhookService = clerkWebhookService;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const event = yield this.clerkWebhookService.verify(
          req
        );
        if (!event) throw new Error("Falha na verifica\xE7\xE3o do webhook.");
        const _a = event, {
          data: _b
        } = _a, _c = _b, { created_at, last_sign_in_at, updated_at } = _c, userData = __objRest(_c, ["created_at", "last_sign_in_at", "updated_at"]), {
          type: eventType
        } = _a;
        if (eventType === "user.updated") {
          yield this.userRepository.update(__spreadValues({
            created_at: new Date(created_at),
            last_sign_in_at: new Date(last_sign_in_at),
            updated_at: new Date(updated_at)
          }, userData));
          res.status(200).json({
            message: "Usu\xE1rio atualizado com sucesso!"
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/controllers/delete-user.ts
var DeleteUserControler = class {
  constructor(userRepository, clerkWebhookService) {
    this.userRepository = userRepository;
    this.clerkWebhookService = clerkWebhookService;
  }
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const event = yield this.clerkWebhookService.verify(
          req
        );
        if (!event) throw new Error("Falha na verifica\xE7\xE3o do webhook.");
        const {
          type: eventType,
          data: { id }
        } = event;
        if (eventType === "user.deleted") {
          yield this.userRepository.delete(id);
          res.status(200).json({
            message: "Posts e usu\xE1rio deletados com sucesso!"
          });
        }
        res.status(200).json({
          message: "Evento n\xE3o tratado."
        });
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({
            error: err.message
          });
        }
      }
    });
  }
};

// src/factories/user-controllers-factory.ts
import { config as config2 } from "dotenv";
config2();
var UserControllersFactory = class {
  createController() {
    const { clerkWebhookService: clerkWebhookCreateUserService } = new ClerkWeebhookServiceFactory().createWebhook(
      process.env.CREATE_USER_SECRET
    );
    const { clerkWebhookService: clerkWebhookUpdateUserService } = new ClerkWeebhookServiceFactory().createWebhook(
      process.env.UPDATE_USER_SECRET
    );
    const { clerkWebhookService: clerkWebhookDeleteUserService } = new ClerkWeebhookServiceFactory().createWebhook(
      process.env.DELETE_USER_SECRET
    );
    const userRepository = new UserRepository(database);
    const createUserController2 = new CreateUserController(
      userRepository,
      clerkWebhookCreateUserService
    );
    const updateUserController2 = new UpdateUserController(
      userRepository,
      clerkWebhookUpdateUserService
    );
    const deleteUserPostsController2 = new DeleteUserControler(
      userRepository,
      clerkWebhookDeleteUserService
    );
    return {
      createUserController: createUserController2,
      updateUserController: updateUserController2,
      deleteUserPostsController: deleteUserPostsController2
    };
  }
};

// src/routes/user-routes.ts
var router3 = Router3();
var {
  createUserController,
  updateUserController,
  deleteUserPostsController
} = new UserControllersFactory().createController();
router3.post(
  "/api/webhooks/created-user",
  createUserController.handle.bind(createUserController)
);
router3.post(
  "/api/webhooks/updated-user",
  updateUserController.handle.bind(updateUserController)
);
router3.post(
  "/api/webhooks/deleted-user",
  deleteUserPostsController.handle.bind(deleteUserPostsController)
);

// src/app.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);
app.use("/post", router2);
app.use("/user", router3);

// bin/server.ts
var port = 4e3;
app.set("port", port);
var server = http.createServer(app);
server.listen(port, () => {
  console.log(`\u{1F680} Listening on port ${port}`);
});
