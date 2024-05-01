const standardTime: (time: string) => string = (time="12:10:12") => {
    const date = new Date();
    date.setHours(
      parseInt(time.substring(0, 2)),
      parseInt(time.substring(3, 5)),
      parseInt(time.substring(6))
    );
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  export default standardTime;