import { userNameSchema, update } from '../../models/usersModel.js';

export const changeUserName = async (req, res) => {
  const { id } = req.user;
  const { name } = userNameSchema.parse(req.body);

  await update(id, { name });

  return res.status(200).json({ user: { name } });
};
