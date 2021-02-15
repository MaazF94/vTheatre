import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import FreeShowing from "./FreeShowing";
import HasTickets from "./HasTickets";
import PurchaseTicket from "./PurchaseTicket";

const MovieConfirmation = ({ movie, selectedShowtimeObj, selectedDate }) => {
  const [hasTickets, setHasTickets] = useState(true);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
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
        <View>
          {loadingAnimation && (
            <ActivityIndicator
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              animating={loadingAnimation}
              size="large"
              color="#7E0808"
            />
          )}
          <PurchaseTicket
            movie={movie}
            selectedShowtimeObj={selectedShowtimeObj}
            hasTickets={hasTickets}
            setHasTickets={setHasTickets}
            selectedDate={selectedDate}
            setLoadingAnimation={setLoadingAnimation}
          />
        </View>
      );
    }
  };

  return <GetMovieConfirmationContent />;
};

export default MovieConfirmation;
