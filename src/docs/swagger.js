import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
 openapi: "3.0.0",
 info: {
  title: "Kamus Gaul API Documentation",
  version: "1.0.0",
  description: "API documentation By : IMPHEN",
 },
 servers: [
  {
   url: "http://localhost:3000",
  },
 ],
}

const options = {
 swaggerDefinition,
 apis: ["./src/routes/*.js", "./src/handler/**/*.js"],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
