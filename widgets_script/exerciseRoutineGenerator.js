document.addEventListener('DOMContentLoaded', function () {
  const generateBtn = document.getElementById('generate-btn');
  const routineContainer = document.getElementById('routine-container');
  const totalExercises = document.getElementById('total-exercises');
  const totalTime = document.getElementById('total-time');
  const totalCalories = document.getElementById('total-calories');

  // Exercise database
  const exercises = [
    { name: 'Push-ups', type: 'strength', equipment: ['none'], level: 'beginner', duration: 5, calories: 50 },
    { name: 'Squats', type: 'strength', equipment: ['none'], level: 'beginner', duration: 5, calories: 40 },
    { name: 'Lunges', type: 'strength', equipment: ['none'], level: 'beginner', duration: 5, calories: 45 },
    { name: 'Plank', type: 'core', equipment: ['yoga_mat'], level: 'beginner', duration: 3, calories: 20 },
    {
      name: 'Jumping Jacks',
      type: 'cardio',
      equipment: ['none'],
      level: 'beginner',
      duration: 5,
      calories: 60,
    },
    {
      name: 'Dumbbell Curls',
      type: 'strength',
      equipment: ['dumbbells'],
      level: 'intermediate',
      duration: 8,
      calories: 55,
    },
    {
      name: 'Dumbbell Shoulder Press',
      type: 'strength',
      equipment: ['dumbbells'],
      level: 'intermediate',
      duration: 8,
      calories: 60,
    },
    {
      name: 'Pull-ups',
      type: 'strength',
      equipment: ['pull_up_bar'],
      level: 'advanced',
      duration: 10,
      calories: 70,
    },
    { name: 'Burpees', type: 'cardio', equipment: ['none'], level: 'advanced', duration: 10, calories: 100 },
    {
      name: 'Mountain Climbers',
      type: 'cardio',
      equipment: ['yoga_mat'],
      level: 'intermediate',
      duration: 5,
      calories: 55,
    },
    {
      name: 'Bicycle Crunches',
      type: 'core',
      equipment: ['yoga_mat'],
      level: 'intermediate',
      duration: 5,
      calories: 40,
    },
    {
      name: 'Tricep Dips',
      type: 'strength',
      equipment: ['none'],
      level: 'intermediate',
      duration: 5,
      calories: 45,
    },
    { name: 'Jump Rope', type: 'cardio', equipment: ['none'], level: 'beginner', duration: 10, calories: 90 },
    {
      name: 'Leg Raises',
      type: 'core',
      equipment: ['yoga_mat'],
      level: 'beginner',
      duration: 5,
      calories: 30,
    },
  ];

  generateBtn.addEventListener('click', generateRoutine);

  function generateRoutine() {
    const goal = document.getElementById('goal').value;
    const level = document.getElementById('level').value;
    const time = document.getElementById('time').value;

    // Get selected equipment
    const equipmentCheckboxes = document.querySelectorAll('input[name="equipment"]:checked');
    const equipment = Array.from(equipmentCheckboxes).map((cb) => cb.value);
  }
});
