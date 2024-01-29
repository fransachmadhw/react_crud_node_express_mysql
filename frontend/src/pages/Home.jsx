import { GrView } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className="container mx-auto xl:px-20">
      <div className="w-full py-12 flex flex-col justify-center items-center gap-5">
        <h1 className="font-semibold text-4xl mb-12">
          React CRUD with Node, Express, and MySQL
        </h1>
        <div className="w-full flex flex-col justify-center items-start gap-5">
          <button className="btn btn-primary">Add User +</button>
          <div className="w-full mx-0 px-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 gap-y-6 mb-8">
            {items.map((item, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Amanda Justice</h2>
                  <p>Email: amanda_justice61@yahoo.uk</p>
                  <p>Phone: 1-234-567-89</p>
                  <div className="card-actions mt-3 justify-end">
                    <button className="btn btn-square">
                      <GrView />
                    </button>
                    <button className="btn btn-square">
                      <FiEdit />
                    </button>
                    <button className="btn btn-square">
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
