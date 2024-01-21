import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
interface Iprops {
  children?: ReactNode;
}

const Private: React.FC<Iprops> = props => {
  const json = localStorage.getItem('persist:root');
  let user = JSON.parse(json as string);
  let users = JSON.parse(user.user as string);
  // const location = useLocation();

  if (users.token) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/?redirect=/login"></Navigate>;
  }
};

export default Private;
