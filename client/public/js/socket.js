async function fetchUserId() {
  return new Promise((resolve) => {
    fetch('/session-data')
      .then((response) => response.json())
      .then((sessionData) => {
        const userId = sessionData.userId;
        resolve(userId);
      });
  });
}
