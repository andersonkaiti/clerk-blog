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
  async get(filter) {
    return await this.database.posts.findMany({
      orderBy: [
        {
          updatedAt: "desc"
        }
      ],
      where: {
        deleted: false,
        OR: [
          {
            title: {
              contains: filter
            }
          },
          {
            text: {
              contains: filter
            }
          }
        ]
      },
      include: {
        user: {
          include: {
            email_addresses: true
          }
        }
      }
    });
  }
  async getByUserId(userId, filter) {
    return await this.database.posts.findMany({
      where: {
        userId,
        deleted: false,
        OR: [
          {
            title: {
              contains: filter
            }
          },
          {
            text: {
              contains: filter
            }
          }
        ]
      },
      orderBy: [
        {
          updatedAt: "desc"
        }
      ]
    });
  }
  async getById(id) {
    return await this.database.posts.findMany({
      where: {
        id,
        deleted: false
      },
      include: {
        user: true
      }
    });
  }
  async create(data) {
    return await this.database.posts.create({
      data
    });
  }
  async update({ id, ...data }) {
    return await this.database.posts.update({
      data,
      where: {
        id,
        deleted: false
      }
    });
  }
  async delete(id) {
    await this.database.posts.update({
      data: {
        deleted: true
      },
      where: {
        id
      }
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
  async handle(req, res) {
    try {
      const post = await this.postRepository.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message
        });
      }
    }
  }
};

// src/controllers/get-user-posts-controller.ts
var GetUserPostsController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  async handle(req, res) {
    try {
      const { userId, filter } = req.params;
      let posts = await this.postRepository.getByUserId(userId, filter || "");
      res.status(200).json(posts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message
        });
      }
    }
  }
};

// src/controllers/get-posts-controller.ts
var GetPostsController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  async handle(req, res) {
    try {
      const { filter } = req.params;
      let posts = await this.postRepository.get(filter || "");
      res.status(200).json(posts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message
        });
      }
    }
  }
};

// src/controllers/get-post-by-id-controller.ts
var GetPostByIdController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  async handle(req, res) {
    try {
      const { id } = req.params;
      const post = await this.postRepository.getById(id);
      res.status(200).json(post);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message
        });
      }
    }
  }
};

// src/controllers/update-post-controller.ts
var UpdatePostController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  async handle(req, res) {
    try {
      const post = await this.postRepository.update(req.body);
      res.status(200).json(post);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message
        });
      }
    }
  }
};

// src/controllers/delete-post-controller.ts
var DeletePostController = class {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }
  async handle(req, res) {
    try {
      const { id } = req.params;
      const post = await this.postRepository.delete(id);
      res.status(200).json({
        message: "Post deletado.",
        post
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message
        });
      }
    }
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
router2.get("/:filter", getPostsController.handle.bind(getPostsController));
router2.get(
  "/by-user-id/:userId",
  getUserPostsController.handle.bind(getUserPostsController)
);
router2.get(
  "/by-user-id/:userId/:filter",
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
  async create({
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
    await this.database.users.create({
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
  }
  async update({
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
    await this.database.users.update({
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
  }
  async delete(id) {
    await this.database.users.delete({
      include: {
        email_addresses: true
      },
      where: {
        id
      }
    });
  }
};

// src/services/clerk-webhook.ts
var ClerkWeebhookService = class {
  constructor(webhook) {
    this.webhook = webhook;
  }
  async verify(req) {
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
  async handle(req, res) {
    try {
      const event = await this.clerkWebhookService.verify(
        req
      );
      if (!event) throw new Error("Erro ao verificar webhook.");
      const {
        type: eventType,
        data: { created_at, updated_at, last_sign_in_at, ...userData }
      } = event;
      if (eventType === "user.created") {
        await this.userRepository.create({
          created_at: new Date(created_at),
          last_sign_in_at: new Date(created_at),
          updated_at: new Date(updated_at),
          ...userData
        });
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
  }
};

// src/controllers/update-user-controller.ts
var UpdateUserController = class {
  constructor(userRepository, clerkWebhookService) {
    this.userRepository = userRepository;
    this.clerkWebhookService = clerkWebhookService;
  }
  async handle(req, res) {
    try {
      const event = await this.clerkWebhookService.verify(
        req
      );
      if (!event) throw new Error("Falha na verifica\xE7\xE3o do webhook.");
      const {
        data: { created_at, last_sign_in_at, updated_at, ...userData },
        type: eventType
      } = event;
      if (eventType === "user.updated") {
        await this.userRepository.update({
          created_at: new Date(created_at),
          last_sign_in_at: new Date(last_sign_in_at),
          updated_at: new Date(updated_at),
          ...userData
        });
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
  }
};

// src/controllers/delete-user.ts
var DeleteUserControler = class {
  constructor(userRepository, clerkWebhookService) {
    this.userRepository = userRepository;
    this.clerkWebhookService = clerkWebhookService;
  }
  async handle(req, res) {
    try {
      const event = await this.clerkWebhookService.verify(
        req
      );
      if (!event) throw new Error("Falha na verifica\xE7\xE3o do webhook.");
      const {
        type: eventType,
        data: { id }
      } = event;
      if (eventType === "user.deleted") {
        await this.userRepository.delete(id);
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
var corsOptions = {
  origin: ["http://localhost:3000", "https://anderson-clerk-blog.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
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
