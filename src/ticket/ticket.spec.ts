import { calcularPrecioConIva, procesarLineaTicket, calcularTotalTicket, calcularTotalPorTipoIva, calcularTicketFinal} from "./ticket";
import { LineaTicket } from "./model";


describe("calcularPrecioConIva", () => {
    it("debería devolver un throw si los parámetros de entrada son undefined ", () => {
        //Arrange
        const precio: any = undefined;
        const tipoIva: any= undefined;

        //Act
        const resultado = () => calcularPrecioConIva(precio, tipoIva);

        //Assert
        expect(resultado).toThrowError("Los parámetros introducidos no son correctos");
    });

    it("debería devolver un throw si los parámetros de entrada son null ", () => {
        //Arrange
        const precio: any = null;
        const tipoIva: any= null;

        //Act
        const resultado = () => calcularPrecioConIva(precio, tipoIva);

        //Assert
        expect(resultado).toThrowError("Los parámetros introducidos no son correctos");
    });

    it("debería devolver el precio con iva si los parámetros son correctos", () => {
        //Arrange
        const precio: number = 100;
        const tipoIva: any= "general";

        //Act
        const resultado = calcularPrecioConIva(precio, tipoIva);

        //Assert
        expect(resultado).toBe(100 * (1 + 0.21));
    });
});

describe("procesarLineaTicket", () => {
    it("debería lanzar un error si producto y cantidad son undefined", () => {
        // Arrange
        const lineaTicket: any = { producto: undefined, cantidad: undefined }; // Línea incompleta

        // Act
        const resultado = () => procesarLineaTicket(lineaTicket);

        // Assert
        expect(resultado).toThrowError("El parámetro de entrada no es correcto");
    });

    it("debería lanzar un error si producto y cantidad son null", () => {
        // Arrange
        const lineaTicket: any = { producto: null, cantidad: null }; // Línea incompleta

        // Act
        const resultado = () => procesarLineaTicket(lineaTicket);

        // Assert
        expect(resultado).toThrowError("El parámetro de entrada no es correcto");
    });

    it("debería devolver un resultado si producto y cantidad son correctos", () => {
        // Arrange
        const productos: LineaTicket[] = [
            {
              producto: {
                nombre: "Legumbres",
                precio: 2,
                tipoIva: "general",
              },
              cantidad: 2,
            },
          ];
         // Act
         const resultado = procesarLineaTicket(productos[0]);

         // Assert
         expect(resultado).toEqual({
           nombre: "Legumbres",
           cantidad: 2,
           precioSinIva: 4,
           tipoIva: "general",
           precioConIva: 4.84,
         });
    });
});

describe("calcularTotalTicket", () => {
  it("debería lanzar un error si lineasTicket es undefined", () => {
    // Arrange
    const lineasTicket: any = undefined;

    // Act
    const resultado = () => calcularTotalTicket(lineasTicket);

    // Assert
    expect(resultado).toThrowError("El parámetro de entrada no es correcto");
  });

  it("debería lanzar un error si lineasTicket es null", () => {
    // Arrange
    const lineasTicket: any = null;

    // Act
    const resultado = () => calcularTotalTicket(lineasTicket);

    // Assert
    expect(resultado).toThrowError("El parámetro de entrada no es correcto");
  });

  it("debería devolver un resultado si lineasTicket es correcto", () => {
    // Arrange
    const productos: LineaTicket[] = [
        {
          producto: {
            nombre: "Legumbres",
            precio: 2,
            tipoIva: "general",
          },
          cantidad: 2,
        },
        {
          producto: {
            nombre: "Perfume",
            precio: 20,
            tipoIva: "general",
          },
          cantidad: 3,
        },
        {
          producto: {
            nombre: "Leche",
            precio: 1,
            tipoIva: "superreducidoC",
          },
          cantidad: 6,
        },
        {
          producto: {
            nombre: "Lasaña",
            precio: 5,
            tipoIva: "superreducidoA",
          },
          cantidad: 1,
        },
      ];

    // Act
    const resultado = calcularTotalTicket(productos);

    // Assert
    expect(resultado).toEqual({
        totalSinIva: 75,
        totalConIva: 88.69,
        totalIva: 13.69
    });
  });
});

