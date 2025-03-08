import React, { useEffect, useState } from "react";
import { Container, Table, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Deletion of user
  const deleteUser = async (id) => {
    const previousUsers = [...users];
    try {
      const response = await fetch(
        "https://interest-app-backend.vercel.app/delete-user",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("adminToken"),
          },
          body: JSON.stringify({ id }),
        }
      );
      const res = await response.json();
      if (!response.ok) {
        const resError = res.msg || "Failed to delete user!";
        toast.error(resError, { autoClose: 1000 });
        return;
      }
      const filteredUsers = users.filter((user) => user._id !== id);
      console.log(filteredUsers);
      setUsers(filteredUsers);
      toast.success(res.msg || "Delete user success fully", {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Error deleting user:", { autoClose: 1000 });

      setUsers(previousUsers);
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          "http://localhost:5500/adminFetchUsersData"
        );

        const res = await response.json();

        if (response.ok) {
          if (res.data.length === 0) {
            setError("No users found");
            setUsers([]);
          } else {
            setUsers(res.data);
          }
          toast.success("Data loaded successfully!");
        } else {
          setError(res.msg || "Failed to fetch users");
          toast.error(res.msg || "Failed to fetch users");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
        toast.error("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <p>{error}</p>
        ) : users.length > 0 ? (
          <div className="table-responsive">
            <Table bordered className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  {/* <th>Password</th> */}
                  <th>Gender</th>
                  <th>Tel</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    {/* <td>{user.password}</td> */}
                    <td>
                      {user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1).toLowerCase()}
                    </td>
                    <td>{user.tel}</td>
                    <td className="d-flex flex-nowrap justify-content-center">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-primary mx-2"
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger mx-2"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-black mx-2"
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </Row>
    </Container>
  );
};

export default UserList;
