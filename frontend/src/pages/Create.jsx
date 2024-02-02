// import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../api/users';
// import { v4 as uuidv4 } from 'uuid';

const Create = () => {
  // const [values, setValues] = React.useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   image: '',
  // });

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [file, setFile] = React.useState('');

  const [preview, setPreview] = React.useState('');

  const [isEmpty, setIsEmpty] = React.useState(true);

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const navigate = useNavigate();

  const loadImage = (e) => {
    const imageUpload = e.target.files[0];
    setFile(imageUpload);
    setPreview(URL.createObjectURL(imageUpload));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    if (file !== '') {
      formData.append('file', file);
    }

    createUserMutation.mutate(formData);
  };

  React.useEffect(() => {
    if (createUserMutation.isPending) {
      toast.loading('Adding...', { id: 'promiseCreate' });
    }
    if (createUserMutation.isError) {
      toast.error('Error while adding the data!', {
        id: 'promiseCreate',
      });
    }
    if (createUserMutation.isSuccess) {
      toast.success('Added the data successfully!', {
        id: 'promiseCreate',
      });
      navigate('/');
    }
  }, [
    createUserMutation.isError,
    createUserMutation.isPending,
    createUserMutation.isSuccess,
    navigate,
  ]);

  React.useEffect(() => {
    if (name === '' || email === '' || phone === '' || file === '') {
      setIsEmpty(true);
    }

    if (name !== '' && email !== '' && phone !== '' && file !== '') {
      setIsEmpty(false);
    }
  }, [email, file, name, phone]);

  return (
    <div className="w-full">
      <div className="w-full container mx-auto py-14">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-semibold mb-5">Add a User</h1>
          <div className="card xl:w-[50%] bg-base-100 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                    <span className="label-text">Input the name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    required
                    className="input input-bordered w-full max-w-xs"
                    onChange={(element) =>
                      setName(element.target.value)
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      Input the email
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                    className="input input-bordered w-full max-w-xs"
                    onChange={(element) =>
                      setEmail(element.target.value)
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">
                      Input the phone number
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    id="phone"
                    required
                    className="input input-bordered w-full max-w-xs"
                    onChange={(element) =>
                      setPhone(element.target.value)
                    }
                  />
                </label>

                <dialog
                  id="modal_add"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Adding User Confirmation
                    </h3>
                    <p className="py-4">
                      Are you sure want to add {name}`s data?
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
              </form>
              <div className="card-actions mt-3 justify-end">
                <button onClick={() => navigate('/')} className="btn">
                  Back
                </button>
                <button
                  onClick={() =>
                    document.getElementById('modal_add').showModal()
                  }
                  className={`btn btn-primary ${
                    isEmpty && 'btn-disabled'
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
