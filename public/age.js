function updateAge() {
  // Birthday: November 30, 2003 at 16:00 (Vietnam time)
  const birthYear = 2003;
  const birthMonth = 10; // November
  const birthDay = 30;
  const birthHour = 16;
  const birthMinute = 00;

  // Get current time in Vietnam timezone with millisecond precision
  const now = new Date();
  const vietnamTimeStr = now.toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
  const vietnamTime = new Date(vietnamTimeStr);
  vietnamTime.setMilliseconds(now.getMilliseconds());

  const currentYear = vietnamTime.getFullYear();
  const birthdayThisYear = new Date(currentYear, birthMonth, birthDay, birthHour, birthMinute, 0);

  let age;
  if (vietnamTime < birthdayThisYear) {
    // Before birthday this year
    const lastBirthday = new Date(currentYear - 1, birthMonth, birthDay, birthHour, birthMinute, 0);
    const msInYear = birthdayThisYear - lastBirthday;
    const msSinceBirthday = vietnamTime - lastBirthday;
    age = currentYear - 1 - birthYear + msSinceBirthday / msInYear;
  } else {
    // On or after birthday this year
    const nextBirthday = new Date(currentYear + 1, birthMonth, birthDay, birthHour, birthMinute, 0);
    const msInYear = nextBirthday - birthdayThisYear;
    const msSinceBirthday = vietnamTime - birthdayThisYear;
    age = currentYear - birthYear + msSinceBirthday / msInYear;
  }

  const ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = age.toFixed(11);
  }
  requestAnimationFrame(updateAge);
}
updateAge();
