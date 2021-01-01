class Concesionario {
    constructor() {
      this.textoDeLaConsigna = `Marca: Peugeot // Modelo: 206 // Puertas: 4 // Precio: $200.000,00
      Marca: Honda // Modelo: Titan // Cilindrada: 125c // Precio: $60.000,00
      Marca: Peugeot // Modelo: 208 // Puertas: 5 // Precio: $250.000,00
      Marca: Yamaha // Modelo: YBR // Cilindrada: 160c // Precio: $80.500,50`;
    }
    getDatos() {
      // A partir de parrafo de consigna, construyo array de objetos tipo Vehiculo
  
      const infoVehiculos = this.textoDeLaConsigna.match(/.+/g);
      const arrayDeVehiculos = infoVehiculos.map(
        (linea, index) => new Vehiculo(linea)
      );
      return arrayDeVehiculos;
    }
  }
  
  class Vehiculo {
    constructor(linea) {
      
      const keys = linea.match(/\w*[^/](?=:)/gi);
      const values = linea.match(/(?<=:\s)[\w$.,]*/gi);
  
      const creaMap = (keys, values) => {
        const map = new Map();
        for (let i = 0; i < keys.length; i++) {
          map.set(keys[i], values[i]);
        }
        return map;
      };
  
      this.propsMap = creaMap(keys, values);
    }
    // Metodo que devuelve renglones con informacion para construir tabla, en mismo formato que consigna
    getDetallesVehiculo() {
      const renglon = [];
      for (let [key, value] of this.propsMap) {
        renglon.push(`${key}: ${value}`);
      }
      return renglon.join(" // ");
    }
  
    getNombreVehiculo() {
      const props = this.propsMap;
      return `${props.get("Marca")} ${props.get("Modelo")}`;
    }
  
    getPrecioVehiculo() {
      const props = this.propsMap;
      return `${props.get("Precio")}`;
    }
  }
  // Creo clase para llamar metodos que manipulan los objetos tipo vehiculo
  class Usuario extends Concesionario {
    getListaVehiculosOrdenada(op) {
      const copiaDeLista = super.getDatos();
  
      function conviertePrecioANumber(monto) {
        return Number(
          monto.replace(/\$/gi, "").replace(/\./, "").replace(/,/, ".")
        );
      }
      copiaDeLista.forEach((element) => {
        element.propsMap.set(
          "Precio",
          conviertePrecioANumber(element.propsMap.get("Precio"))
        );
      });
      copiaDeLista.sort((a, b) => {
        return op * (a.propsMap.get("Precio") - b.propsMap.get("Precio"));
      });
      return copiaDeLista;
    }
  
    imprimirListaOriginal() {
      super.getDatos().map((vehiculo) => {
        return console.log(vehiculo.getDetallesVehiculo());
      });
      console.log("=============================");
    }
  
    imprimirListaOriginalOrdenada() {
      const listaOrdenada = this.getListaVehiculosOrdenada(-1);
      console.log("=============================");
      console.log("Vehículos ordenados por precio de mayor a menor:");
  
      listaOrdenada.forEach((vehiculo) => {
        console.log(vehiculo.getNombreVehiculo());
      });
    }
    imprimirVehiculoMasCaro() {
      const listaOrdenada = this.getListaVehiculosOrdenada(-1);
  
      console.log(`Vehículo más caro: ` + listaOrdenada[0].getNombreVehiculo());
    }
  
    imprimirVehiculoMasBarato() {
      const listaOrdenada = this.getListaVehiculosOrdenada(1);
  
      console.log(`Vehículo más barato: ` + listaOrdenada[0].getNombreVehiculo());
    }
  
    imprimirVehiculoBuscado(valorBuscado) {
      const copiaDeLista = super.getDatos();
  
      const a = copiaDeLista.filter((vehiculo) =>
        vehiculo.propsMap.get("Modelo").includes(valorBuscado.toUpperCase())
      );
      console.log(
        `Vehículo que contiene en el modelo la letra ‘${valorBuscado}’: ${a[0].getNombreVehiculo()} ${a[0].getPrecioVehiculo()}`
      );
    }
  }
  
  const usuario = new Usuario();
  
  usuario.imprimirListaOriginal();
  usuario.imprimirVehiculoMasCaro();
  usuario.imprimirVehiculoMasBarato();
  usuario.imprimirVehiculoBuscado("Y");
  usuario.imprimirListaOriginalOrdenada();
  