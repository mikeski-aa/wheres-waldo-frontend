// call API to create a user
async function createUser() {
  const url = `https://waldo-api-backend.adaptable.app/api/newuser`;

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
async function checkCoordinates(xcoord, ycoord, targetid) {
  // url- query === ?nameItem=VALUE&anotherItem=VALUE2
  const dataString = `xcoord=${xcoord}&ycoord=${ycoord}&targetid=${targetid}`;
  const url = `https://waldo-api-backend.adaptable.app/api/check?${dataString}`;

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
  const url = `https://waldo-api-backend.adaptable.app/api/putuser/${userId}`;

  const toSend = {
    id: resultObject.id,
  };

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
  const url = `https://waldo-api-backend.adaptable.app/api/checkwin/${userId}`;

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

async function stopTimer(userId) {
  const url = `https://waldo-api-backend.adaptable.app/api/puttimer/${userId}`;
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
  const url = `https://waldo-api-backend.adaptable.app/api/getfinaltime/${userId}`;

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
  const url = `https://waldo-api-backend.adaptable.app/api/putname/${userId}`;
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

async function putFinalTime(userId, time) {
  const datastring = `userid=${userId}&time=${time}`;
  const url = `https://waldo-api-backend.adaptable.app/api/putfinaltime?${datastring}`;

  try {
    const response = await fetch(url, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function GetLeaderboards() {
  const url = `https://waldo-api-backend.adaptable.app/api/getleaderboards`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
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
  putFinalTime,
  GetLeaderboards,
};
