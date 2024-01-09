module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/pokemon-vue/" // Thay tên repository của các bạn vào đây nhé
      : "/",
};
