"use strict";

const ClientesModule = {
  async init() {
    this._bindEvents();
    await this.load();
  },

  async load() {
    console.log("Enviado desde JS Clientes");
    const lienzo = document.getElementById("lienzo");

    const coloresFondo = [
      "rgba(155, 89, 182,0.7)",
      "rgba(241, 196, 15,0.7)",
      "rgba(52, 73, 94,0.7)",
      "rgba(39, 174, 96,0.7)",
      "rgba(127, 140, 141,0.7)",
    ]

    const coloresContorno = [
      "rgba(155, 89, 182,1)",
      "rgba(241, 196, 15,1)",
      "rgba(52, 73, 94,1)",
      "rgba(39, 174, 96,1)",
      "rgba(127, 140, 141,1)",
    ]

    const configuracion = {
      scales: {
        y: { beginAtZero: true, min: 0, max: 100 }
      }
    }

    const grafico = new Chart(lienzo, {
      type: "bar",
      data: {
        labels: ["PHP", "JS", "Python", "Java", "C#"],
        datasets: [
          {
            label: "2026",
            data: [15, 20, 5, 25, 10],
            borderWidth: 3,
            backgroundColor: coloresFondo,
            borderColor: coloresContorno
          },
          {
            label: "2025",
            data: [18, 30, 9, 22, 7],
            borderWidth: 3,
            backgroundColor: coloresFondo,
            borderColor: coloresContorno
          }
        ],
      },
      options: configuracion
    })

    //referenciar el gráfico a nivel de módulo
    this.grafico = grafico
  },

  _render(lista) {},

  _filter() {},

  /* ── Modal ───────────────────────────── */
  _openModal(mode, template = null) {},

  openEdit(id) {},

  confirmDel(id, name) {},

  async _save() {},

  _renderGrafico() {
    console.log(this.grafico.data.datasets)

    //Asignando un valor a la vez para el gráfico (MANUAL)
    //Primero 0 = 2026, Segundo 0= PHP
    this.grafico.data.datasets[0].data[0] = 80 //0 = PHP
    this.grafico.data.datasets[0].data[1] = 70 //1 = JS
    this.grafico.data.datasets[0].data[2] = 60 //2 = Python
    this.grafico.data.datasets[0].data[3] = 50 //3 = Java
    this.grafico.data.datasets[0].data[4] = 40 //4 = #C
    this.grafico.update()

    //Tenemos los datos en un objeto ITERABLE (origen => API)
    const datos = [
      {lenguaje: 'PHP', puntuacion: 40},
      {lenguaje: 'JS', puntuacion: 50},
      {lenguaje: 'Python', puntuacion: 60},
      {lenguaje: 'Java', puntuacion: 70},
      {lenguaje: 'C#', puntuacion: 80}
    ]

    this.grafico.data.datasets[1].data = datos.map(fila => fila.puntuacion)
    this.grafico.update()
  },

  _bindEvents() {
    document.getElementById('cambiar-datos')?.addEventListener("click", ()=> this._renderGrafico())
  },
};
