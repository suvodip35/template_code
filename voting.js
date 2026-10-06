const pollData = {
    question: "What's your favorite front-end framework?",
    options: [
      { id: "react", label: "React", votes: 0 },
      { id: "vue", label: "Vue", votes: 0 },
      { id: "svelte", label: "Svelte", votes: 0 },
      { id: "angular", label: "Angular", votes: 0 }
    ]
  };

  const pollKey = "user_voted_framework";
  let hasVoted = false;
  let selected = null;

  const pollOptionsDiv = document.getElementById('pollOptions');
  const voteBtn = document.getElementById('voteBtn');

  function renderResults() {
    const totalVotes = pollData.options.reduce((sum, opt) => sum + opt.votes, 0) || 1;
    pollOptionsDiv.innerHTML = "";

    pollData.options.forEach((opt) => {
      const percent = Math.round((opt.votes / totalVotes) * 100);
      const row = document.createElement('div');
      row.className = "space-y-1";
      row.innerHTML = `
        <div class="flex justify-between text-sm font-semibold text-gray-700">
          <span>${opt.label}</span>
          <span>${percent}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div class="bg-teal-500 h-full rounded-full transition-all duration-700" style="width: ${percent}%"></div>
        </div>
      `;
      pollOptionsDiv.appendChild(row);
    });

    voteBtn.disabled = true;
    voteBtn.textContent = "Thank you for voting!";
  }

  voteBtn.addEventListener('click', () => {
    if (!selected || hasVoted) return;
    const option = pollData.options.find(o => o.id === selected);
    if (option) option.votes += 1;
    hasVoted = true;
    renderResults();
  });
