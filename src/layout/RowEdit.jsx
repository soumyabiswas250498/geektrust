import Checkbox from '@mui/material/Checkbox';

import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';

function RowEdit({
  user,
  handleEdit,
  setEditedUserData,
  editedUserData,
  handleSave,
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
        <div>
          <input
            type="text"
            className=" h-8 w-16 md:w-full bg-[#bffaff] text-black px-[4px] md:px-2 rounded-lg"
            value={editedUserData.name || ''}
            onChange={e => {
              setEditedUserData({
                ...editedUserData,
                name: e.target.value,
              });
            }}
          />
        </div>
      </td>
      <td className="border-r-2 border-gray-400 px-1 md:pl-2 lg:pl-4">
        <div className="md:w-full">
          <input
            type="text"
            className="h-8 w-36 md:w-full bg-[#bffaff] text-black px-[4px] md:px-2 rounded-lg"
            value={editedUserData.email || ''}
            onChange={e =>
              setEditedUserData({
                ...editedUserData,
                email: e.target.value,
              })
            }
          />
        </div>
      </td>
      <td className="border-r-2 border-gray-400 px-1 md:pl-2 lg:pl-4">
        <div className="md:w-full">
          <input
            type="text"
            className="h-8 w-12 md:w-full bg-[#bffaff] text-black px-[4px] md:px-2 rounded-lg "
            value={editedUserData.role || ''}
            onChange={e =>
              setEditedUserData({
                ...editedUserData,
                role: e.target.value,
              })
            }
          />
        </div>
      </td>
      <td className="">
        <div className="hidden justify-evenly  md:flex">
          <span title="Save Data">
            <SaveIcon
              className=" text-[#bffaff] cursor-pointer"
              onClick={() => handleSave(user.id)}
            />
          </span>
          <span title="Discard Changes">
            <RestoreIcon
              className=" text-red-500 cursor-pointer"
              onClick={() => {
                handleEdit(0);
              }}
            />
          </span>
        </div>
        <div className="flex items-center justify-evenly  md:hidden ">
          <SaveIcon
            fontSize="small"
            className=" text-[#bffaff] cursor-pointer"
            onClick={() => handleSave(user.id)}
          />
          <RestoreIcon
            fontSize="small"
            className=" text-red-500 cursor-pointer"
            onClick={() => {
              handleEdit(null);
            }}
          />
        </div>
      </td>
    </tr>
  );
}

export default RowEdit;
