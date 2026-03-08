import jwt from 'jsonwebtoken';

export const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso não autorizado!' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error('Ocorreu um erro ao verificar o token:', err);

    return res.status(401).json({ message: 'Acesso não autorizado!' });
  }
};
