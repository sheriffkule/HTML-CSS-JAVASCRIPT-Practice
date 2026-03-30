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

    // If 'none' is selected, ignore all other equipment
    let selectedEquipment = equipment.includes('none') ? ['none'] : equipment;
    // Filter exercises based on selection
    let filteredExercises = exercises.filter(
      (ex) =>
        (selectedEquipment.length === 0 || ex.equipment.some((eq) => selectedEquipment.includes(eq))) && ex.level === level
    );

    // Further filter by goal if needed
    if (goal === 'strength') {
      filteredExercises = filteredExercises.filter((ex) => ex.type === 'strength');
    } else if (goal === 'weightloss') {
      filteredExercises = filteredExercises.filter((ex) => ex.type === 'cardio');
    } else if (goal === 'endurance') {
      filteredExercises = filteredExercises.filter((ex) => ex.type === 'cardio' || ex.type === 'core');
    }

    // Calculate how many exercises we can fit in the available time
    let totalDuration = 0;
    let selectedExercises = [];
    let totalCaloriesCount = 0;

    // Shuffle exercises for variety
    filteredExercises = shuffleArray(filteredExercises);

    // Select exercises until time is up
    let maxTime = parseInt(time, 10);
    for (let i = 0; i < filteredExercises.length; i++) {
      if (totalDuration + filteredExercises[i].duration <= maxTime) {
        selectedExercises.push(filteredExercises[i]);
        totalDuration += filteredExercises[i].duration;
        totalCaloriesCount += filteredExercises[i].calories;
      }
    }

    // Update UI
    displayRoutine(selectedExercises);
    totalExercises.textContent = selectedExercises.length;
    totalTime.textContent = totalDuration;
    totalCalories.textContent = totalCaloriesCount;
  }

  function displayRoutine(exercises) {
    if (!exercises || exercises.length === 0) {
      routineContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-exclamation-circle"></i>
          <p>No exercises found matching your criteria. Try adjusting your equipment or time.</p>
        </div>
      `;
      return;
    }

    let html = '';
    exercises.forEach((exercise) => {
      html += `
        <div class="exercise-card">
          <div class="exercise-name">
            <span>${exercise.name}</span>
            <span>${exercise.duration} min</span>
          </div>
          <div class="exercise-details">
            <div class="exercise-detail"><i class="fas fa-fire"></i> ${exercise.calories} calories</div>
            <div class="exercise-detail">
              <i class="fas fa-dumbbell"></i> ${exercise.equipment.join(', ').replace(/_/g, ' ')}
            </div>
            <div class="exercise-detail"><i class="fas fa-signal"></i> ${exercise.level}</div>
            <div class="exercise-detail"><i class="fas fa-running"></i> ${exercise.type}</div>
          </div>
        </div>
      `;
    });

    routineContainer.innerHTML = html;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Generate routine on page load for demo purposes
  generateRoutine();
});
