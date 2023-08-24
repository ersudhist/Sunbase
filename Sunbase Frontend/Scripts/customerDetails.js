const apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";
let authToken = "";

const addCustomerForm = document.getElementById("addCustomerForm");

addCustomerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const customerData = {
    first_name: addCustomerForm.elements["first_name"].value,
    last_name: addCustomerForm.elements["last_name"].value,
    street: addCustomerForm.elements["street"].value,
    address: addCustomerForm.elements["address"].value,
    city: addCustomerForm.elements["city"].value,
    state: addCustomerForm.elements["state"].value,
    email: addCustomerForm.elements["email"].value,
    phone: addCustomerForm.elements["phone"].value,
  };

  await addCustomer(customerData);
  addCustomerForm.reset();
  window.location.href = "./customerListScreen.html";
});

async function addCustomer(customerData) {
  try {
    const response = await fetch(`${apiUrl}?cmd=create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      console.error("Failed to add customer");
    }
  } catch (error) {
    console.error("Error adding customer:", error);
  }
}

// ... (Previous code for authentication, fetchCustomerList, and other interactions)
