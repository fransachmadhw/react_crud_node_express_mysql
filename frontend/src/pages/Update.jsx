// import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  useMutation,
  useQueryClient,
  useQuery,
} from '@tanstack/react-query';
import { editUser, fetchSingleUser } from '../api/users';
import axios from 'axios';

const Update = () => {
  // const [data, setData] = React.useState([]);
  // const [values, setValues] = React.useState();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [file, setFile] = React.useState('');
  const [preview, setPreview] = React.useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchSingleUser(id),
  });

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const loadImage = (e) => {
    const imageUpload = e.target.files[0];
    setFile(imageUpload);
    setPreview(URL.createObjectURL(imageUpload));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('file', file);

    // editUserMutation.mutate(id, formData);

    try {
      await axios.patch(
        `http://localhost:3000/users/${id}`,
        formData,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      );
      toast.success('Updated the data successfully!', {
        id: 'promiseUpdate',
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Error while updating the data!', {
        id: 'promiseUpdate',
      });
      throw error;
    }
  };

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseRead' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseRead',
      });
    }
    if (isSuccess) {
      toast.success('Read the data successfully!', {
        id: 'promiseRead',
      });
    }

    // console.log('useQuery data: ', data);
    // console.log('user: ', values);
  }, [isError, isLoading, isSuccess]);

  React.useEffect(() => {
    if (data) {
      setName(data.name);
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      setEmail(data.email);
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      setPhone(data.phone);
    }
  }, [data]);

  React.useEffect(() => {
    if (data && data.url) {
      setPreview(data.url);
    }
  }, [data]);

  React.useEffect(() => {
    if (editUserMutation.isPending) {
      toast.loading('Updating...', { id: 'promiseUpdate' });
    }
    if (editUserMutation.isError) {
      toast.error('Error while updating the data!', {
        id: 'promiseUpdate',
      });
    }
    if (editUserMutation.isSuccess) {
      toast.success('Updated the data successfully!', {
        id: 'promiseUpdate',
      });
      navigate('/');
    }
  }, [
    editUserMutation.isError,
    editUserMutation.isPending,
    editUserMutation.isSuccess,
    navigate,
  ]);

  return (
    <div className="w-full container mx-auto xl:px-20 py-14">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-semibold mb-5">
          Edit User {data && data.name}
        </h1>
        <div className="card xl:w-[50%] bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <>
                <div className="w-full grid grid-cols-2 gap-4 p-0 m-0">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">
                        Pick a profile image
                      </span>
                    </div>
                    <input
                      type="file"
                      onChange={loadImage}
                      className="file-input file-input-md file-input-bordered file-input-primary w-full max-w-xs"
                    />
                  </label>
                  {preview && preview !== '' && (
                    <div className="w-full flex justify-center items-end">
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img src={preview} alt="image-upload" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Name
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={name && name}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(element) =>
                      setName(element.target.value)
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Email
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={email && email}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(element) =>
                      setEmail(element.target.value)
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Phone number
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    id="phone"
                    value={phone && phone}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(element) =>
                      setPhone(element.target.value)
                    }
                  />
                </label>
                <dialog
                  id="modal_update"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Updating User Confirmation
                    </h3>
                    <p className="py-4">
                      Are you sure want to update {name}`s data?
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">No</button>
                      </form>
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </dialog>
              </>

              {isLoading && (
                <div className="w-full bg-transparent flex justify-center">
                  <ClipLoader />
                </div>
              )}
              {isError && (
                <div className="w-full bg-transparent flex justify-center">
                  <h3 className="text-red-500 text-lg font-semibold">
                    Error while getting the data!
                  </h3>
                </div>
              )}
            </form>
            <div className="card-actions mt-3 justify-end">
              <button onClick={() => navigate('/')} className="btn">
                Back
              </button>
              <button
                onClick={() =>
                  document.getElementById('modal_update').showModal()
                }
                className={`btn btn-primary
                `}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
