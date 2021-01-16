import React, { useState } from "react";
import { StyleSheet } from "react-native";
import HasTickets from "./HasTickets";
import PurchaseTicket from "./PurchaseTicket";

const MovieConfirmation = ({ movie, selectedShowtimeObj, selectedDate }) => {

  const [hasTickets, setHasTickets] = useState(true);

  const GetMovieConfirmationContent = () => {
    if (hasTickets) {
      return (
        <HasTickets
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          hasTickets={hasTickets}
          setHasTickets={setHasTickets}
          selectedDate={selectedDate}
        />
      );
    } else {
      return (
        <PurchaseTicket
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          hasTickets={hasTickets}
          setHasTickets={setHasTickets}
          selectedDate={selectedDate}
        />
      );
    }
  };

  return <GetMovieConfirmationContent />;
};

export default MovieConfirmation;
