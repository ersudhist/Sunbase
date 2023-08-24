const apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";
let authToken = "";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const loginId = document.getElementById("loginId").value;
  const password = document.getElementById("password").value;

  try {
    authToken = await authenticateUser(loginId, password);
    if (authToken) {
      showCustomerListScreen();
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

async function authenticateUser(loginId, password) {
  try {
    const response = await fetch(apiUrl + "/assignment_auth.jsp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login_id: loginId, password: password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    throw error;
  }
}

