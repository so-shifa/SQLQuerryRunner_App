// src/components/Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-root">
      <div className="sidebar-section">
        <h3>Customers</h3>
        <div className="table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>customer_id</th>
                <th>first_name</th>
                <th>last_name</th>
                <th>age</th>
                <th>country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John</td>
                <td>Doe</td>
                <td>31</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Robert</td>
                <td>Luna</td>
                <td>22</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>3</td>
                <td>David</td>
                <td>Robinson</td>
                <td>22</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>4</td>
                <td>John</td>
                <td>Reinhardt</td>
                <td>25</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Betty</td>
                <td>Doe</td>
                <td>28</td>
                <td>UAE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Orders</h3>
        <div className="table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>order_id</th>
                <th>item</th>
                <th>amount</th>
                <th>customer_id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Keyboard</td>
                <td>400</td>
                <td>4</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Mouse</td>
                <td>300</td>
                <td>4</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Monitor</td>
                <td>12000</td>
                <td>3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Keyboard</td>
                <td>400</td>
                <td>1</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Mousepad</td>
                <td>250</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Shippings</h3>
        <div className="table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>shipping_id</th>
                <th>status</th>
                <th>customer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Pending</td>
                <td>2</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Pending</td>
                <td>4</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Completed</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
