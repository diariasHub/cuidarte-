// Suite E2E - Módulo 1: Registro de paciente
// Trazabilidad: RF-2.1 (ERS) / CP-AUT-01 (plantilla EP3).

const SEL = {
  usuario: '[data-testid="input-registro-nombre-usuario"]',
  correo: '[data-testid="input-registro-correo"]',
  password: '[data-testid="input-registro-password"]',
  crear: '[data-testid="button-registro-crear-cuenta"]',
};

// Contraseña de 12+ caracteres: cumple la política exigida por la EP3,
// así el caso sigue pasando cuando se corrija la política (commit 9).
const PASSWORD_SEGURA = "Cuidarte#Segura2026";

describe("Registro - Cuidarte+", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("E2E-05 | Navega desde el login a la página de registro (RF-2.1)", () => {
    cy.visit("/login");
    cy.get('[data-testid="link-registro"]').click();
    cy.location("pathname").should("eq", "/registro");
    cy.contains("Registro de Paciente").should("be.visible");
  });

  it("E2E-06 | Formulario vacío: muestra campos requeridos y no envía (RF-2.1)", () => {
    cy.visit("/registro");
    cy.get(SEL.crear).click();
    cy.contains("El nombre de usuario es requerido").should("be.visible");
    cy.contains("El correo es requerido").should("be.visible");
    cy.contains("La contraseña es requerida").should("be.visible");
    cy.location("pathname").should("eq", "/registro");
  });

  it("E2E-07 | Rechaza un correo con formato inválido (RF-2.1)", () => {
    cy.visit("/registro");
    cy.get(SEL.usuario).type("paciente_correo_malo");
    cy.get(SEL.correo).type("correo-sin-arroba");
    cy.get(SEL.password).type(PASSWORD_SEGURA, { log: false });
    cy.get(SEL.crear).click();
    cy.contains("El correo debe tener un formato válido").should("be.visible");
    cy.location("pathname").should("eq", "/registro");
  });

  it("E2E-08 | Rechaza un nombre de usuario ya registrado (RF-2.1)", () => {
    cy.visit("/registro");
    cy.get(SEL.usuario).type("admin");
    cy.get(SEL.correo).type(`dup_${Date.now()}@cuidarte.test`);
    cy.get(SEL.password).type(PASSWORD_SEGURA, { log: false });
    cy.get(SEL.crear).click();
    cy.contains("Usuario o correo duplicado", { timeout: 15000 }).should("be.visible");
    cy.location("pathname").should("eq", "/registro");
  });

  it("E2E-09 | Registra un paciente nuevo y luego inicia sesión (CP-AUT-01)", () => {
    const id = Date.now();
    const usuario = `paciente_e2e_${id}`;

    cy.visit("/registro");
    cy.get(SEL.usuario).type(usuario);
    cy.get(SEL.correo).type(`${usuario}@cuidarte.test`);
    cy.get(SEL.password).type(PASSWORD_SEGURA, { log: false });
    cy.get(SEL.crear).click();
    cy.contains("Cuenta creada exitosamente", { timeout: 15000 }).should("be.visible");
    cy.location("pathname").should("eq", "/login");

    cy.get('[data-testid="input-nombre-usuario"]').type(usuario);
    cy.get('[data-testid="input-password"]').type(PASSWORD_SEGURA, { log: false });
    cy.get('[data-testid="button-login"]').click();
    cy.location("pathname", { timeout: 15000 }).should("eq", "/home");
  });
});
