document.addEventListener('DOMContentLoaded', function () {
  // Expanded image data with more images
  const imageData = [
    {
      id: 1,
      title: 'Mountain Sunrise',
      description:
        'A breathtaking view of the sun rising over snow-capped mountains. The golden light paints the peaks in warm hues.',
      imageUrl: 'https://picsum.photos/id/1018/800/600',
      tags: ['Nature', 'Landscape', 'Sunrise'],
    },
    {
      id: 2,
      title: 'Ocean Waves',
      description:
        'Powerful ocean waves crashing against coastal rocks. The turquoise water contrasts beautifully with the white foam.',
      imageUrl: 'https://picsum.photos/id/1015/800/600',
      tags: ['Ocean', 'Water', 'Beach'],
    },
    {
      id: 3,
      title: 'Urban Skyline',
      description:
        'Modern city skyline at dusk with lights starting to twinkle. The glass skyscrapers reflect the colorful sunset.',
      imageUrl: 'https://picsum.photos/id/1019/800/600',
      tags: ['City', 'Urban', 'Architecture'],
    },
    {
      id: 4,
      title: 'Forest Path',
      description:
        'A serene path winding through a dense green forest. Sunlight filters through the canopy creating beautiful patterns.',
      imageUrl: 'https://picsum.photos/id/1040/800/600',
      tags: ['Forest', 'Nature', 'Hiking'],
    },
    {
      id: 5,
      title: 'Desert Dunes',
      description:
        'Endless sand dunes stretching to the horizon under a deep blue sky. The wind has sculpted perfect curves in the sand.',
      imageUrl: 'https://picsum.photos/id/1044/800/600',
      tags: ['Desert', 'Sand', 'Landscape'],
    },
    {
      id: 6,
      title: 'Autumn Colors',
      description:
        'Vibrant autumn foliage with red, orange and yellow leaves creating a colorful tapestry in the forest.',
      imageUrl: 'https://picsum.photos/id/1062/800/600',
      tags: ['Autumn', 'Forest', 'Colors'],
    },
    {
      id: 7,
      title: 'Waterfall',
      description:
        'A powerful waterfall cascading down a cliff into a misty pool below. The constant roar of water fills the valley.',
      imageUrl: 'https://picsum.photos/id/1016/800/600',
      tags: ['Water', 'Nature', 'Adventure'],
    },
    {
      id: 8,
      title: 'Mountain Lake',
      description:
        'Crystal clear alpine lake reflecting the surrounding mountains. The still water creates a perfect mirror image.',
      imageUrl: 'https://picsum.photos/id/1036/800/600',
      tags: ['Mountain', 'Lake', 'Reflection'],
    },
    {
      id: 9,
      title: 'Countryside',
      description:
        'Rolling green hills with scattered trees under a dramatic cloudy sky. A peaceful rural landscape.',
      imageUrl: 'https://picsum.photos/id/1052/800/600',
      tags: ['Countryside', 'Hills', 'Green'],
    },
    {
      id: 10,
      title: 'Tropical Beach',
      description:
        'Palm-fringed white sand beach with turquoise water. The perfect tropical paradise getaway.',
      imageUrl: 'https://picsum.photos/id/1060/800/600',
      tags: ['Beach', 'Tropical', 'Paradise'],
    },
  ];

  // Render images
  function renderImages() {
    const container = document.getElementById('imageContainer');

    imageData.forEach((item) => {
      const panel = document.createElement('div');
      panel.className = 'panel';
      panel.dataset.id = item.id;

      panel.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
        <div class="content">
          <h3>${item.title}</h3>
          <p class="description">${item.description}</p>
          <div class="tags">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>
      `;

      panel.addEventListener('click', function () {
        // If this panel is already active, collapse it
        if (this.classList.contains('active')) {
          this.classList.remove('active');
        } else {
          // Remove active class from all panels
          document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
          // Add active class to clicked panel
          this.classList.add('active');
        }
      });

      container.appendChild(panel);
    });
  }

  // Initialize the app
  renderImages();
});
