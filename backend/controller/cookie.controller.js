const checkCookie = (req, res) => {
  let userId = req.session.userId || "";
  let username = req.session.username || "";

  res.json(userId ? { message: true, username, userId }: {message: false, username, userId});
};

export { checkCookie };
