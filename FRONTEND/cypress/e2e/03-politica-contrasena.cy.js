// Caso E2E-10 - Demostración en vivo del corte del pipeline (fail-fast).
// Trazabilidad: CP-AUT-02 (plantilla EP3), Restricción 2.4 / NFR-SEG.
// La EP3 exige contraseñas de al menos 12 caracteres. El sistema actual
// acepta 6, por lo que este caso FALLA hasta aplicar la corrección.

describe("Política de contraseñas - Cuidarte+", () => {
  it("E2E-10 | Rechaza contraseña de menos de 12 caracteres (CP-AUT-02)", () => {
    const usuario = `paciente_debil_${Date.now()}`;
    cy.visit("/registro");
    cy.get('[data-testid="input-registro-nombre-usuario"]').type(usuario);
    cy.get('[data-testid="input-registro-correo"]').type(`${usuario}@cuidarte.test`);
    // 9 caracteres: cumple el mínimo actual (6) pero no la política (12).
    cy.get('[data-testid="input-registro-password"]').type("Clave#123", { log: false });
    cy.get('[data-testid="button-registro-crear-cuenta"]').click();

    cy.contains("La contraseña debe tener al menos 12 caracteres").should("be.visible");
    cy.location("pathname").should("eq", "/registro");
  });
});
