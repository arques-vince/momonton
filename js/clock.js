const clock = () => {
  const clockContainer = document.querySelector(".clock");
  const clockText = clockContainer.querySelector(".clock__text");

  const showTime = () => {
    const date = new Date();
    const str = date.toLocaleTimeString("en-GB");
    clockText.innerText = str;
  };

  const init = () => {
    showTime();
    setInterval(showTime, 100);
  };

  init();
};
clock();
