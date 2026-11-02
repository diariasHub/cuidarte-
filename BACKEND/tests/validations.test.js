const { loginSchema, registerSchema } = require("../src/validations/auth");

describe("loginSchema (BACKEND/src/validations/auth.js)", () => {
  test("acepta credenciales con el formato esperado", async () => {
    const datos = { nombre_usuario: "qa.medico", password: "Medico#Cuidarte2026" };
    await expect(loginSchema.validate(datos)).resolves.toEqual(datos);
  });

  test("rechaza un nombre de usuario de menos de 3 caracteres", async () => {
    const datos = { nombre_usuario: "ab", password: "x" };
    await expect(loginSchema.validate(datos)).rejects.toThrow();
  });
});

describe("registerSchema (BACKEND/src/validations/auth.js)", () => {
  test("rechaza un correo con formato invalido", async () => {
    const datos = { nombre_usuario: "paciente1", password: "secreto123", correo: "correo-invalido" };
    await expect(registerSchema.validate(datos)).rejects.toThrow();
  });

  test("acepta un registro valido con RUT con puntos", async () => {
    const datos = {
      nombre_usuario: "paciente1",
      password: "secreto123",
      correo: "paciente1@correo.cl",
      rut: "16.234.578-8",
    };
    await expect(registerSchema.validate(datos)).resolves.toMatchObject({ nombre_usuario: "paciente1" });
  });
});
