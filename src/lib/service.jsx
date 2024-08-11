// call API to create a user
async function createUser() {
  const url = `http://localhost:3000/api/newuser`;

  try {
    const response = await fetch(url, {
      method: "POST",
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

  const toSend = {
    id: resultObject.id,
  };

  console.log(toSend);

  try {
    const response = await fetch(url, {
      method: "PUT",
      // dont forget to include this header since i'm not using axios
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toSend),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function checkWin(userId) {
  const url = `http://localhost:3000/api/checkwin/${userId}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    console.log(response);
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function stopTimer(userId) {
  const url = `http://localhost:3000/api/puttimer/${userId}`;
  try {
    const response = await fetch(url, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = response.json();
    return json;
  } catch (error) {}
}

async function getFinalTime(userId) {
  const url = `http://localhost:3000/api/getfinaltime/${userId}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = response.json();
    return json;
  } catch (error) {}
}

async function updateUserName(userId, name) {
  const url = `http://localhost:3000/api/putname/${userId}`;
  const newbody = {
    username: name,
  };
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newbody),
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

export {
  createUser,
  checkCoordinates,
  updateUser,
  checkWin,
  stopTimer,
  getFinalTime,
  updateUserName,
};
