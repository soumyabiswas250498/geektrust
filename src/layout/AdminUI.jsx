import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Pagination from '../components/Pagination';
import SearchBox from '../components/SearchBox';
import DeleteSelected from '../components/DeleteSelected';

function AdminUI() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageAllChecked, setPageAllChecked] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const [allChecked, setAllChecked] = useState(false);
  const [usersSelected, setUsersSelected] = useState([]);

  // Fetching all users data from api
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      const requiredData = response.data;
      setUsers(requiredData);
      setFilteredUsers(requiredData);
    } catch (error) {
      console.error('Unable to fetch required data', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Pagination Logic
  const rowsOnePage = 10;
  const firstIndex = (currentPage - 1) * rowsOnePage;
  const lastIndex = Math.min(firstIndex + rowsOnePage, filteredUsers.length);
  const currentPageUsers = filteredUsers.slice(firstIndex, lastIndex);

  const handlePagination = pageSelect => {
    console.log(pageSelect);
    if (pageSelect < 1) pageSelect = 1;
    let totalPagesLength = filteredUsers.length / rowsOnePage;
    if (pageSelect > Math.ceil(totalPagesLength)) {
      pageSelect = Math.ceil(totalPagesLength);
    }
    setCurrentPage(pageSelect);
    setPageAllChecked(false);
  };

  // Search Logic
  const handleSearch = e => {
    const searchInput = e.target.value;
    setSearchQuery(searchInput);
    const filteredData = users.filter(
      user =>
        user.id.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.role.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredUsers(filteredData);
    const firstPage = 1;
    setCurrentPage(firstPage);
  };

  // Edit Logic
  const handleEdit = userId => {
    console.log(userId);
    setEditUserId(userId);
    if (userId) {
      const userToEdit = filteredUsers.find(user => user.id === userId);
      setEditedUserData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
      });
    }
  };

  // Save Edited Data
  const handleSave = userId => {
    const updatedUsers = filteredUsers.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          name: editedUserData.name,
          email: editedUserData.email,
          role: editedUserData.role,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditUserId(null);
    setEditedUserData({});
  };

  // Select All Useres in a Page
  const handleAllChecked = () => {
    const currentPageRows = filteredUsers.slice(firstIndex, lastIndex);
    const updatedPageRows = currentPageRows.map(user => ({
      ...user,
      isChecked: !pageAllChecked,
    }));

    setFilteredUsers(prev => {
      const newRows = [...prev];
      newRows.forEach((row, index) => {
        if (index < firstIndex || index >= lastIndex) {
          row.isChecked = false;
        }
      });
      newRows.splice(firstIndex, rowsOnePage, ...updatedPageRows);
      return newRows;
    });

    const selectedIds = updatedPageRows
      .filter(user => user.isChecked)
      .map(user => user.id);

    setUsersSelected(selectedIds);
    setAllChecked(allChecked);
    setPageAllChecked(!pageAllChecked);
  };

  // Select One User in a Page
  const handleOneChecked = userId => {
    const updateChecked = filteredUsers.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          isChecked: !user.isChecked,
        };
      }
      return user;
    });
    const allRowChecked = updateChecked.every(user => user.isChecked);
    setAllChecked(allRowChecked);
    setFilteredUsers(updateChecked);
    const selectedIds = updateChecked
      .filter(user => user.isChecked)
      .map(user => user.id);
    setUsersSelected(selectedIds);
  };

  // Delete One User
  const handleDeleteUser = userId => {
    const updatedUsers = filteredUsers.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Delete Selected Users
  const handleDeleteSelected = () => {
    const updatedUsers = filteredUsers.filter(user => !user.isChecked);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setUsersSelected([]);
    setPageAllChecked(false);
    const totalPages = Math.ceil(updatedUsers.length / rowsOnePage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  return (
    <div className="bg-slate-800 h-screen w-screen overflow-x-hidden ">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <SearchBox searchQuery={searchQuery} handleSearch={handleSearch} />
          <Table
            users={currentPageUsers}
            handleEdit={handleEdit}
            editUserId={editUserId}
            setEditedUserData={setEditedUserData}
            editedUserData={editedUserData}
            handleSave={handleSave}
            handleDeleteUser={handleDeleteUser}
            handleOneChecked={handleOneChecked}
            handleAllChecked={handleAllChecked}
            pageAllChecked={pageAllChecked}
            allChecked={allChecked}
          />
          <DeleteSelected
            usersSelected={usersSelected}
            handleDeleteSelected={handleDeleteSelected}
          />
          <Pagination
            allUsers={filteredUsers.length}
            rowsOnePage={rowsOnePage}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </div>
      )}
    </div>
  );
}

export default AdminUI;
