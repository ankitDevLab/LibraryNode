const bookSeat = (seat) => {
  navigate("/booking-status", {
    state: {
      studentId: student._id,

      libraryId: state.libraryId,
      libraryName: state.libraryName,

      seatId: seat._id,
      seatNumber: seat.seatNumber,

      slotId: state.slotId,
      slotSnapshot: state.slotSnapshot,

      planDuration: 1,
      amount: state.slotPrice,

      startDate: state.startDate,
      endDate: state.endDate,

      status: "Pending",
    },
  });
};