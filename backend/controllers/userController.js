import User from '../models/userModel.js';
import path from 'path';
import fs from 'fs';

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: 'No File Uploaded' });

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const file = req.files.file;
  // const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get(
    'host'
  )}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: 'Invalid Images' });
  // if (fileSize > 5000000)
  //   return res
  //     .status(422)
  //     .json({ msg: 'Image must be less than 5 MB' });

  file.mv(`./public/images/${fileName}`, async (err) => {
    try {
      await User.create({
        name: name,
        email: email,
        phone: phone,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: 'User Created Successfuly' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: error.message });
    }
  });
};

export const updateUser = async (req, res) => {
  let fileName = '';
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: 'No Data Found' });

  console.log('ini apa', req.files);

  if (req.files === null) {
    fileName = user.image;
    console.log('gambar enggak berubah');
  } else {
    const file = req.files.file;
    // const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: 'Invalid Images' });
    // if (fileSize > 5000000)
    //   return res
    //     .status(422)
    //     .json({ msg: 'Image must be less than 5 MB' });

    const filepath = `./public/images/${user.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    console.log('gambar sudah berubah');
  }

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const url = `${req.protocol}://${req.get(
    'host'
  )}/images/${fileName}`;

  try {
    await User.update(
      {
        name: name,
        email: email,
        phone: phone,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: 'User Updated' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: 'No Data Found' });

  try {
    const filepath = `./public/images/${user.image}`;

    fs.unlinkSync(filepath);

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'User Deleted' });
  } catch (error) {
    console.log(error.message);
  }
};
