// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

/* Global Variables */
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=6e63e2eb07719cab4e053e4f93f73371';
const btn = document.getElementById('generate');

//////////////
const performance = (e) => {
  const zip_code = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;
  console.log(newDate);
  console.log(zip_code, feel);
  getData(apiUrl, zip_code, key)
    .then((data) => {
      postData('http://localhost:8000/add', {
        temp: data.main.temp,
        date: newDate,
        content: feel,
      });
    })
    .then(function () {
      updateUi();
    });
};
btn.addEventListener('click', performance);

// get data
const getData = async function (url, zipCode, key) {
  const res = await fetch(`${url}${zipCode}${key}`);
  try {
    const data = await res.json();
    console.log(data.main.temp);
    return data;
  } catch (err) {
    console.log(`there is an error ${err}`);
  }
};

// post requrest
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = req.json();
    return newData;
  } catch (err) {
    console.log(err);
  }
};

// update data ui
const updateUi = async () => {
  const res = await fetch('http://localhost:8000/all');
  try {
    const dataRes = await res.json();
    document.getElementById('date').innerHTML = `DATE:📅 ${dataRes.date}`;
    document.getElementById('temp').innerHTML = `TEMP:🍤 ${dataRes.temp}`;
    document.getElementById(
      'content'
    ).innerHTML = `CONTENT:📜 ${dataRes.content}`;
  } catch (err) {
    console.log(err);
  }
};
