import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleUser } from '../api/users';

const Read = () => {
  const [user, setUser] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchSingleUser(id),
  });

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

    console.log('useQuery data: ', data);
    setUser(data);
    console.log('user: ', user);
  }, [data, id, isError, isLoading, isSuccess, user]);

  return (
    <div className="container mx-auto xl:px-20 py-10">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-semibold mb-5">
          Detail User {user && user.name}
        </h1>
        <div className="card xl:w-[50%] bg-base-100 shadow-xl">
          <div className="card-body">
            {user && user.url !== '' && (
              <div className="w-full flex justify-start items-end mb-4">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <img
                      src={user.url}
                      alt={`profile-image-user-${user.id}`}
                    />
                  </div>
                </div>
              </div>
            )}
            <h2 className="card-title">{user && user.name}</h2>
            <p>Email: {user && user.email}</p>
            <p>Phone: {user && user.phone}</p>
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
            <div className="card-actions mt-3 justify-end">
              <button onClick={() => navigate('/')} className="btn">
                Back
              </button>
              {user && (
                <button
                  onClick={() => {
                    navigate(`/update/${id}`);
                  }}
                  className="btn btn-primary"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
