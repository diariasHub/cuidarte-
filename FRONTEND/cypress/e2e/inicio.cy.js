// Prueba funcional que NO requiere backend: valida que la pantalla de
// inicio de sesión carga y muestra sus controles principales.
describe("Cuidarte+ - pantalla de inicio de sesión", () => {
  it("muestra el formulario de inicio de sesión", () => {
    cy.visit("/login");
    cy.contains("Iniciar Sesión").should("be.visible");
    cy.get('[data-testid="input-nombre-usuario"]').should("be.visible");
    cy.get('[data-testid="input-password"]').should("be.visible");
    cy.get('[data-testid="button-login"]').should("be.visible");
  });

  it("permite navegar a la pantalla de registro", () => {
    cy.visit("/login");
    cy.get('[data-testid="link-registro"]').click();
    cy.url().should("include", "/registro");
    cy.contains("Registro de Paciente").should("be.visible");
  });
});
