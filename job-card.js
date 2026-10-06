const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "California",
      image: "https://logo.clearbit.com/google.com"
    },
    {
      title: "Backend Engineer",
      company: "Amazon",
      location: "Seattle",
      image: "https://logo.clearbit.com/amazon.com"
    },
    {
      title: "Full Stack Dev",
      company: "Meta",
      location: "New York",
      image: "https://logo.clearbit.com/meta.com"
    },
    {
      title: "UI/UX Designer",
      company: "Adobe",
      location: "Remote",
      image: "https://logo.clearbit.com/adobe.com"
    }
  ];

  const jobContainer = document.getElementById('jobContainer');
  const savedMessage = document.getElementById('savedMessage');
  const undoBtn = document.getElementById('undoBtn');
  let history = [];

  function createCard(job, index) {
    const card = document.createElement('div');
    card.className = `card absolute w-full h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between`;
    card.style.zIndex = 10 - index;

    card.innerHTML = `
      <div>
        <img src="${job.image}" alt="${job.company}" class="w-20 h-20 object-contain mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-indigo-700">${job.title}</h2>
        <p class="text-gray-600 text-xl font-bold mt-2">${job.company}</p>
        <p class="text-gray-400 text-sm mt-1">${job.location}</p>
      </div>
      <p class="text-xs font-medium text-gray-400">Swipe ➡️ Save | ⬅️ Dismiss</p>
    `;

    let startX = 0;
    let currentX = 0;

    const onPointerDown = (e) => {
      startX = e.clientX || e.touches?.[0]?.clientX;
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e) => {
      currentX = (e.clientX || e.touches?.[0]?.clientX) - startX;
      card.style.transform = `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      if (currentX > 100) {
        saveJob(card, job);
      } else if (currentX < -100) {
        dismissCard(card);
      } else {
        card.style.transform = "translateX(0)";
      }
      currentX = 0;
    };

    card.addEventListener('pointerdown', onPointerDown);
    return card;
  }

  function dismissCard(card) {
    card.style.transform = "translateX(-150%) rotate(-20deg)";
    setTimeout(() => card.remove(), 300);
    history.push({ type: "dismiss", card });
  }

  function saveJob(card, job) {
    card.style.transform = "translateX(150%) rotate(20deg)";
    setTimeout(() => card.remove(), 300);
    savedMessage.classList.remove('hidden');
    setTimeout(() => savedMessage.classList.add('hidden'), 1500);
    history.push({ type: "save", job });
  }

  function renderCards() {
    jobContainer.innerHTML = "";
    jobs.forEach((job, i) => {
      const card = createCard(job, i);
      jobContainer.appendChild(card);
    });
  }

  undoBtn.addEventListener('click', () => {
    const lastAction = history.pop();
    if (lastAction?.type === "save") {
      jobs.unshift(lastAction.job);
      renderCards();
    }
  });

  renderCards();
