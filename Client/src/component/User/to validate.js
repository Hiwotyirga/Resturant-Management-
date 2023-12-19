const onSubmit = (values) => {
    // const NumberOfGuest = values.NumberOfGuest.toString().trim();

    // const PhoneNumber = values.PhoneNumber.toString().trim();

    // if (
    //   values.PhoneNumber === "" ||
    //   values.Date.trim() === "" ||
    //   values.Time.trim() === "" ||
    //   values.Selection.trim() === "" ||
    //   NumberOfGuest === ""
    // ) {
    //   alert("Please provide valid input for all fields");
    //   return;
    // }
    // const numberOfGuest = parseInt(values.NumberOfGuest, 10);

    // if (isNaN(numberOfGuest) || numberOfGuest <= 0 || numberOfGuest % 1 !== 0) {
    //   alert("Please enter a valid positive integer for Number of Guests");
    //   return;
    // }
    // if (isNaN(PhoneNumber) || PhoneNumber <= 0 || PhoneNumber % 1 !== 0) {
    //   alert("Please enter a valid Number of Phone number");
    //   return;
    // }
    setIsModalVisible(false);
    if (reservationStatus === "closed") {
      alert("Reservation system is closed. Unable to make a reservation at this time.");
      return;
    }
   else{
    axios
    .post( `http://localhost:9000/reservation?userId=${id}`, values, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      // data: {
      //   NumberOfGuest: numberOfGuest,
      //   PhoneNumber: PhoneNumber,
      // },
      
    })
    .then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        console.log(response.data);
        // alert("seccuss full");
      }
    });
   }
  };
