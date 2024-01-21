import Login from '../views/Login';
import Admin from '../views/admin/Admin';
import Private from '../utils/Private';
import OrderDet from '../views/order/details/index';
import FindComm from '../views/Comm/findCamm';
import AddComm from '../views/Comm/addCamm';
import { useRoutes } from 'react-router-dom';
import Register from '../views/Register';

const router = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: (
      <Private>
        <Admin />
      </Private>
    ),
    children: [
      {
        path: '/admin/orderDet',
        element: <OrderDet />,
      },
      {
        path: '/admin/findComm',
        element: <FindComm />,
      },
      {
        path: '/admin/addComm',
        element: <AddComm />,
      },
    ],
  },
];

function RouterView() {
  let element = useRoutes(router);
  return <>{element}</>;
}

export default RouterView;
