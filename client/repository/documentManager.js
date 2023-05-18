const url = 'http://localhost:8081/api/documents'
async function fetchAllObjects(userId) {
  console.log('fetching');
    return new Promise((resolve, reject) => {
      fetch(`${url}/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export default {
    fetchAllObjects,
  }