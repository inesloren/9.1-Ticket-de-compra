import { ResultadoLineaTicket, TipoIva, LineaTicket, ResultadoTotalTicket, TotalPorTipoIva, TicketFinal} from "./model";

const porcentajesIva: Record<TipoIva, number> = {
  general: 0.21,
  reducido: 0.10,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0,
  sinIva: 0,
};

//Calcular el precio con iva

export const calcularPrecioConIva = (precio: number, tipoIva: TipoIva) => { 
  if (!precio || !tipoIva) {
    throw "Los parámetros introducidos no son correctos";
  }

  if (precio === null || tipoIva === null) {
    throw "Los parámetros introducidos no son correctos";
  }

  return precio * (1 + porcentajesIva[tipoIva]) 
};

//Procesar linea de ticket

export const procesarLineaTicket = (lineaTicket: LineaTicket): ResultadoLineaTicket => {
  if (!lineaTicket.producto || !lineaTicket.cantidad) {
    throw "El parámetro de entrada no es correcto";
  }
  if (lineaTicket.cantidad === null || lineaTicket.producto === null) {
    throw "El parámetro de entrada no es correcto";
  }

  const nombre = lineaTicket.producto.nombre;
  const cantidad = lineaTicket.cantidad;
  const precioSinIva = lineaTicket.producto.precio * cantidad;
  const tipoIva = lineaTicket.producto.tipoIva;
  const precioConIva = calcularPrecioConIva(precioSinIva, tipoIva);

  return {
    nombre,
    cantidad,
    precioSinIva,
    tipoIva,
    precioConIva,
  };
};

// Resultado total de ticket
export const calcularTotalTicket = (lineasTicket: LineaTicket[]): ResultadoTotalTicket => {
  if (!lineasTicket || lineasTicket === null) {
    throw "El parámetro de entrada no es correcto";
  }

  const resultadoInicial = {
    totalSinIva: 0,
    totalConIva: 0,
    totalIva: 0,
  };

  const resultadoFinal = lineasTicket.reduce((acumulador, lineaTicket) => {
    const resultadoLineaTicket = procesarLineaTicket(lineaTicket);

    return {
      totalSinIva: acumulador.totalSinIva + resultadoLineaTicket.precioSinIva,
      totalConIva: acumulador.totalConIva + resultadoLineaTicket.precioConIva,
      totalIva: acumulador.totalIva + (resultadoLineaTicket.precioConIva - resultadoLineaTicket.precioSinIva),
    };
  }, resultadoInicial);

  return {
    ...resultadoFinal,
    totalIva: parseFloat(resultadoFinal.totalIva.toFixed(2)),
  };
};

//Total por tipo de iva

export const calcularTotalPorTipoIva = (lineasTicket: LineaTicket[]): TotalPorTipoIva[] => {
  if (!lineasTicket || lineasTicket === null) {
    throw "El parámetro de entrada no es correcto";
  }

  const totalesPorTipo = lineasTicket.reduce<Record<TipoIva, number>>((acumulador, lineaTicket) => {
    const resultadoLineaTicket = procesarLineaTicket(lineaTicket);
    const ivaAplicado = resultadoLineaTicket.precioConIva - resultadoLineaTicket.precioSinIva;

    if (ivaAplicado > 0) {
      acumulador[resultadoLineaTicket.tipoIva] += ivaAplicado;
    }

    return acumulador;
  }, {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  });

  return Object.entries(totalesPorTipo).map(([tipoIva, cuantia]) => ({
    tipoIva: tipoIva as TipoIva,
    cuantia: parseFloat(cuantia.toFixed(2)),
  }));
};


//Ticket final

export const calcularTicketFinal = (lineasTicket: LineaTicket[]): TicketFinal => {
  if (!lineasTicket || lineasTicket === null) {
    throw "El parámetro de entrada no es correcto";
  }

  const lineas: ResultadoLineaTicket[] = lineasTicket.map((lineaTicket) => procesarLineaTicket(lineaTicket));
  const total: ResultadoTotalTicket = calcularTotalTicket(lineasTicket);
  const desgloseIva: TotalPorTipoIva[] = calcularTotalPorTipoIva(lineasTicket);

  return {
    lineas,
    total,
    desgloseIva,
  };
};