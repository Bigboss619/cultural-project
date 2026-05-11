import { useRouteError, Link } from "react-router-dom";
// import { UserAuth } from "../../context/AuthContext";

const ErrorBoundary = () => {
  const error = useRouteError();
//   const { role } = UserAuth();

//   console.error(error);

//   const getDashboardPath = (role) => {
//     switch(role) {
//       case 'user': return '/user/dashboard';
//       case 'admin': return '/admin/dashboard';
//       case 'manager': return '/manager/dashboard';
//       default: return '/manager/dashboard';
//     }
//   };

//   if (!role) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h1>

      <p className="text-gray-600 mb-6">
        {error?.statusText || error?.message || "Unexpected error occurred"}
      </p>

      <Link
        to={getDashboardPath(role)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default ErrorBoundary;