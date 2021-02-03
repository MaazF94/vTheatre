import React, { useState } from "react";
import FreeShowing from "./FreeShowing";
import HasTickets from "./HasTickets";
import PurchaseTicket from "./PurchaseTicket";

const MovieConfirmation = ({ movie, selectedShowtimeObj, selectedDate }) => {
  const [hasTickets, setHasTickets] = useState(true);
  const { ticketPrice } = movie;

  const GetMovieConfirmationContent = () => {
    if (ticketPrice == 0) {
      return (
        <FreeShowing
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          selectedDate={selectedDate}
        />
      );
    } else if (hasTickets) {
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
