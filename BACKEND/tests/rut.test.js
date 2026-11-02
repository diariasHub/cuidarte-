const { normalizeRut } = require("../src/utils/rut");

describe("normalizeRut (BACKEND/src/utils/rut.js)", () => {
  test("elimina los puntos y conserva guion y digito verificador", () => {
    expect(normalizeRut("12.345.678-9")).toBe("12345678-9");
  });

  test("un RUT ya normalizado no cambia", () => {
    expect(normalizeRut("16234578-8")).toBe("16234578-8");
  });

  test("conserva el digito verificador K", () => {
    expect(normalizeRut("16.789.456-K")).toBe("16789456-K");
  });

  test("devuelve el valor tal cual cuando es vacio o nulo", () => {
    expect(normalizeRut("")).toBe("");
    expect(normalizeRut(null)).toBe(null);
    expect(normalizeRut(undefined)).toBe(undefined);
  });
});
