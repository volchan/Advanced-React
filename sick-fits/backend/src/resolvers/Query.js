const Query = {
  dogs(parent, args, ctx) {
    global.dogs = global.dogs || [];
    return global.dogs;
  }
};

module.exports = Query;
