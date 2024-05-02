
const convertDate : (date: Date) => string = (date) => {
    return date.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  export default convertDate;