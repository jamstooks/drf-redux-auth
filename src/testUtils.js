const localStorage = {
  items: {},
  getItem: function(name) {
    return this.items[name];
  },
  setItem: function(name, value) {
    this.items[name] = value;
  },
  removeItem: function(name) {
    delete this.items[name];
  }
};

export default localStorage;
