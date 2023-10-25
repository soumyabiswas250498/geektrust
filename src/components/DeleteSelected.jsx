import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteSelected({ usersSelected, handleDeleteSelected }) {
  return (
    <div className="w-full h-12 flex justify-center items-center text-red-500 text-2xl ">
      <span title="Delete Selected">
        <DeleteIcon
          fontSize="large"
          className="cursor-pointer"
          onClick={() => handleDeleteSelected()}
          disabled={usersSelected.length === 0}
        />
      </span>
    </div>
  );
}

export default DeleteSelected;
