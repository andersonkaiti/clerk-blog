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

// config/database.ts
import { PrismaClient } from "@prisma/client";
var database = new PrismaClient();

// src/repositories/post-repository.ts
var PostRepository = class {
  constructor(database2) {
    this.database = database2;
  }
  async get({ filter, skip, take }) {
    return await this.database.posts.findMany({
      skip,
      take,
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
  async getByUserId({
    userId,
    filter,
    skip,
    take
  }) {
    return await this.database.posts.findMany({
      skip,
      take,
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
    return await this.database.posts.findFirst({
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
  async count(filter) {
    return await this.database.posts.count({
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
      }
    });
  }
  async countByUserId({ userId, filter }) {
    return await this.database.posts.count({
      where: {
        deleted: false,
        userId,
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
      }
    });
  }
};

// src/controllers/create-post-controller.ts
var CreatePostController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
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

// src/controllers/update-post-controller.ts
var UpdatePostController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
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

// src/controllers/get-posts-controller.ts
var GetPostsController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  async handle(req, res) {
    try {
      const { filter, page = 1, limit = 6 } = req.query;
      const pageNumber = Number(page);
      const pageLimit = Number(limit);
      const skip = pageNumber * pageLimit - pageLimit;
      const posts = await this.postRepository.get({
        filter: filter || "",
        skip,
        take: pageLimit
      });
      const count = await this.postRepository.count(filter || "");
      const last = Math.ceil(Number(count / pageLimit));
      const pagination = {
        first: 1,
        prev: pageNumber < 2 ? null : pageNumber - 1,
        next: pageNumber >= last ? null : pageNumber + 1,
        last,
        data: posts
      };
      res.status(200).json(pagination);
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
  constructor(postRepository2) {
    this.postRepository = postRepository2;
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

// src/controllers/get-user-posts-controller.ts
var GetUserPostsController = class {
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  async handle(req, res) {
    try {
      const { filter, page, limit } = req.query;
      const { userId } = req.params;
      const pageNumber = Number(page);
      const pageLimit = Number(limit);
      const skip = pageNumber * pageLimit - pageLimit;
      const posts = await this.postRepository.getByUserId({
        userId,
        filter: filter || "",
        skip,
        take: pageLimit
      });
      const count = await this.postRepository.countByUserId({
        userId,
        filter: filter || ""
      });
      const last = Math.ceil(Number(count / pageLimit));
      const pagination = {
        first: 1,
        prev: pageNumber < 2 ? null : pageNumber - 1,
        page: pageNumber,
        next: pageNumber >= last ? null : pageNumber + 1,
        last,
        count,
        data: posts
      };
      res.status(200).json(pagination);
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
  constructor(postRepository2) {
    this.postRepository = postRepository2;
  }
  async handle(req, res) {
    try {
      const { postId } = req.params;
      const post = await this.postRepository.getById(postId);
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

// src/factories/controllers/posts-factories.ts
var postRepository = new PostRepository(database);
function createPostFactory() {
  const createPostController2 = new CreatePostController(postRepository);
  return {
    createPostController: createPostController2
  };
}
function updatePostFactory() {
  const updatePostController2 = new UpdatePostController(postRepository);
  return {
    updatePostController: updatePostController2
  };
}
function getPostsFactory() {
  const getPostsController2 = new GetPostsController(postRepository);
  return {
    getPostsController: getPostsController2
  };
}
function deletePostFactory() {
  const deletePostController2 = new DeletePostController(postRepository);
  return {
    deletePostController: deletePostController2
  };
}
function userPostsFactory() {
  const getUserPostsController2 = new GetUserPostsController(postRepository);
  return {
    getUserPostsController: getUserPostsController2
  };
}
function postByIdFactory() {
  const getPostByIdController2 = new GetPostByIdController(postRepository);
  return {
    getPostByIdController: getPostByIdController2
  };
}

// src/routes/post-routes.ts
var { createPostController } = createPostFactory();
var { updatePostController } = updatePostFactory();
var { deletePostController } = deletePostFactory();
var { getPostsController } = getPostsFactory();
var { getUserPostsController } = userPostsFactory();
var { getPostByIdController } = postByIdFactory();
var router2 = Router2();
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
router2.get("/:userId/posts", (req, res) => {
  getUserPostsController.handle(req, res);
});
router2.get("/:postId", (req, res) => {
  getPostByIdController.handle(req, res);
});

// src/routes/user-routes.ts
import { Router as Router3 } from "express";

// src/controllers/create-user-controller.ts
var CreateUserController = class {
  constructor(userRepository2, clerkWebhookService) {
    this.userRepository = userRepository2;
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

// src/controllers/delete-user.ts
var DeleteUserControler = class {
  constructor(userRepository2, clerkWebhookService) {
    this.userRepository = userRepository2;
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

// src/controllers/update-user-controller.ts
var UpdateUserController = class {
  constructor(userRepository2, clerkWebhookService) {
    this.userRepository = userRepository2;
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

// src/factories/services/clerk-webhook-service-factory.ts
import { Webhook } from "svix";
var ClerkWeebhookServiceFactory = class {
  createWebhook(secret) {
    return {
      clerkWebhookService: new ClerkWeebhookService(new Webhook(secret))
    };
  }
};

// src/factories/controllers/users-factories.ts
var userRepository = new UserRepository(database);
function createUserFactory() {
  const { clerkWebhookService: clerkWebhookCreateUserService } = new ClerkWeebhookServiceFactory().createWebhook(
    process.env.CREATE_USER_SECRET
  );
  const createUserController2 = new CreateUserController(
    userRepository,
    clerkWebhookCreateUserService
  );
  return {
    createUserController: createUserController2
  };
}
function updateUserFactory() {
  const { clerkWebhookService: clerkWebhookUpdateUserService } = new ClerkWeebhookServiceFactory().createWebhook(
    process.env.UPDATE_USER_SECRET
  );
  const updateUserController2 = new UpdateUserController(
    userRepository,
    clerkWebhookUpdateUserService
  );
  return {
    updateUserController: updateUserController2
  };
}
function deleteUserFactory() {
  const { clerkWebhookService: clerkWebhookDeleteUserService } = new ClerkWeebhookServiceFactory().createWebhook(
    process.env.DELETE_USER_SECRET
  );
  const deleteUserPostsController2 = new DeleteUserControler(
    userRepository,
    clerkWebhookDeleteUserService
  );
  return {
    deleteUserPostsController: deleteUserPostsController2
  };
}

// src/routes/user-routes.ts
var router3 = Router3();
var { createUserController } = createUserFactory();
var { updateUserController } = updateUserFactory();
var { deleteUserPostsController } = deleteUserFactory();
router3.post("/api/webhooks/created-user", (req, res) => {
  createUserController.handle(req, res);
});
router3.post("/api/webhooks/updated-user", (req, res) => {
  updateUserController.handle(req, res);
});
router3.post("/api/webhooks/deleted-user", (req, res) => {
  deleteUserPostsController.handle(req, res);
});

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
