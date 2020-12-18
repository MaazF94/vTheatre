import React, { useState } from "react";
import { StyleSheet } from "react-native";
import HasTickets from "./HasTickets";
import PurchaseTicket from "./PurchaseTicket";

const MovieConfirmation = ({ movie, showtime }) => {
  const [enableEnterMovie, setEnableEnterMovie] = useState(true);

  function GetMovieConfirmationContent() {
    if (enableEnterMovie) {
      return (
        <HasTickets
          movie={movie}
          showtime={showtime}
          hasTickets={enableEnterMovie}
          setHasTickets={setEnableEnterMovie}
        />
      );
    } else {
      return (
        <PurchaseTicket
          movie={movie}
          showtime={showtime}
          hasTickets={enableEnterMovie}
          setHasTickets={setEnableEnterMovie}
        />
      );
    }
  }

  return <GetMovieConfirmationContent />;
};

export default MovieConfirmation;
