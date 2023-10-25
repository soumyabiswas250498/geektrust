import Row from './Row';
import Checkbox from '@mui/material/Checkbox';
import RowEdit from './RowEdit';

function Table({
  users,
  handleEdit,
  editUserId,
  setEditedUserData,
  editedUserData,
  handleSave,
  handleDeleteUser,
  handleOneChecked,
  allChecked,
  handleAllChecked,
  pageAllChecked,
}) {
  return (
    <div className="w-full h-min-[450px] md:p-2">
      <table className="table-auto w-full text-yellow-50">
        <thead>
          <tr className="w-full bg-slate-700  text-xs md:text-xl">
            <th className="border-r-2 border-gray-400 w-1/12">
              <Checkbox
                size="small"
                sx={{
                  color: '#bffaff',
                  '&.Mui-checked': {
                    color: '#bffaff',
                  },
                }}
                onChange={handleAllChecked}
                checked={pageAllChecked || false}
              />
            </th>
            <th className="border-r-2 border-gray-400 w-3/12">Name</th>
            <th className="border-r-2 border-gray-400 w-4/12">Email</th>
            <th className="border-r-2 border-gray-400 w-2/12">Role</th>
            <th className="w-2/12">Action</th>
          </tr>
        </thead>

        <tbody className="text-xs md:text-base lg:text-lg">
          {users.map(user =>
            user.id === editUserId ? (
              <RowEdit
                user={user}
                handleEdit={handleEdit}
                setEditedUserData={setEditedUserData}
                editedUserData={editedUserData}
                handleSave={handleSave}
                allChecked={allChecked}
                handleOneChecked={handleOneChecked}
                key={user.id}
              />
            ) : (
              <Row
                user={user}
                handleEdit={handleEdit}
                handleDeleteUser={handleDeleteUser}
                handleOneChecked={handleOneChecked}
                allChecked={allChecked}
                key={user.id}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
