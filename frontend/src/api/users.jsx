import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios
    .get('http://localhost:3000/users')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const fetchSingleUser = async (id) => {
  const response = await axios
    .get('http://localhost:3000/users/' + id)
    .then((res) => {
      console.log('axios get single: ', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const addUser = async (values) => {
  console.log('ini gimana hasilnya', values);
  const response = await axios
    .post('http://localhost:3000/users', values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => {
      console.log('axios post: ', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const editUser = async (id, values) => {
  const response = axios
    .patch('http://localhost:3000/users/' + id, values, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => {
      console.log('axios patch: ', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  return response;
};

export const deleteUser = async (id) => {
  const response = axios
    .delete('http://localhost:3000/users/' + id)
    .then((res) => {
      console.log('axios delete: ', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};
