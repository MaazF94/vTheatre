import React from "react";
import { Platform } from "react-native";
import FreeShowing from "./FreeShowing";
import HasTickets from "./HasTickets";

const MovieConfirmation = ({
  movie,
  selectedShowtimeObj,
  selectedDate,
  username,
  verifyTicketResponse,
}) => {
  const { ticketPrice, iosProductId } = movie;

  const GetMovieConfirmationContent = () => {
    // check ticketPrice for Android, iosProductId for iOS
    if (
      (Platform.OS === "android" && ticketPrice === 0) ||
      (Platform.OS === "ios" && iosProductId === null)
    ) {
      return (
        <FreeShowing
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          selectedDate={selectedDate}
          username={username}
        />
      );
    } else {
      return (
        <HasTickets
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          selectedDate={selectedDate}
          username={username}
          verifyTicketResponse={verifyTicketResponse}
        />
      );
    }
  };

  return <GetMovieConfirmationContent />;
};

export default MovieConfirmation;
