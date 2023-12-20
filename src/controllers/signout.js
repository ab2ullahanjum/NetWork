module.exports =  async (req, res) => {
    try {
      req.user.tokens =  req.user.tokens.filter((elem) => elem.token !== req.token);
      await req.user.save();
      await res.clearCookie('jwt');
     
      res.send('done');
    } catch (error) {
      console.error('Error:', error);
      res.status(401).send(error);
    }
  }