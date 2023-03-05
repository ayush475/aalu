export const parseLatAndLong = (str) => {
    let data = str.split(",");
    // console.log(data);
    return {
      lat: data[0],
      lng: data[1],
    };
  };


