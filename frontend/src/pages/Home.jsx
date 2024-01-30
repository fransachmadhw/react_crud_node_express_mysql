import React from 'react';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { GrView } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  useMutation,
  useQueryClient,
  useQuery,
} from '@tanstack/react-query';
import { deleteUser, fetchUsers } from '../api/users';

const Home = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseHome' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseHome',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseHome',
      });
    }
    console.log('useQuery data:', data);
    setUsers(data);
    console.log('users: ', users);
  }, [data, isError, isLoading, isSuccess, users]);

  return (
    <div className="container mx-auto xl:px-20">
      <div className="w-full py-12 flex flex-col justify-center items-center gap-5">
        <h1 className="font-semibold text-4xl mb-12">
          React CRUD with Node, Express, and MySQL
        </h1>
        <div className="w-full flex flex-col justify-center items-start gap-5">
          <button
            onClick={() => navigate('/create')}
            className="btn btn-primary"
          >
            Add User +
          </button>
          {users && users.length < 1 && (
            <h3 className="font-semibold text-center w-full">
              No data available
            </h3>
          )}
          <div className="w-full mx-0 px-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 gap-y-6 mb-8">
            {users &&
              users.map((user, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title">{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <div className="card-actions mt-3 justify-end">
                      <button
                        onClick={() => navigate(`/users/${user.id}`)}
                        className="btn btn-square"
                      >
                        <GrView />
                      </button>
                      <button
                        onClick={() => navigate(`/update/${user.id}`)}
                        className="btn btn-square"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById(`modal_delete_${user.id}`)
                            .showModal()
                        }
                        className="btn btn-square"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                  <dialog
                    id={`modal_delete_${user.id}`}
                    className="modal modal-bottom sm:modal-middle z-[99]"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Deleting User Confirmation
                      </h3>
                      <p className="py-4">
                        Are you sure want to delete {user.name}?
                      </p>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">No</button>
                        </form>
                        <button
                          onClick={() =>
                            deleteUserMutation.mutate(user.id)
                          }
                          className="btn btn-primary"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </dialog>
                </div>
              ))}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
