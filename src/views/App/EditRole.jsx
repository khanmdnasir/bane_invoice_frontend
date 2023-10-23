import React from 'react'
import { useLocation } from 'react-router-dom';

const EditRole = () => {
    const location = useLocation()
    const role = location.state;
    // console.log(role.row.name);
  return (
    <div>
      {role.row.name}
    </div>
  )
}

export default EditRole
