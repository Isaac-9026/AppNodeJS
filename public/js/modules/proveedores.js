'use strict';

//Objeto compuesto por funciones: function1, function2,
const ProveedoresModule = {

    async init() {
    this._bindEvents();
    await this.load();
  },

  async load() {},

  _bindEvents() {}

}