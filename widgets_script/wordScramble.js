let words = [
  {
    word: 'addition',
    hint: 'The process of adding numbers',
  },
  {
    word: 'meeting',
    hint: 'Event in which people come together',
  },
  {
    word: 'number',
    hint: 'Math symbol used for counting',
  },
  {
    word: 'exchange',
    hint: 'The act of trading',
  },
  {
    word: 'canvas',
    hint: 'Piece of fabric for oil painting',
  },
  {
    word: 'garden',
    hint: 'Space for planting flower and plant',
  },
  {
    word: 'position',
    hint: 'Location of someone or something',
  },
  {
    word: 'feather',
    hint: 'Hair like outer covering of bird',
  },
  {
    word: 'comfort',
    hint: 'A pleasant feeling of relaxation',
  },
  {
    word: 'tongue',
    hint: 'The muscular organ of mouth',
  },
  {
    word: 'expansion',
    hint: 'The process of increase or grow',
  },
  {
    word: 'country',
    hint: 'A politically identified region',
  },
  {
    word: 'group',
    hint: 'A number of objects or persons',
  },
  {
    word: 'taste',
    hint: 'Ability of tongue to detect flavour',
  },
  {
    word: 'store',
    hint: 'Large shop where goods are traded',
  },
  {
    word: 'field',
    hint: 'Area of land for farming activities',
  },
  {
    word: 'friend',
    hint: 'Person other than a family member',
  },
  {
    word: 'pocket',
    hint: 'A bag for carrying small items',
  },
  {
    word: 'needle',
    hint: 'A thin and sharp metal pin',
  },
  {
    word: 'expert',
    hint: 'Person with extensive knowledge',
  },
  {
    word: 'statement',
    hint: 'A declaration of something',
  },
  {
    word: 'second',
    hint: 'One-sixtieth of a minute',
  },
  {
    word: 'library',
    hint: 'Place containing collection of books',
  },
  {
    word: 'computer',
    hint: 'Electronic device for processing data',
  },
  {
    word: 'telephone',
    hint: 'Device for making voice calls',
  },
  {
    word: 'dictionary',
    hint: 'Book containing word meanings',
  },
  {
    word: 'guitar',
    hint: 'Musical instrument with strings',
  },
  {
    word: 'bicycle',
    hint: 'Vehicle with two wheels',
  },
  {
    word: 'camera',
    hint: 'Device for capturing images',
  },
  {
    word: 'piano',
    hint: 'Musical instrument with keys',
  },
  {
    word: 'restaurant',
    hint: 'Place where food is served',
  },
  {
    word: 'hospital',
    hint: 'Place where medical care is provided',
  },
  {
    word: 'microscope',
    hint: 'Device for magnifying small objects',
  },
  {
    word: 'telescope',
    hint: 'Device for observing distant objects',
  },
  {
    word: 'stethoscope',
    hint: 'Medical device for listening to heartbeat',
  },
  {
    word: 'binoculars',
    hint: 'Device for observing distant objects with both eyes',
  },
  {
    word: 'compass',
    hint: 'Device for navigation and direction',
  },
  {
    word: 'thermometer',
    hint: 'Device for measuring temperature',
  },
  {
    word: 'barometer',
    hint: 'Device for measuring atmospheric pressure',
  },
  {
    word: 'hygrometer',
    hint: 'Device for measuring humidity',
  },
  {
    word: 'spectrum',
    hint: 'Range of colors or frequencies',
  },
  {
    word: 'galaxy',
    hint: 'Massive collection of stars and planets',
  },
];

const initGame = () => {
  let randomObj = words[Math.floor(Math.random()) * words.length];
};

initGame();