const apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";
let authToken = "";

const customerListScreen = document.getElementById("customerListScreen");
const addCustomerButton = document.getElementById("addCustomerButton");
const customerTableBody = document.getElementById("customerTableBody");

addCustomerButton.addEventListener("click", () => {
  window.location.href = "./customerDetails.html";
});

async function fetchCustomerList() {
  try {
    const response = await fetch(apiUrl + "?cmd=get_customer_list", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const customerData = await response.json();
      populateCustomerTable(customerData);
    } else {
      console.error("Failed to fetch customer list");
    }
  } catch (error) {
    console.error("Error fetching customer list:", error);
  }
}

function populateCustomerTable(customers) {
  customerTableBody.innerHTML = "";

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.first_name}</td>
      <td>${customer.last_name}</td>
      <td>${customer.address}</td>
      <td>${customer.city}</td>
      <td>${customer.state}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>
        <button onclick="deleteCustomer('${customer.uuid}')">Delete</button>
        <button onclick="showUpdateForm('${customer.uuid}')">Update</button>
      </td>
    `;
    customerTableBody.appendChild(row);
  });
}

async function deleteCustomer(uuid) {
    try {
      const response = await fetch(`${apiUrl}?cmd=delete&uuid=${uuid}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
  
      if (response.ok) {
        console.log("Customer deleted successfully");
        fetchCustomerList(); // Refresh the customer list
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }
  
  function showUpdateForm(uuid) {
    // Retrieve customer data based on the uuid
    const customer = getCustomerDetails(uuid);
  
    // Pre-fill the update form fields with the retrieved data
    const updateForm = document.createElement("form");
    updateForm.id = "updateCustomerForm";
    updateForm.innerHTML = `
      <h3>Update Customer</h3>
      <input type="text" id="update_first_name" placeholder="First name" value="${customer.first_name}" required>
      <input type="text" id="update_last_name" placeholder="Last name" value="${customer.last_name}" required>
      <input type="text" id="update_street" placeholder="Street" value="${customer.street}">
      <input type="text" id="update_address" placeholder="Address" value="${customer.address}">
      <input type="text" id="update_city" placeholder="City" value="${customer.city}">
      <input type="text" id="update_state" placeholder="State" value="${customer.state}">
      <input type="email" id="update_email" placeholder="Email" value="${customer.email}">
      <input type="tel" id="update_phone" placeholder="Phone" value="${customer.phone}">
      <div>
          <button type="submit">Update</button>
      </div>
    `;
  
    const customerListScreen = document.getElementById("customerListScreen");
    customerListScreen.innerHTML = "";
    customerListScreen.appendChild(updateForm);
  
    updateForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const updatedCustomerData = {
        first_name: updateForm.elements["update_first_name"].value,
        last_name: updateForm.elements["update_last_name"].value,
        street: updateForm.elements["update_street"].value,
        address: updateForm.elements["update_address"].value,
        city: updateForm.elements["update_city"].value,
        state: updateForm.elements["update_state"].value,
        email: updateForm.elements["update_email"].value,
        phone: updateForm.elements["update_phone"].value,
      };
  
      await updateCustomer(uuid, updatedCustomerData);
      fetchCustomerList(); // Refresh the customer list
    });
  }
  
  async function getCustomerDetails(uuid) {
    try {
      const response = await fetch(`${apiUrl}?cmd=get_customer_list`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
  
      if (response.ok) {
        const customerData = await response.json();
        const customer = customerData.find(cust => cust.uuid === uuid);
        return customer;
      } else {
        console.error("Failed to fetch customer details");
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  }
  
  async function updateCustomer(uuid, updatedData) {
    try {
      const response = await fetch(`${apiUrl}?cmd=update&uuid=${uuid}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        console.log("Customer updated successfully");
      } else {
        console.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  }
  
  