describe("calcularTotalPorTipoIva", () => {
  it("debería lanzar un error si lineasTicket es undefined", () => {
    // Arrange
    const lineasTicket: any = undefined;

    // Act
    const resultado = () => calcularTotalPorTipoIva(lineasTicket);

    // Assert
    expect(resultado).toThrowError("El parámetro de entrada no es correcto");
  });

  it("debería lanzar un error si lineasTicket es null", () => {
    // Arrange
    const lineasTicket: any = null;

    // Act
    const resultado = () => calcularTotalPorTipoIva(lineasTicket);

    // Assert
    expect(resultado).toThrowError("El parámetro de entrada no es correcto");
  });

  it("debería devolver un resultado si lineasTicket es correcto", () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
        { producto: { nombre: "Pan", precio: 1, tipoIva: "superreducidoC" }, cantidad: 5 },
        { producto: { nombre: "Vino", precio: 10, tipoIva: "reducido" }, cantidad: 2 },
        { producto: { nombre: "Ordenador", precio: 500, tipoIva: "general" }, cantidad: 1 },
      ];
    
    // Act
    const resultado = calcularTotalPorTipoIva(lineasTicket);

    // Assert
    expect(resultado).toEqual([
        { tipoIva: "general", cuantia: 105.00 },
        { tipoIva: "reducido", cuantia: 2.00 },
        { tipoIva: "superreducidoA", cuantia: 0.00 },
        { tipoIva: "superreducidoB", cuantia: 0.00 },
        { tipoIva: "superreducidoC", cuantia: 0.00 },
        { tipoIva: "sinIva", cuantia: 0.00 }
      ]);
  });
});

describe("calcularTicketFinal", () => {
  it("debería lanzar un error si lineasTicket es undefined", () => {
    // Arrange
    const lineasTicket: any = undefined;

    // Act
    const resultado = () => calcularTicketFinal(lineasTicket);

    // Assert
    expect(resultado).toThrowError("El parámetro de entrada no es correcto");
  });

  it("debería lanzar un error si lineasTicket es null", () => {
    // Arrange
    const lineasTicket: any = null;

    // Act
    const resultado = () => calcularTicketFinal(lineasTicket);

    // Assert
    expect(resultado).toThrowError("El parámetro de entrada no es correcto");
  });

  it("debería devolver un resultado si lineasTicket es correcto", () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
        { producto: { nombre: "Pan", precio: 1, tipoIva: "superreducidoC" }, cantidad: 5 },
        { producto: { nombre: "Vino", precio: 10, tipoIva: "reducido" }, cantidad: 2 },
        { producto: { nombre: "Ordenador", precio: 500, tipoIva: "general" }, cantidad: 1 },
      ];

      // Act
      const resultado = calcularTicketFinal(lineasTicket);

      // Assert
      expect(resultado).toEqual({
        lineas: [
          {
            nombre: "Pan",
            cantidad: 5,
            precioSinIva: 5,
            tipoIva: "superreducidoC",
            precioConIva: 5
          },
          {
            nombre: "Vino",
            cantidad: 2,
            precioSinIva: 20,
            tipoIva: "reducido",
            precioConIva: 22
          },
          {
            nombre: "Ordenador",
            cantidad: 1,
            precioSinIva: 500,
            tipoIva: "general",
            precioConIva: 605
          }
        ],
        total: {
          totalSinIva: 525,
          totalConIva: 632,
          totalIva: 107
        },
        desgloseIva: [
          { tipoIva: "general", cuantia: 105.00 },
          { tipoIva: "reducido", cuantia: 2.00 },
          { tipoIva: "superreducidoA", cuantia: 0.00 },
          { tipoIva: "superreducidoB", cuantia: 0.00 },
          { tipoIva: "superreducidoC", cuantia: 0.00 },
          { tipoIva: "sinIva", cuantia: 0.00 }
        ]
      }
    );
    });
});