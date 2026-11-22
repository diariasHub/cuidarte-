// Suite E2E - Módulo 1: Autenticación (Login)
// Trazabilidad: RF-1.1 (ERS) / CPF-01 y CP-AUT-01 (plantilla EP3).
// Cada caso se nombra "E2E-xx | ..." para que la tabla de resultados del
// pipeline (Job Summary) muestre el ID, el script, Pass/Fail y el tiempo.

const SEL = {
  usuario: '[data-testid="input-nombre-usuario"]',
  password: '[data-testid="input-password"]',
  entrar: '[data-testid="button-login"]',
};

describe("Login - Cuidarte+", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  it("E2E-01 | La pantalla de login carga con sus controles (RF-1.1)", () => {
    cy.contains("Iniciar Sesión").should("be.visible");
    cy.get(SEL.usuario).should("be.visible");
    cy.get(SEL.password).should("be.visible").and("have.attr", "type", "password");
    cy.get(SEL.entrar).should("be.visible");
  });

  it("E2E-02 | Campos vacíos: no envía y muestra validaciones (RF-1.1)", () => {
    cy.get(SEL.entrar).click();
    cy.contains("El nombre de usuario es requerido").should("be.visible");
    cy.contains("La contraseña es requerida").should("be.visible");
    cy.location("pathname").should("eq", "/login");
  });

  it("E2E-03 | Rechaza credenciales inválidas sin crear sesión (RF-1.1)", () => {
    cy.get(SEL.usuario).type("usuario_inexistente");
    cy.get(SEL.password).type("ClaveIncorrecta#2026", { log: false });
    cy.get(SEL.entrar).click();
    cy.contains("Credenciales inválidas", { timeout: 15000 }).should("be.visible");
    cy.location("pathname").should("eq", "/login");
    cy.window().then((w) => expect(w.localStorage.getItem("token")).to.be.null);
  });

  it("E2E-04 | Inicia sesión con credenciales válidas (CPF-01 / RF-1.1)", () => {
    // Cuenta semilla del dump SQL de pruebas (solo ambiente CI/QA).
    cy.get(SEL.usuario).type("admin");
    cy.get(SEL.password).type("admin", { log: false });
    cy.get(SEL.entrar).click();
    cy.contains("Sesión iniciada", { timeout: 15000 }).should("be.visible");
    cy.location("pathname", { timeout: 15000 }).should("eq", "/home");
    cy.window().then((w) => expect(w.localStorage.getItem("token")).to.be.a("string"));
  });
});
