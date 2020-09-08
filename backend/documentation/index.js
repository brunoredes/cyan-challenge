/* eslint-disable import/prefer-default-export */
export const swaggerDoc = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Cyan Challenge',
    description: 'User management API',
    contact: {
      name: 'Cyan Challenge',
      url: 'https://github.com/brunoredes/cyan-challenge',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'https://localhost:8443/',
      description: 'Cyan Challenge Backend',
    },
  ],
  tags: [
    {
      name: 'Mill operations',
    },
    {
      name: 'Harvest operations',
    },
    {
      name: 'Farm operations',
    },
    {
      name: 'Field operations',
    },
  ],
  paths: {
    '/mills': {
      post: {
        tags: ['Mill operations'],
        description: 'Create Mills',
        operationId: 'createMills',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Mill',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'New Mill created',
          },
          400: {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Validation Fails',
                  internal_code: 'invalid_parameters',
                },
              },
            },
          },
          406: {
            description: 'Not Acceptable',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Number of characters greater than indicated',
                  internal_code: 'not_acceptable',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Mill operations'],
        description: 'List of mills',
        operationId: 'ListMills',
        responses: {
          200: {
            description: 'List of mills',
          },
          404: {
            description: 'mill not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Not Found',
                  internal_code: 404,
                },
              },
            },
          },
        },
      },
    },
    '/sessions': {
      post: {
        tags: ['Mill operations'],
        description: 'Mill login',
        operationId: 'mill_login',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Session',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Logged succesfully',
          },
          400: {
            description: 'Validation Fails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Validation fails',
                  internal_code: 400,
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Unauthorized to sign in',
                  internal_code: 401,
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Internal Server Error',
                  internal_code: 500,
                },
              },
            },
          },
        },
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
    schemas: {
      Session: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id',
          },
        },
      },
      Mill: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id',
          },
          name: {
            $ref: '#/components/schemas/name',
          },
        },
      },
      Harvest: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id',
          },
          name: {
            $ref: '#/components/schemas/name',
          },
          mills_id: {
            $ref: '#/components/schemas/id',
          },
          start_date: {
            $ref: '#/components/schemas/start_date',
          },
          end_date: {
            $ref: '#/components/schemas/end_date',
          },
        },
      },
      Farm: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id',
          },
          name: {
            $ref: '#/components/schemas/name',
          },
        },
      },
      Field: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/id',
          },
          name: {
            $ref: '#/components/schemas/name',
          },
        },
      },
      id: {
        type: 'string',
        format: 'uuid',
        description: 'ID UUIDV4',
        example: 'b0036192-4b86-4de3-881f-02627ee827be',
      },
      name: {
        type: 'string',
        example: 'name',
      },
      start_date: {
        type: 'string',
        format: 'date',
        example: '01-01-1970',
      },
      end_date: {
        type: 'string',
        format: 'date',
        example: '01-01-1970',
      },
      coords: {
        type: 'array',
        items: { type: 'array', items: { type: 'integer' } },
        example: [-23.486846848, -24.846546485],
        description: 'Latitude Longitude array',
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          internal_code: {
            type: 'integer',
          },
        },
      },
    },
  },
};
