let key = "ab343bcof0t2020acfeb0bf65d0c4516";
let city = "Tehran";
let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;

search(s);

axios.get(api).then(search);
