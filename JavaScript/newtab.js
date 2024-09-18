//brave://extensions/
console.log('Js hello');
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('schedule-button').addEventListener('click', function() {
    console.log('Schedule button clicked!');
    location.assign('../Pages/schedule.html');
  });
  document.getElementById('unicode-button').addEventListener('click', function() {
    console.log('Unicode button clicked!');
    location.assign('../Pages/unicode.html');
  });
  document.getElementById('photo-button').addEventListener('click', function() {
    console.log('Photo button clicked!');
    location.assign('../Pages/photo.html');
  });
  document.getElementById('language-button').addEventListener('click', function() {
    console.log('Language button clicked!');
    location.assign('https://www.duolingo.com/learn');
  });
  document.getElementById('code-button').addEventListener('click', function() {
    console.log('Code button clicked!');
    location.assign('https://www.codecademy.com/learn');
  });
  document.getElementById('rec-button').addEventListener('click', function() {
    console.log('Recreation button clicked!');
    location.assign('https://recreation.uconn.edu/group-fitness-schedule/');
  });


  
  const urlsTopmost = [
    {name: 'Yahoo', url: 'https://mail.yahoo.com/d/folders/1'},
    {name: 'Gmail', url: 'https://mail.google.com/mail/u/0/'},
    {name: 'iCloud', url: 'https://www.icloud.com/'},
    {name: 'Youtube', url: 'https://www.youtube.com/'},
    {name: 'iClicker', url: 'https://www.iclicker.com/'},
    {name: 'Num Converter', url: 'https://www.rapidtables.com/convert/number/hex-to-binary.html'},
    {name: 'Main', url: 'https://github.uconn.edu/zhs04001/cse3666-2024spring'},
    {name: 'Bin', url: 'https://github.com/zhijieshi/cse3666/tree/master'},
    {name: 'Discord', url: 'https://discord.com/channels/@me'},
    {name: 'Clubs', url: 'https://club.fusionfamily.com/myclubs'},
  ];
  const urlsUpper = [
    {name: 'ASTROWRLD', url: 'https://chat.openai.com/'},
    {name: 'Rent Money', url: 'https://claude.ai/chats'},
    {name: 'a.Color Calc', url: 'https://htmlcolorcodes.com/color-picker/'},
    {name: 'b.Color Calc', url: 'https://www.sessions.edu/color-calculator/'},
    {name: 'Fuchsia', url: 'https://htmlcolorcodes.com/colors/shades-of-pink/'},
    {name: 'img2Color', url: 'https://html-color-codes.info/colors-from-image/'},
    {name: 'a.Unicode', url: 'http://xahlee.info/comp/unicode_index.html?q=epsil'},
    {name: 'b.unicode', url: 'https://www.fileformat.info/'},
    {name: 'IMG OCR', url: 'https://www.newocr.com/'},
    {name: 'Subscript', url: 'https://lingojam.com/SubscriptGenerator'},
  ];
  const urlsLower = [
    {name: 'H', url: 'https://huskyct.uconn.edu/'},
    {name: 'Student', url: 'https://studentadmin.uconn.edu/'},
    {name: 'Amazon', url: 'https://www.amazon.com/'},
    {name: 'Map', url: 'https://maps.uconn.edu/'},
    {name: 'Academic Cal.', url: 'https://registrar.uconn.edu/academic-calendar/'},
    {name: 'Emojis', url: 'https://emojicombos.com/a'},
    {name: 'Comparison Sort', url: 'https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html'},
    {name: 'Data Visualize', url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html'},
    {name: 'Khan', url: 'https://www.khanacademy.org/'},
    {name: 'Me N U', url: 'https://dining.uconn.edu/nutrition/'},

    //2550 schedule - blockchain - https://ghadaalmashaqbeh.github.io/courses/blockchain-technology-f2023/
    //https://www.khanacademy.org/
    //Stack - https://www.cs.usfca.edu/~galles/visualization/SimpleStack.html
  ];
  
  populateButtons('button-wrapper-topmost', urlsTopmost);

  function populateButtons(wrapperId, urls) {
    const buttonWrapper = document.getElementById(wrapperId);

    urls.forEach(({name, url}) => {
      const button = document.createElement('button');
      button.textContent = name;
      button.className = 'bottom-button';
      button.addEventListener('click', function() {
        window.location.href = url;
      });
      buttonWrapper.appendChild(button);
    });
  }
  populateButtons('button-wrapper', urlsLower);
  populateButtons('button-wrapper-upper', urlsUpper);
});
// Call once to display the clock instantly
updateClock();
// Then set the interval
setInterval(updateClock, 1000);