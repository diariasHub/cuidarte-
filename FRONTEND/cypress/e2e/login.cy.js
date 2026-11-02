// Prueba funcional que SÍ requiere el backend levantado (job e2e-dast o
// ejecución local con la app corriendo): verifica el rechazo de
// credenciales inválidas (RF-1.1).
describe("Cuidarte+ - inicio de sesión (con backend)", () => {
  it("rechaza credenciales inválidas", () => {
    cy.visit("/login");
    cy.get('[data-testid="input-nombre-usuario"]').type("usuario_inexistente");
    cy.get('[data-testid="input-password"]').type("ClaveIncorrecta#2026");
    cy.get('[data-testid="button-login"]').click();
    cy.contains("Credenciales inválidas", { timeout: 15000 }).should("be.visible");
  });
});
