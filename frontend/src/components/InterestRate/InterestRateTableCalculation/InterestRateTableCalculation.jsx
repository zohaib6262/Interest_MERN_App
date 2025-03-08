import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { ContextProvider } from "../../../store/ContextApi";

function InterestRateTableCalculation() {
  const { interestRateData, token } = useContext(ContextProvider);
  const [listInterestRate, setListInterestRate] = useState([]);

  useEffect(() => {
    if (token === null || token === "") {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://interest-mern-app-backend.vercel.app/authinterestRate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const res = await response.json();
        if (response.ok) {
          const userId = localStorage.getItem("id");
          const userData = res.data.filter((item) => item.userId === userId);
          setListInterestRate(userData);
        } else {
          const msg = res.msg || "Fetch Failed. Please try again.";
          toast.error(msg, { theme: "dark", autoClose: 1000 });
        }
      } catch (err) {
        toast.error("An error occurred. Please try again later.", {
          theme: "dark",
          autoClose: 1000,
        });
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [interestRateData, token]);

  return (
    <>
      {token && listInterestRate.length >= 1 ? (
        <Container fluid className="p-0 m-0 rounded shadow-sm bg-light">
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className="text-center rounded"
          >
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Principal Amount</th>
                <th>Interest Amount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {listInterestRate.map((value, index) => {
                return (
                  <tr key={value.id} className="table-primary">
                    <td>{index + 1}</td>
                    <td>{value.principal}</td>
                    <td>{value.interestRate}</td>
                    <td>{value.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Container fluid className="p-4 mt-4 text-center">
          <h5 className="text-muted">No interest rate data available</h5>
        </Container>
      )}
    </>
  );
}

export default InterestRateTableCalculation;
