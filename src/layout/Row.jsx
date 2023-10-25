import Checkbox from '@mui/material/Checkbox';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Row({
  user,
  handleEdit,
  handleDeleteUser,
  handleOneChecked,
  allChecked,
}) {
  return (
    <tr
      className={`w-full h-12 ${
        user.id % 2 === 1 ? 'bg-slate-600' : 'bg-slate-500'
      }`}
    >
      <td className="border-r-2 border-gray-400 px-1 md:pl-2 lg:pl-4">
        <Checkbox
          size="small"
          sx={{
            color: '#bffaff',
            '&.Mui-checked': {
              color: '#bffaff',
            },
          }}
          checked={allChecked || user.isChecked || false}
          onChange={() => handleOneChecked(user.id)}
        />
      </td>
      <td className="border-r-2 border-gray-400 px-1 md:pl-2 lg:pl-4">
        {user.name}
      </td>
      <td className="border-r-2 border-gray-400 px-1 md:pl-2 lg:pl-4">
        {user.email}
      </td>
      <td className="border-r-2 border-gray-400 px-1 md:pl-2 lg:pl-4">
        {user.role}
      </td>
      <td className="">
        <div className="hidden relative justify-evenly  md:flex">
          <span title="Edit User">
            <ModeEditOutlineOutlinedIcon
              className=" text-[#bffaff] cursor-pointer"
              title="Edit"
              onClick={() => {
                handleEdit(user.id);
              }}
            />
          </span>
          <span title="Delete User">
            <DeleteOutlineOutlinedIcon
              className=" text-red-500 cursor-pointer"
              onClick={() => {
                handleDeleteUser(user.id);
              }}
            />
          </span>
        </div>
        <div className="flex items-center justify-evenly  md:hidden ">
          <ModeEditOutlineOutlinedIcon
            fontSize="small"
            className=" text-[#bffaff] cursor-pointer"
            onClick={() => {
              handleEdit(user.id);
            }}
          />

          <DeleteOutlineOutlinedIcon
            fontSize="small"
            className=" text-red-500 cursor-pointer"
            onClick={() => {
              handleDeleteUser(user.id);
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default Row;
