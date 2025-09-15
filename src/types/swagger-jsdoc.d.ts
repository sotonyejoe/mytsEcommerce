declare module "swagger-jsdoc" {
  export interface SwaggerDefinition {
    openapi: string;
    info: {
      title: string;
      version: string;
      description?: string;
    };
    servers?: { url: string }[];
    components?: any;
  }

  export interface Options {
    definition: SwaggerDefinition;
    apis: string[];
  }

  export default function swaggerJSDoc(options: Options): any;
}
