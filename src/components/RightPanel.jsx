// src/components/RightPanel.jsx
import React from "react";
import "../styles/RightPanel.css";

export default function RightPanel() {
  return (
    <div className="right-root">
      {/* CSS-only tabs */}
      <div className="tabs">
        <input type="radio" name="rp-tab" id="rp-schema" defaultChecked />
        <input type="radio" name="rp-tab" id="rp-info" />
        <input type="radio" name="rp-tab" id="rp-tips" />

        <div className="tabs-row">
          <label htmlFor="rp-schema" className="tab">
            Schema
          </label>
        </div>

        <div className="tab-content" id="rp-schema-content">
          <div className="schema-block">
            <div className="schema-title">📁 Customers</div>
            <ul className="schema-list">
              <li>customer_id [int]</li>
              <li>first_name [varchar]</li>
              <li>last_name [varchar]</li>
              <li>age [int]</li>
              <li>country [varchar]</li>
            </ul>
          </div>

          <div className="schema-block">
            <div className="schema-title">📁 Orders</div>
            <ul className="schema-list">
              <li>order_id [int]</li>
              <li>item [varchar]</li>
              <li>amount [int]</li>
              <li>customer_id [int]</li>
            </ul>
          </div>

          <div className="schema-block">
            <div className="schema-title">📁 Shippings</div>
            <ul className="schema-list">
              <li>shipping_id [int]</li>
              <li>status [varchar]</li>
              <li>customer [int]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
