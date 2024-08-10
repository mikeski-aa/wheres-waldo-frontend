// call API to create a user
async function createUser() {
  const url = `http://localhost:3000/api/newuser`;

  try {
    const response = await fetch(url, {
      method: "POST",
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
}

// call api to GET coords checked/compared
async function checkCoordinates(xcoord, ycoord) {
  // url- query === ?nameItem=VALUE&anotherItem=VALUE2
  const dataString = `xcoord=${xcoord}&ycoord=${ycoord}`;
  const url = `http://localhost:3000/api/check?${dataString}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(resultObject, userId) {
  const url = `http://localhost:3000/api/putuser/${userId}`;
}

export { createUser, checkCoordinates, updateUser };
